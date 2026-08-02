#!/usr/bin/env python3
"""Generate og-cover.jpg — the social share card used by og:image / twitter:image.

The card is authored as HTML (RTL, same dark+gold language as the site), rendered
in headless Chromium at 2x and downscaled to the 1200x630 that Facebook, WhatsApp
and X expect. Fonts and the portrait are inlined as data URIs so the render can
never race the network and come out with fallback glyphs.

Usage:  python3 scripts/build_og_cover.py
Requires: Pillow, a Chromium binary, and network access to Google Fonts on the
first run (the woff2 files are cached under scripts/.fontcache/).
"""

from __future__ import annotations

import base64
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path(__file__).resolve().parent / ".fontcache"
OUT = ROOT / "og-cover.jpg"
PORTRAIT = ROOT / "about-avi.webp"

W, H, SCALE = 1200, 630, 2

# Headless Chrome reserves ~88 CSS px of the requested window height for browser
# chrome that never renders, so the viewport comes up short and the card gets
# clipped. Ask for the extra height, then crop the card out of the top-left.
CHROME_GUTTER = 90

CHROME_CANDIDATES = (
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
)

FONT_CSS = (
    "https://fonts.googleapis.com/css2"
    "?family=Heebo:wght@400;700;800&family=Rubik:wght@900&display=swap"
)
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if Path(c).exists():
            return c
    sys.exit("no chromium binary found; tried:\n  " + "\n  ".join(CHROME_CANDIDATES))


