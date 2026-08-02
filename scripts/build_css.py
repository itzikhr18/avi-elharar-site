#!/usr/bin/env python3
"""Generate style.min.css from style.css.

Whitespace-and-comments only: no token rewriting, no colour/shorthand folding.
That keeps `calc(100% - 2.5rem)`, descendant combinators and the inline SVG
data-URIs byte-safe. The build refuses to write unless the minified output is
identical to the source once every whitespace character is removed.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "style.css"
OUT = ROOT / "style.min.css"

# Lines may be joined without a separator only when the previous line already
# ends on a delimiter; otherwise a single space keeps selectors/values apart.
SAFE_JOIN_TAIL = ("{", "}", ";", ",")


def strip_comments(css: str) -> str:
    """Remove /* ... */ comments that are not inside a string or url()."""
    out: list[str] = []
    i, n = 0, len(css)
    quote: str | None = None
    while i < n:
        ch = css[i]
        if quote:
            out.append(ch)
            if ch == "\\" and i + 1 < n:      # escape inside string
                out.append(css[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch in "\"'":
            quote = ch
            out.append(ch)
            i += 1
            continue
        if ch == "/" and i + 1 < n and css[i + 1] == "*":
            end = css.find("*/", i + 2)
            if end == -1:
                raise SystemExit("unterminated comment in style.css")
            i = end + 2
            continue
        out.append(ch)
        i += 1
    if quote:
        raise SystemExit("unterminated string in style.css")
    return "".join(out)


def collapse(css: str) -> str:
    """Collapse each line, then join with the narrowest safe separator."""
    pieces: list[str] = []
    for raw in css.split("\n"):
        line = re.sub(r"[ \t]+", " ", raw).strip()
        if not line:
            continue
        if pieces and not pieces[-1].endswith(SAFE_JOIN_TAIL):
            pieces.append(" ")
        pieces.append(line)
    return "".join(pieces)


def no_ws(s: str) -> str:
    return re.sub(r"\s+", "", s)


def main() -> int:
    src = SRC.read_text(encoding="utf-8")
    decommented = strip_comments(src)
    minified = collapse(decommented)

    # --- verification -------------------------------------------------
    if no_ws(minified) != no_ws(decommented):
        print("ABORT: minified output differs from source beyond whitespace", file=sys.stderr)
        return 1
    if minified.count("{") != minified.count("}"):
        print(f"ABORT: brace imbalance {minified.count('{')}/{minified.count('}')}", file=sys.stderr)
        return 1
    if minified.count("{") != decommented.count("{"):
        print("ABORT: rule count changed", file=sys.stderr)
        return 1
    if "\n" in minified:
        print("ABORT: newline survived in output", file=sys.stderr)
        return 1
    for token in ("calc(100% - 2.5rem)", "data:image/svg+xml"):
        if token in decommented and token not in minified:
            print(f"ABORT: lost token {token!r}", file=sys.stderr)
            return 1

    OUT.write_text(minified, encoding="utf-8")
    saved = len(src.encode()) - len(minified.encode())
    print(
        f"style.min.css written: {len(minified):,} bytes "
        f"({saved:,} saved, {saved / len(src.encode()):.1%}), "
        f"{minified.count('{')} rules, braces balanced"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
