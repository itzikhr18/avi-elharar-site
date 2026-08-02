#!/usr/bin/env python3
"""גיליונות מגע לתיוג ויזואלי של תמרורים.

הבעיה: כדי לחבר 415 תמונות שאלה ל-438 קודי תמרור צריך להסתכל על כולן.
פתיחה אחת-אחת היא מאות פעולות. גיליון מגע אחד מציג 40 תמונות עם תווית
לכל אחת, כך שכל האוסף נסקר בכ-20 מבטים במקום 800.

הכלי הזה אינו חלק מהאתר ואינו נטען למבקרים — הוא כלי בנייה בלבד.

⚠️ קובצי התמונות עצמם אינם בריפו (ראה .gitignore ו-teoria/docs/licence.md).
   הכלי רץ מול תיקייה מקומית ומייצר גיליונות מקומיים.

שימוש:
    python3 scripts/teoria_contact_sheets.py \
        --src teoria/data/signs --out /tmp/sheets/signs --cols 8 --rows 5
    python3 scripts/teoria_contact_sheets.py \
        --src teoria/data/images --out /tmp/sheets/questions --cols 5 --rows 4
"""

import argparse
import pathlib
import sys

from PIL import Image, ImageDraw, ImageFont

CELL_PAD = 8
LABEL_H = 22
BG = (255, 255, 255)
GRID = (200, 200, 200)
LABEL_BG = (32, 32, 32)
LABEL_FG = (255, 255, 255)
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}


def load_font(size):
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        if pathlib.Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                pass
    return ImageFont.load_default()


def fit(img, box_w, box_h):
    """הקטנה לשמירת יחס בתוך התא. אף פעם לא מגדילה — הגדלה מטשטשת
    ועלולה לגרום לי לזהות תמרור לא נכון."""
    img = img.convert("RGBA")
    scale = min(box_w / img.width, box_h / img.height, 1.0)
    if scale < 1.0:
        img = img.resize(
            (max(1, int(img.width * scale)), max(1, int(img.height * scale))),
            Image.LANCZOS,
        )
    # רקע לבן — חלק מהתמרורים לבנים עם מסגרת, ועל רקע שקוף הם נעלמים
    flat = Image.new("RGB", (img.width, img.height), BG)
    flat.paste(img, (0, 0), img)
    return flat


def build(src, out, cols, rows, cell):
    src, out = pathlib.Path(src), pathlib.Path(out)
    if not src.is_dir():
        sys.exit(f"לא נמצאה תיקיית מקור: {src}")

    files = sorted(
        (p for p in src.iterdir() if p.suffix.lower() in EXTS),
        key=lambda p: (len(p.stem), p.stem),
    )
    if not files:
        sys.exit(f"אין קובצי תמונה ב-{src}")

    out.mkdir(parents=True, exist_ok=True)
    font = load_font(13)
    per = cols * rows
    cw = cell + CELL_PAD * 2
    ch = cell + CELL_PAD * 2 + LABEL_H
    sheets = 0

    for start in range(0, len(files), per):
        chunk = files[start : start + per]
        sheet = Image.new("RGB", (cols * cw, rows * ch), BG)
        draw = ImageDraw.Draw(sheet)

        for i, path in enumerate(chunk):
            cx, cy = (i % cols) * cw, (i // cols) * ch
            draw.rectangle([cx, cy, cx + cw - 1, cy + ch - 1], outline=GRID)
            try:
                thumb = fit(Image.open(path), cell, cell)
            except OSError as exc:
                draw.text((cx + 6, cy + 6), f"שגיאה: {exc}", fill=(200, 0, 0), font=font)
                continue
            sheet.paste(
                thumb,
                (cx + CELL_PAD + (cell - thumb.width) // 2,
                 cy + CELL_PAD + (cell - thumb.height) // 2),
            )
            ly = cy + ch - LABEL_H
            draw.rectangle([cx, ly, cx + cw - 1, cy + ch - 1], fill=LABEL_BG)
            # התווית היא מזהה הקובץ — היא מה שמאפשר לרשום את המיפוי אחר כך
            label = path.stem
            draw.text((cx + 5, ly + 4), label, fill=LABEL_FG, font=font)

        sheets += 1
        dest = out / f"sheet-{sheets:02d}.png"
        sheet.save(dest, optimize=True)
        print(f"{dest}  —  {len(chunk)} תמונות ({chunk[0].stem} … {chunk[-1].stem})")

    print(f"\n{len(files)} תמונות ב-{sheets} גיליונות ({per} לגיליון).")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--src", required=True, help="תיקייה עם קובצי התמונות")
    ap.add_argument("--out", required=True, help="תיקיית יעד לגיליונות")
    ap.add_argument("--cols", type=int, default=8)
    ap.add_argument("--rows", type=int, default=5)
    ap.add_argument("--cell", type=int, default=150, help="צלע התא בפיקסלים")
    a = ap.parse_args()
    build(a.src, a.out, a.cols, a.rows, a.cell)
