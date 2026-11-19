#!/usr/bin/env python3
"""One-off edit script (19/11/2026): content/intent upgrades for 5 weak pages.
Idempotency is not guaranteed — run once on a clean checkout of main."""
import json, re, html
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
FEES_PDF = "https://www.gov.il/BlobFolder/policy/car_fees_2026/he/%D7%94%D7%95%D7%A8%D7%90%D7%AA%20%D7%A0%D7%95%D7%94%D7%9C%20%D7%90%D7%92%D7%A8%D7%95%D7%AA%20%D7%90%D7%A4%D7%A8%D7%99%D7%9C%202026%20%D7%97%D7%AA%D7%95%D7%9E%D7%94.pdf"
TODAY = "19.11.2026"

def rd(p): return (ROOT / p / "index.html").read_text(encoding="utf-8")
def wr(p, s): (ROOT / p / "index.html").write_text(s, encoding="utf-8")

def rep(s, old, new, count=None):
    n = s.count(old)
    assert n >= 1, f"anchor not found: {old[:80]}"
    if count is not None: assert n == count, f"expected {count} got {n}: {old[:60]}"
    return s.replace(old, new)

def meta_desc(s):
    return re.search(r'<meta name="description" content="([^"]*)"', s).group(1)

def set_title_desc(s, title, desc):
    old_t = re.search(r"<title>(.*?)</title>", s).group(1)
    old_d = meta_desc(s)
    s = rep(s, old_t, html.escape(title, quote=True) if False else title)
    s = rep(s, old_d, desc)
    return s, old_t, old_d

def faq_html(items):
    return "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in items)

def strip_tags(x): return re.sub(r"<[^>]+>", "", x)