def fetch(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()


def fonts() -> dict[str, str]:
    """Return {name: base64 woff2} for the Hebrew and Latin subsets we need.

    Heebo and Rubik are served as variable fonts, so one file per family covers
    every weight — the per-weight URLs in the CSS resolve to the same asset.
    """
    CACHE.mkdir(exist_ok=True)
    css = fetch(FONT_CSS).decode()
    want: dict[str, str] = {}
    for block in re.findall(r"@font-face \{(.*?)\}", css, re.S):
        fam = re.search(r"font-family: '([^']+)'", block).group(1)
        url = re.search(r"url\((https[^)]+)\)", block).group(1)
        rng = re.search(r"unicode-range: (.*?);", block, re.S)
        rng = rng.group(1) if rng else ""
        subset = "he" if "0590" in rng else ("latin" if "U+0000" in rng else None)
        if subset:
            want.setdefault(f"{fam}-{subset}", url)

    out = {}
    for name, url in want.items():
        cached = CACHE / f"{name}.woff2"
        if not cached.exists():
            cached.write_bytes(fetch(url))
        out[name] = base64.b64encode(cached.read_bytes()).decode()
    return out


def build_html(f: dict[str, str], portrait: str) -> str:
    return f"""<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><style>
@font-face{{font-family:H;src:url(data:font/woff2;base64,{f['Heebo-he']}) format('woff2');font-weight:100 900;unicode-range:U+0590-05FF,U+20AA,U+FB1D-FB4F}}
@font-face{{font-family:H;src:url(data:font/woff2;base64,{f['Heebo-latin']}) format('woff2');font-weight:100 900}}
@font-face{{font-family:R;src:url(data:font/woff2;base64,{f['Rubik-he']}) format('woff2');font-weight:100 900;unicode-range:U+0590-05FF,U+20AA,U+FB1D-FB4F}}
@font-face{{font-family:R;src:url(data:font/woff2;base64,{f['Rubik-latin']}) format('woff2');font-weight:100 900}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:{W}px;height:{H}px;overflow:hidden;font-family:H,sans-serif;background:#08070a;color:#f5f0e8}}
.card{{position:relative;width:{W}px;height:{H}px;overflow:hidden;
  background:
    radial-gradient(ellipse 70% 90% at 88% 8%, rgba(212,175,55,.20), transparent 62%),
    radial-gradient(ellipse 60% 80% at 6% 92%, rgba(200,121,31,.13), transparent 65%),
    linear-gradient(160deg,#0d0b08 0%,#08070a 55%,#050406 100%)}}
.grid{{position:absolute;inset:0;
  background-image:linear-gradient(rgba(212,175,55,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.055) 1px,transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(ellipse 78% 78% at 50% 40%,#000 30%,transparent 82%)}}
.edge{{position:absolute;inset:0;border:1px solid rgba(212,175,55,.22)}}
.edge::after{{content:"";position:absolute;inset-inline-start:0;inset-block-start:0;width:100%;height:5px;
  background:linear-gradient(90deg,#c8791f,#d4af37 35%,#f4d03f 55%,#d4af37 75%,#c8791f)}}

.wrap{{position:absolute;inset:0;display:flex;align-items:stretch}}

/* copy sits first, so in RTL it takes the right half; inline-start == right */
.copy{{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;
  padding-inline:56px 8px;text-align:right;position:relative;z-index:2}}
.eyebrow{{display:inline-flex;align-items:center;gap:9px;
  padding:8px 16px;border:1px solid rgba(212,175,55,.42);border-radius:999px;
  background:rgba(212,175,55,.09);font-size:17px;font-weight:700;letter-spacing:-.01em;color:#e8d9a8}}
.eyebrow i{{width:8px;height:8px;border-radius:50%;background:#f4d03f;box-shadow:0 0 10px 2px rgba(244,208,63,.75)}}
h1{{font-family:R,H,sans-serif;font-weight:900;font-size:82px;line-height:.98;letter-spacing:-.045em;
  margin-top:20px;background:linear-gradient(180deg,#ffffff 0%,#fbf6ea 48%,#d8cbaa 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent}}
.role{{font-family:R,H,sans-serif;font-weight:900;font-size:41px;line-height:1.12;letter-spacing:-.04em;margin-top:12px;
  background:linear-gradient(180deg,#f4d03f 0%,#d4af37 55%,#b08d24 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent}}
.rule{{width:150px;height:3px;margin-top:20px;border-radius:2px;
  background:linear-gradient(270deg,transparent,#d4af37 45%,#f4d03f)}}
.chips{{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-start;margin-top:20px}}
.chip{{padding:9px 17px;border-radius:11px;font-size:19px;font-weight:700;color:#efe7d4;
  background:rgba(255,255,255,.055);border:1px solid rgba(212,175,55,.26)}}
.foot{{display:flex;align-items:center;justify-content:flex-start;gap:14px;margin-top:30px;
  font-size:22px;font-weight:700;color:#cdc3ae}}
.foot .dot{{width:5px;height:5px;border-radius:50%;background:rgba(212,175,55,.75)}}
.foot .url{{color:#f4d03f;letter-spacing:.005em}}

/* portrait takes the physical left; direction:ltr keeps the offsets literal */
.shot{{position:relative;width:415px;flex:none;height:100%;direction:ltr}}
.halo{{position:absolute;left:-70px;bottom:-140px;width:560px;height:560px;border-radius:50%;
  background:radial-gradient(circle,rgba(212,175,55,.30) 0%,rgba(212,175,55,.10) 44%,transparent 68%);filter:blur(2px)}}
.ring{{position:absolute;left:-10px;bottom:-150px;width:470px;height:470px;border-radius:50%;
  border:1.5px solid rgba(212,175,55,.28)}}
/* the cut-out ends on a hard rectangular edge — melt it into the stage on both
   the bottom and the trailing side so no crop box shows up on the dark card */
.shot img{{position:absolute;left:-14px;bottom:-14px;height:625px;width:auto;
  filter:drop-shadow(0 24px 44px rgba(0,0,0,.75)) contrast(1.03) saturate(1.02);
  mask-image:linear-gradient(180deg,#000 52%,rgba(0,0,0,.45) 80%,transparent 97%),
             linear-gradient(270deg,#000 86%,transparent 99%);
  mask-composite:intersect}}
</style>
<div class="card">
  <div class="grid"></div>
  <div class="wrap">
    <div class="copy">
      <span class="eyebrow"><i></i>בית הספר לנהיגה יוני · מאז 1976</span>
      <h1>אבי אלחרר</h1>
      <div class="role">מורה נהיגה בירושלים<br>ומעלה אדומים</div>
      <div class="rule"></div>
      <div class="chips">
        <span class="chip">טסטר לשעבר</span>
        <span class="chip">רכב אוטומטי</span>
        <span class="chip">הכנה ממוקדת לטסט</span>
      </div>
      <div class="foot">
        <span class="url" dir="ltr">avielharar.co.il</span><span class="dot"></span>
        <span dir="ltr">052-8449147</span>
      </div>
    </div>
    <div class="shot">
      <div class="halo"></div><div class="ring"></div>
      <img src="data:image/webp;base64,{portrait}" alt="">
    </div>
  </div>
  <div class="edge"></div>
</div></html>"""


def main() -> None:
    chrome = find_chrome()
    portrait = base64.b64encode(PORTRAIT.read_bytes()).decode()
    src = CACHE / "og-card.html"
    raw = CACHE / "og-raw.png"
    CACHE.mkdir(exist_ok=True)
    src.write_text(build_html(fonts(), portrait), encoding="utf-8")

    subprocess.run([
        chrome, "--headless", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
        f"--force-device-scale-factor={SCALE}",
        f"--window-size={W},{H + CHROME_GUTTER}",
        "--virtual-time-budget=4000",
        f"--screenshot={raw}", src.as_uri(),
    ], check=True, capture_output=True)

    im = Image.open(raw).convert("RGB")
    if im.size[0] < W * SCALE or im.size[1] < H * SCALE:
        sys.exit(f"render came out too small: {im.size}")
    im = im.crop((0, 0, W * SCALE, H * SCALE)).resize((W, H), Image.LANCZOS)
    im.save(OUT, "JPEG", quality=90, optimize=True, progressive=True, subsampling=0)
    print(f"{OUT.name}: {im.size[0]}x{im.size[1]}, {OUT.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
