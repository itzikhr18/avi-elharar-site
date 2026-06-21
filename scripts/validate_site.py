#!/usr/bin/env python3
"""Validate the static site without third-party dependencies."""

from __future__ import annotations

import json
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://avielharar.co.il"


class SitePageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.html_attrs: dict[str, str] = {}
        self.title_parts: list[str] = []
        self.in_title = False
        self.description_count = 0
        self.theme_colors: list[str] = []
        self.canonicals: list[str] = []
        self.alternates: list[tuple[str, str]] = []
        self.ids: list[str] = []
        self.references: list[tuple[str, str]] = []
        self.json_ld: list[str] = []
        self.in_json_ld = False
        self.json_ld_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {name.lower(): value or "" for name, value in attrs}
        tag = tag.lower()

        if tag == "html":
            self.html_attrs = values
        if tag == "title":
            self.in_title = True
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "meta" and values.get("name", "").lower() == "description":
            self.description_count += 1
        if tag == "meta" and values.get("name", "").lower() == "theme-color":
            self.theme_colors.append(values.get("content", ""))
        if tag == "link" and "canonical" in values.get("rel", "").lower().split():
            self.canonicals.append(values.get("href", ""))
        if tag == "link" and "alternate" in values.get("rel", "").lower().split():
            self.alternates.append((values.get("hreflang", ""), values.get("href", "")))
        if tag == "script" and values.get("type", "").lower() == "application/ld+json":
            self.in_json_ld = True
            self.json_ld_parts = []

        for attribute in ("href", "src", "poster"):
            if values.get(attribute):
                self.references.append((attribute, values[attribute]))
        for attribute in ("srcset", "imagesrcset"):
            for candidate in values.get(attribute, "").split(","):
                url = candidate.strip().split(" ", 1)[0]
                if url:
                    self.references.append((attribute, url))

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.in_json_ld:
            self.json_ld.append("".join(self.json_ld_parts).strip())
            self.in_json_ld = False
            self.json_ld_parts = []

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.in_json_ld:
            self.json_ld_parts.append(data)


