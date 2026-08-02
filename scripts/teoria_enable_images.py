#!/usr/bin/env python3
"""מפעיל את שאלות התמונה אחרי שהתקבל אישור בכתב ממשרד התחבורה.

הצעד היחיד שצריך לבצע ביום שהאישור מגיע. הסקריפט עושה הכול יחד:

  1. מאמת ש-439 קובצי התמונה קיימים ו-sha256 שלהם תואם למניפסט.
  2. מסיר את החסימה של תיקיות התמונות מ-.gitignore.
  3. מדליק imagesEnabled ב-teoria/data/config.json ורושם את פרטי האישור.
  4. מקדם את מספרי ה-cache-busting בכל דפי התיאוריה.
  5. מריץ את scripts/validate_site.py.

⚠️ הוא מסרב לרוץ בלי --approved-by ו---approved-on. זה מכוון: הדלקת
   התמונות בלי אישור בכתב היא בדיוק מה שהמנגנון הזה נועד למנוע.

בדיקה יבשה, בלי לשנות כלום:
    python3 scripts/teoria_enable_images.py --check

הפעלה אמיתית:
    python3 scripts/teoria_enable_images.py \
        --approved-by "מערך הדיגיטל הלאומי" \
        --approved-on 2026-09-01 \
        --reference "מייל מיום 01/09/2026"
"""

import argparse
import hashlib
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "teoria" / "data"
CONFIG = DATA / "config.json"
MANIFEST = DATA / "images-manifest.json"
IMAGES = DATA / "images"
GITIGNORE = ROOT / ".gitignore"
PAGES = [
    ROOT / "teoria" / "index.html",
    ROOT / "teoria" / "simulator" / "index.html",
    ROOT / "teoria" / "tamrurim" / "index.html",
    ROOT / "teoria" / "limud" / "index.html",
]
IGNORE_LINES = ("teoria/data/images/", "teoria/data/signs/")


def fail(msg):
    print("❌ " + msg)
    sys.exit(1)


def verify_images():
    """אימות מלא. אין 'כנראה בסדר' — או שכל 439 תואמים, או שנעצרים."""
    if not MANIFEST.exists():
        fail(f"לא נמצא מניפסט: {MANIFEST}")
    files = json.loads(MANIFEST.read_text(encoding="utf-8"))["files"]
    if not IMAGES.is_dir():
        fail(f"תיקיית התמונות אינה קיימת: {IMAGES}\n"
             "   העתיקו לשם את 439 הקבצים לפני ההפעלה.")

    missing, bad = [], []
    for name, meta in files.items():
        p = IMAGES / name
        if not p.exists():
            missing.append(name)
            continue
        if hashlib.sha256(p.read_bytes()).hexdigest() != meta["sha256"]:
            bad.append(name)

    print(f"   תמונות במניפסט : {len(files)}")
    print(f"   קיימות ותואמות : {len(files) - len(missing) - len(bad)}")
    if missing:
        print(f"   ❌ חסרות       : {len(missing)}  {missing[:5]}")
    if bad:
        print(f"   ❌ sha256 שגוי : {len(bad)}  {bad[:5]}")
    if missing or bad:
        fail("אימות התמונות נכשל. לא הודלק דבר.")
    print("   ✅ כל התמונות אומתו בית-בית")
    return len(files)


def clear_gitignore(dry):
    text = GITIGNORE.read_text(encoding="utf-8")
    hits = [ln for ln in text.splitlines() if ln.strip() in IGNORE_LINES]
    if not hits:
        print("   ℹ️  .gitignore כבר אינו חוסם את תיקיות התמונות")
        return
    print(f"   מסיר מ-.gitignore: {hits}")
    if dry:
        return
    out = [ln for ln in text.splitlines() if ln.strip() not in IGNORE_LINES]
    GITIGNORE.write_text("\n".join(out) + "\n", encoding="utf-8")


def flip_config(args, dry):
    cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
    if cfg.get("imagesEnabled") is True:
        print("   ℹ️  imagesEnabled כבר true")
    cfg["imagesEnabled"] = True
    cfg["approval"].update({
        "status": "granted",
        "grantedOn": args.approved_on,
        "grantedBy": args.approved_by,
        "reference": args.reference or "",
    })
    print(f"   imagesEnabled → true · אושר על ידי {args.approved_by} בתאריך {args.approved_on}")
    if not dry:
        CONFIG.write_text(json.dumps(cfg, ensure_ascii=False, indent=1), encoding="utf-8")


def bump_versions(dry):
    """מקדם כל ?v=N בדפי התיאוריה, כדי שדפדפנים לא יגישו JS ישן שמסנן
    את שאלות התמונה החוצה."""
    pat = re.compile(r"((?:teoria\.css|teoria\.js|limud\.js|pool\.js|speech\.js)\?v=)(\d+)")
    for page in PAGES:
        if not page.exists():
            continue
        text = page.read_text(encoding="utf-8")
        new = pat.sub(lambda m: m.group(1) + str(int(m.group(2)) + 1), text)
        if new != text:
            print(f"   cache-busting ↑ {page.relative_to(ROOT)}")
            if not dry:
                page.write_text(new, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="בדיקה יבשה, לא משנה קבצים")
    ap.add_argument("--approved-by", help="שם הגורם שאישר בכתב")
    ap.add_argument("--approved-on", help="תאריך האישור, YYYY-MM-DD")
    ap.add_argument("--reference", help="אסמכתה — נושא המייל או מספר פנייה")
    a = ap.parse_args()

    dry = a.check
    print("=== בדיקה יבשה ===\n" if dry else "=== הפעלת שאלות התמונה ===\n")

    if not dry and not (a.approved_by and a.approved_on):
        fail("חובה --approved-by ו---approved-on.\n"
             "   אין להדליק את התמונות בלי אישור בכתב. ראה teoria/docs/licence.md.")

    print("1. אימות התמונות")
    count = verify_images()
    print("\n2. .gitignore")
    clear_gitignore(dry)
    print("\n3. config.json")
    if dry:
        cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
        print(f"   כרגע imagesEnabled = {cfg.get('imagesEnabled')} → יעבור ל-true")
    else:
        flip_config(a, dry)
    print("\n4. cache-busting")
    bump_versions(dry)

    print("\n5. ולידציה")
    r = subprocess.run([sys.executable, str(ROOT / "scripts" / "validate_site.py")],
                       capture_output=True, text=True)
    print("   " + (r.stdout or r.stderr).strip().replace("\n", "\n   "))
    if r.returncode != 0:
        fail("validate_site.py נכשל")

    if dry:
        print(f"\n✅ בדיקה יבשה עברה. {count} תמונות מוכנות. לא שונה דבר.")
    else:
        print(f"\n✅ הופעל. {count} תמונות, כל 1,273 השאלות זמינות.")
        print("\nנותר לכם:")
        print("   git add -A && git commit -m 'teoria: הפעלת שאלות התמונה לאחר אישור בכתב'")
        print("   ⚠️  הקומיט הזה מוסיף ~8MB של תמונות לריפו ציבורי — כלומר מפרסם אותן.")
        print("       ודאו שהאישור בכתב בידכם לפני שדוחפים.")


if __name__ == "__main__":
    main()