def add_faq(s, items):
    """Append items to visible .content-faq and to the FAQPage JSON-LD."""
    i = s.index('<div class="content-faq">')
    j = s.index("</div></section>", i)
    s = s[:j] + faq_html(items) + s[j:]
    m = re.search(r'<script type="application/ld\+json">\s*(\{[^<]*?"@type": "FAQPage".*?\})\s*</script>', s, re.S)
    data = json.loads(m.group(1))
    for q, a in items:
        data["mainEntity"].append({"@type": "Question", "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}})
    s = s[:m.start(1)] + json.dumps(data, ensure_ascii=False, indent=2) + s[m.end(1):]
    return s

def new_faq_block(s, items):
    """For pages without FAQ: add visible section before source-note + JSON-LD before </head>."""
    sec = f'<section class="content-section"><h2>שאלות נפוצות</h2><div class="content-faq">{faq_html(items)}</div></section>'
    s = rep(s, '<p class="source-note">', sec + '<p class="source-note">', 1)
    data = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}} for q, a in items]}
    s = rep(s, "</head>", '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + "\n</script>\n</head>", 1)
    return s

def bump_updated(s, old_date):
    return rep(s, f'עודכן: <bdi dir="ltr">{old_date}</bdi>', f'עודכן: <bdi dir="ltr">{TODAY}</bdi>', 1)

CHANGES = {}

# ---------------- 1. מחירון ----------------
p = "mehiron-shiurei-nehiga"; s = rd(p)
s, ot, od = set_title_desc(s,
    "מחירון שיעורי נהיגה 2026 וכמה עולה להוציא רישיון | ירושלים",
    "מחירון שיעורי נהיגה בירושלים ומעלה אדומים: שיעור 40 דק' 200 ₪, כפול 400 ₪. וכל עלויות הרישיון ב-2026: אגרת טסט 165 ₪, אגרת תאוריה, העמדת רכב ואגרת רישיון — בחישוב אחד.")
CHANGES[p] = (ot, od)
s = rep(s, "מחיר שיעורי נהיגה בירושלים ומעלה אדומים", "מחירון שיעורי נהיגה 2026 בירושלים ומעלה אדומים")
s = rep(s, '<p class="eyebrow">מחירון מעודכן ל־26.08.2026</p>', '<p class="eyebrow">שיעורים, אגרות וחישוב עלות מלא</p>', 1)
s = bump_updated(s, "26.08.2026")
s = rep(s, "<p>המחיר ומועד התשלום מאושרים בשיחת ההתאמה.",
    '<p>כל השיעורים אצל אבי הם על רכב אוטומטי, והמחיר אחיד בירושלים ובמעלה אדומים. כמה שיעורים תצטרכו בפועל? ראו את המדריך <a href="/maamarim/kama-shiurei-nehiga-tzarich/">כמה שיעורי נהיגה צריך</a>.</p><p>המחיר ומועד התשלום מאושרים בשיחת ההתאמה.', 1)
old_fees = re.search(r'<section class="content-section"><h2>טסט חיצוני ואגרות</h2>.*?</section>', s).group(0)
s = rep(s, old_fees,
    '<section class="content-section"><h2>אגרות משרד התחבורה ב-2026</h2>'
    '<p>אלה תשלומים למדינה ולא לבית הספר. הסכומים לקוחים מהוראת נוהל האגרות 01/2026 של אגף הרישוי, שבתוקף מ-1 באפריל 2026:</p>'
    '<ul><li><strong>אגרת מבחן עיוני (תאוריה):</strong> 57 ₪ לכל ניסיון. הסכום המחייב הוא זה שמוצג לכם בעת התשלום.</li>'
    '<li><strong>אגרת מבחן מעשי (טסט):</strong> 165 ₪ לכל ניסיון, כולל טסט חוזר.</li>'
    '<li><strong>העמדת רכב לטסט:</strong> עד 229 ₪, משולם למורה. זה מחיר מרבי בפיקוח, לא מחיר קבוע.</li>'
    '<li><strong>אגרת רישיון נהיגה:</strong> נקבעת לפי תקופת התוקף של הרישיון. בטבלה הרשמית היא נעה בין 61 ₪ לשנה ל-517 ₪ לעשר שנים, ומשלמים אותה אחרי מעבר הטסט.</li></ul>'
    '<div class="fact-box"><strong>לפני תשלום:</strong> סכומי האגרות מתעדכנים מעת לעת. בדקו את הסכום העדכני באתר משרד התחבורה וקבלו מבית הספר פירוט של כל רכיב.</div></section>', 1)
s = rep(s, '<section class="content-section"><h2>כמה עולה התהליך כולו</h2><p>',
    '<section class="content-section"><h2>כמה עולה להוציא רישיון נהיגה — חישוב לדוגמה</h2>'
    '<p>חישוב לתלמיד שמסיים את מינימום 28 השיעורים ועובר תאוריה וטסט בניסיון הראשון:</p>'
    '<ul><li>28 שיעורים × 200 ₪ = 5,600 ₪</li><li>רישום לבית הספר: 200 ₪</li><li>טסט פנימי: 180 ₪</li><li>אגרת תאוריה: 57 ₪</li><li>אגרת טסט: 165 ₪</li><li>העמדת רכב לטסט: עד 229 ₪</li></ul>'
    '<div class="fact-box"><strong>סה"כ: כ-6,431 ₪</strong>, לפני אגרת הרישיון עצמה, בדיקת הראייה וחומרי לימוד לתאוריה. כל שיעור נוסף מעבר למינימום מוסיף 200 ₪.</div><p>', 1)
s = rep(s, '<section class="content-section"><h2>איך לחסוך בלי לפגוע בלמידה</h2>',
    '<section class="content-section"><h2>כמה עולה טסט חוזר</h2><p>מי שנכשל משלם שוב את אגרת המבחן המעשי (165 ₪) ואת העמדת הרכב (עד 229 ₪), כלומר עד 394 ₪ לכל ניסיון נוסף, ובנוסף שיעורי חיזוק לפי הצורך. מה עושים אחרי כישלון ואיך בודקים על מה נכשלתם — ב<a href="/maamarim/ma-osim-aharei-kishalon-test/">מדריך אחרי כישלון בטסט</a>.</p></section>'
    '<section class="content-section"><h2>מחיר שיעור נהיגה על אוטומט</h2><p>אצל אבי כל השיעורים הם על רכב אוטומטי: 200 ₪ לשיעור של 40 דקות ו-400 ₪ לשיעור כפול של 80 דקות. המינימום החוקי זהה לידני — 28 שיעורים. מה ההבדל בין רישיון אוטומט לידני ולמי זה מתאים — ב<a href="/limud-nehiga-automati/">עמוד לימוד נהיגה על אוטומט</a>.</p></section>'
    '<section class="content-section"><h2>איך לחסוך בלי לפגוע בלמידה</h2>', 1)
s = add_faq(s, [
    ("כמה עולה להוציא רישיון נהיגה?", "לתלמיד שמסיים ב-28 שיעורים ועובר תאוריה וטסט בניסיון הראשון: כ-6,431 ₪ (שיעורים, רישום, טסט פנימי, אגרות והעמדת רכב), ועוד אגרת הרישיון לפי תקופת התוקף. כל שיעור נוסף מוסיף 200 ₪."),
    ("כמה עולה טסט?", "אגרת המבחן המעשי היא 165 ₪ לכל ניסיון, ובנוסף עד 229 ₪ להעמדת רכב המורה. הטסט הפנימי בבית הספר עולה 180 ₪."),
    ("כמה עולה חידוש רישיון נהיגה?", "חידוש הוא תשלום למשרד התחבורה ואינו קשור לשיעורים. לפי טבלת האגרות של 2026, חידוש לעשר שנים עולה 517 ₪, ולתקופה קצרה יותר — פחות."),
])
s = rep(s, 'המידע נבדק בתאריך 26.08.2026;',
    f'סכומי האגרות: <a href="{FEES_PDF}" target="_blank" rel="noopener">הוראת נוהל אגרות 01/2026 של משרד התחבורה</a>. המידע נבדק בתאריך {TODAY};', 1)
wr(p, s)

# ---------------- 2. כמה שיעורים ----------------
p = "maamarim/kama-shiurei-nehiga-tzarich"; s = rd(p)
s, ot, od = set_title_desc(s,
    "כמה שיעורי נהיגה צריך לפני טסט? המינימום ומדדי מוכנות | 2026",
    "המינימום החוקי לרישיון B הוא 28 שיעורים של 40 דקות — גם באוטומט. אחרי כמה שיעורים אפשר לגשת לטסט, מה קובע את הקצב ואיך יודעים שאתם מוכנים, מבוחן לשעבר.")
CHANGES[p] = (ot, od)
s = bump_updated(s, "11.09.2026")
s = rep(s, '<section class="content-section"><h2>למה אי אפשר לדעת מראש מספר מדויק</h2>',
    '<section class="content-section"><h2>אחרי כמה שיעורים אפשר לגשת לטסט?</h2><p>רק אחרי שלושה תנאים: לפחות 28 שיעורים רשומים, מבחן תאוריה בתוקף ומעבר של טסט פנימי בבית הספר. המינימום זהה ברכב ידני ובאוטומט.</p><p>בפועל, ההחלטה מתי להגיש נעשית לפי מדדי המוכנות שבהמשך העמוד, ולא לפי המונה. תלמיד שמגיע ל-28 שיעורים כשהוא עדיין זקוק להכוונה בכל צומת לא מרוויח כלום מהגשה מוקדמת — רק אגרה נוספת ותור נוסף.</p></section>'
    '<section class="content-section"><h2>למה אי אפשר לדעת מראש מספר מדויק</h2>', 1)
s = rep(s, '<a href="/mehiron-shiurei-nehiga/">המחירון המלא</a> מפריד בין התשלומים.',
    'ב<a href="/mehiron-shiurei-nehiga/">מחירון שיעורי נהיגה</a> יש חישוב מלא של כל הרכיבים, כולל אגרות 2026.', 1)
s = add_faq(s, [
    ("כמה זמן נמשך שיעור נהיגה?", "שיעור תקני נמשך 40 דקות. שיעור כפול נמשך 80 דקות ונספר כשני שיעורים."),
    ("כמה שיעורי נהיגה צריך לאוטומט?", "אותו מינימום: 28 שיעורים לרישיון B, בין אם לומדים על רכב ידני ובין אם על אוטומט. ההבדל הוא רק בהגבלת הרישיון."),
])
wr(p, s)

# ---------------- 3. אוטומט ----------------
p = "limud-nehiga-automati"; s = rd(p)
s, ot, od = set_title_desc(s,
    "רישיון אוטומט — לימוד נהיגה על אוטומט בירושלים | אבי אלחרר",
    "מה זה רישיון אוטומט, מה ההגבלה ולמי זה מתאים. לימוד נהיגה על רכב אוטומטי בירושלים ובמעלה אדומים עם בוחן לשעבר: מינימום 28 שיעורים, 200 ₪ לשיעור של 40 דקות.")
CHANGES[p] = (ot, od)
s = rep(s, "לימוד נהיגה על אוטומט בירושלים ומעלה אדומים", "רישיון אוטומט: לימוד נהיגה על אוטומט בירושלים ומעלה אדומים")
s = bump_updated(s, "26.08.2026")
s = rep(s, '<section class="content-section"><h2>מה לומדים</h2>',
    '<section class="content-section"><h2>מה זה רישיון אוטומט?</h2><div class="fact-box"><strong>בקצרה:</strong> רישיון אוטומט הוא רישיון נהיגה רגיל לרכב פרטי (דרגה B) עם הגבלה אחת — מותר לנהוג בו רק ברכב עם תיבת הילוכים אוטומטית. ההגבלה נרשמת כשעוברים את הטסט ברכב אוטומטי.</div><p>כל השאר זהה לרישיון ידני: אותו מבחן תאוריה, אותו מינימום של 28 שיעורים ואותו מבחן מעשי. ההבדל הוא ברכב שעליו לומדים ונבחנים, ובהגבלה שנרשמת ברישיון בסוף.</p></section>'
    '<section class="content-section"><h2>מה לומדים</h2>', 1)
s = rep(s, '<section class="content-section"><h2>איך מתחילים</h2>',
    '<section class="content-section"><h2>ידני או אוטומט — איך מחליטים</h2><ul><li><strong>איזה רכב יחכה לכם אחרי הרישיון?</strong> אם הרכב בבית או ברכב העבודה אוטומטי, רישיון אוטומט מספיק.</li><li><strong>האם תצטרכו לנהוג ברכב ידני?</strong> אם כן, כדאי ללמוד על ידני מההתחלה במקום להסיר את ההגבלה אחר כך.</li><li><strong>עומס בלמידה:</strong> באוטומט הקשב פנוי לתנועה, לתצפית ולקבלת החלטות, וזה מורגש בעיקר בעליות ובפקקים של ירושלים.</li></ul></section>'
    '<section class="content-section"><h2>כמה עולה לימוד נהיגה על אוטומט</h2><p>אצל אבי שיעור של 40 דקות עולה 200 ₪ ושיעור כפול של 80 דקות 400 ₪ — אותו מחיר כמו בכל השירותים. 28 שיעורי המינימום עולים 5,600 ₪, לפני רישום, טסט פנימי ואגרות. החישוב המלא נמצא ב<a href="/mehiron-shiurei-nehiga/">מחירון שיעורי נהיגה</a>, והסבר על מספר השיעורים בפועל — ב<a href="/maamarim/kama-shiurei-nehiga-tzarich/">כמה שיעורי נהיגה צריך</a>.</p></section>'
    '<section class="content-section"><h2>איך מתחילים</h2>', 1)
s = add_faq(s, [
    ("מה זה רישיון אוטומט?", "רישיון נהיגה לרכב פרטי (דרגה B) עם הגבלה לרכב אוטומטי בלבד. הוא ניתן למי שעבר את הטסט ברכב אוטומטי."),
    ("כמה עולה שיעור נהיגה על אוטומט?", "אצל אבי 200 ₪ לשיעור של 40 דקות ו-400 ₪ לשיעור כפול של 80 דקות."),
])
wr(p, s)

# ---------------- 4. מה מביאים לטסט ----------------
p = "maamarim/ma-meviim-letest"; s = rd(p)
s, ot, od = set_title_desc(s,
    "מה צריך להביא לטסט נהיגה? רשימת המסמכים המלאה | 2026",
    "מה צריך להביא לטסט נהיגה: מסמך מזהה, אישור תשלום אגרה ומשקפיים אם הם נדרשים — וזה הכול. מה מיותר, מה בית הספר מסדיר ומתי להגיע, לפי משרד התחבורה.")
CHANGES[p] = (ot, od)
s = rep(s, "מה מביאים לטסט נהיגה?", "מה צריך להביא לטסט נהיגה?")
s = bump_updated(s, "26.08.2026")
s = rep(s, '<div class="content-meta"><span>מאת אבי אלחרר</span><span>עודכן: <bdi dir="ltr">' + TODAY + '</bdi></span></div></header>',
    '<div class="content-meta"><span>מאת אבי אלחרר</span><span>עודכן: <bdi dir="ltr">' + TODAY + '</bdi></span></div>'
    '<div class="quick-answer"><p class="quick-answer__title">בקצרה: מה צריך להביא לטסט</p><p>שלושה דברים: <strong>תעודת זהות, דרכון או רישיון נהיגה</strong>; <strong>אישור תשלום אגרת המבחן</strong>; ו<strong>משקפיים או עדשות</strong> אם הם נדרשים לפי בדיקת הראייה. טופס ירוק מנייר לא צריך.</p></div></header>', 1)
s = rep(s, '<section class="content-section"><h2>מה לא ניתן להכין מראש</h2>',
    '<section class="content-section"><h2>טסט נהיגה או טסט לרכב?</h2><p>אם חיפשתם מה להביא ל"טסט לרכב" — כלומר מבחן הרישוי השנתי של הרכב במכון רישוי — זה הליך אחר, והעמוד הזה לא עוסק בו. כאן מדובר במבחן המעשי לקבלת רישיון נהיגה.</p></section>'
    '<section class="content-section"><h2>מה לא ניתן להכין מראש</h2>', 1)
s = new_faq_block(s, [
    ("מה צריך להביא לטסט נהיגה?", "מסמך מזהה (תעודת זהות, דרכון או רישיון נהיגה), אישור תשלום אגרת המבחן, ומשקפיים או עדשות מגע אם הם נדרשים לפי בדיקת הראייה."),
    ("צריך להביא טופס ירוק לטסט?", "לא. הרישום לבית הספר והזכאות למבחן מנוהלים במערכת, ואין צורך בטופס ירוק מנייר."),
    ("מתי צריך להגיע לטסט?", "לפחות עשר דקות לפני המבחן, בהתאם להנחיה הרשמית. בית הספר והמורה מתאמים איתכם את נקודת המפגש."),
    ("כמה עולה אגרת הטסט?", 'אגרת המבחן המעשי היא 165 ₪ לכל ניסיון, ובנוסף משלמים למורה עד 229 ₪ על העמדת הרכב. הפירוט המלא ב<a href="/mehiron-shiurei-nehiga/">מחירון</a>.'),
])
wr(p, s)

# ---------------- 5. אחרי כישלון (כותרת ותיאור בלבד) ----------------
p = "maamarim/ma-osim-aharei-kishalon-test"; s = rd(p)
s, ot, od = set_title_desc(s,
    "איך בודקים על מה נכשלתי בטסט? ברוש, דוח הבוחן ומה עכשיו",
    "על מה נכשלתם בטסט? בודקים בשני מקומות: דוח הבוחן מבית הספר והאזור האישי ב\"ברוש\" (driverstudent.mot.gov.il). בוחן לשעבר מסביר איך לקרוא את הדוח ומה לתרגל.".replace('"', "&quot;"))
CHANGES[p] = (ot, od)
wr(p, s)

json.dump(CHANGES, open("/tmp/seo_changes_old.json", "w"), ensure_ascii=False, indent=1)
print("ok")