def page_route(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return "/"
    if relative.endswith("/index.html"):
        return f"/{relative[:-10]}"
    return f"/{relative}"


def local_path(url_path: str) -> Path:
    clean = unquote(url_path).lstrip("/")
    candidate = ROOT / clean
    if not clean or url_path.endswith("/"):
        candidate /= "index.html"
    return candidate


def schema_types(value: object) -> set[str]:
    types: set[str] = set()
    if isinstance(value, dict):
        item_type = value.get("@type")
        if isinstance(item_type, str):
            types.add(item_type)
        elif isinstance(item_type, list):
            types.update(item for item in item_type if isinstance(item, str))
        for nested in value.values():
            types.update(schema_types(nested))
    elif isinstance(value, list):
        for nested in value:
            types.update(schema_types(nested))
    return types


def main() -> int:
    errors: list[str] = []
    pages: dict[str, tuple[Path, SitePageParser]] = {}
    canonicals: set[str] = set()

    html_files = sorted(ROOT.rglob("index.html"))
    for path in html_files:
        parser = SitePageParser()
        parser.feed(path.read_text(encoding="utf-8"))
        route = page_route(path)
        pages[route] = (path, parser)

        label = path.relative_to(ROOT).as_posix()
        if parser.html_attrs.get("lang") != "he":
            errors.append(f"{label}: expected html lang='he'")
        if parser.html_attrs.get("dir") != "rtl":
            errors.append(f"{label}: expected html dir='rtl'")
        if not "".join(parser.title_parts).strip():
            errors.append(f"{label}: missing title")
        if parser.description_count != 1:
            errors.append(f"{label}: expected one meta description")
        if parser.theme_colors != ["#0a0a0a"]:
            errors.append(f"{label}: expected theme-color #0a0a0a")

        expected_canonical = f"{BASE_URL}{route}"
        if parser.canonicals != [expected_canonical]:
            errors.append(
                f"{label}: canonical must be {expected_canonical!r}, got {parser.canonicals!r}"
            )
        canonicals.update(parser.canonicals)
        expected_alternates = [("he", expected_canonical), ("x-default", expected_canonical)]
        if parser.alternates != expected_alternates:
            errors.append(
                f"{label}: expected he and x-default hreflang links to the canonical URL"
            )

        duplicates = sorted(item for item, count in Counter(parser.ids).items() if count > 1)
        if duplicates:
            errors.append(f"{label}: duplicate ids: {', '.join(duplicates)}")

        parsed_schema: list[object] = []
        for index, block in enumerate(parser.json_ld, start=1):
            try:
                parsed_schema.append(json.loads(block))
            except json.JSONDecodeError as exc:
                errors.append(f"{label}: JSON-LD block {index} is invalid: {exc}")

        found_types = schema_types(parsed_schema)
        required_types = {
            "/": {"DrivingSchool", "WebSite", "FAQPage"},
            "/maamarim/5-tauyot-test-yerushalayim/": {"Article", "BreadcrumbList"},
        }.get(route, set())
        missing_types = sorted(required_types - found_types)
        if missing_types:
            errors.append(f"{label}: missing schema types: {', '.join(missing_types)}")

    for route, (path, parser) in pages.items():
        label = path.relative_to(ROOT).as_posix()
        current_url = f"{BASE_URL}{route}"
        for attribute, reference in parser.references:
            parsed_reference = urlparse(reference)
            if parsed_reference.scheme in {"data", "mailto", "tel", "javascript"}:
                continue

            absolute = urlparse(urljoin(current_url, reference))
            if absolute.scheme not in {"http", "https"} or absolute.netloc != "avielharar.co.il":
                continue

            target = local_path(absolute.path)
            if not target.is_file():
                errors.append(f"{label}: broken local {attribute} reference {reference!r}")
                continue

            if absolute.fragment and target.name == "index.html":
                target_route = page_route(target)
                target_parser = pages.get(target_route, (None, None))[1]
                if target_parser and absolute.fragment not in target_parser.ids:
                    errors.append(f"{label}: missing fragment target {reference!r}")

    sitemap_path = ROOT / "sitemap.xml"
    try:
        sitemap_root = ET.parse(sitemap_path).getroot()
        namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        sitemap_urls = [item.text or "" for item in sitemap_root.findall("s:url/s:loc", namespace)]
        if len(sitemap_urls) != len(set(sitemap_urls)):
            errors.append("sitemap.xml: duplicate URLs")
        if set(sitemap_urls) != canonicals:
            errors.append(
                "sitemap.xml: URLs do not match page canonicals "
                f"(sitemap={sorted(sitemap_urls)!r}, canonicals={sorted(canonicals)!r})"
            )
        for lastmod in sitemap_root.findall("s:url/s:lastmod", namespace):
            datetime.fromisoformat((lastmod.text or "").replace("Z", "+00:00"))
    except (ET.ParseError, ValueError) as exc:
        errors.append(f"sitemap.xml: invalid XML or lastmod value: {exc}")

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {BASE_URL}/sitemap.xml" not in robots:
        errors.append("robots.txt: missing canonical sitemap URL")
    if (ROOT / "CNAME").read_text(encoding="utf-8").strip() != "avielharar.co.il":
        errors.append("CNAME: expected avielharar.co.il")

    for relative in ("style.min.css", "main.min.js"):
        content = (ROOT / relative).read_text(encoding="utf-8")
        if not content.strip():
            errors.append(f"{relative}: file is empty")
        if "duration:NaN" in content:
            errors.append(f"{relative}: contains an invalid NaN duration")

    if errors:
        print("Site validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    schema_count = sum(len(parser.json_ld) for _, parser in pages.values())
    print(
        f"Validated {len(pages)} HTML pages, {schema_count} JSON-LD blocks, "
        f"local references, sitemap, robots.txt, and production assets."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
