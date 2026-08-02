# CLAUDE.md - ניהול האתר של אבי אלחרר

## מידע על הפרויקט
- **אתר**: https://avielharar.co.il
- **ריפו**: https://github.com/itzikhr18/avi-elharar-site
- **דומיין**: avielharar.co.il (רשום עד 01/04/2028)
- **אחסון**: GitHub Pages
- **Google Analytics**: G-Q3V66EP3E5
- **Google Search Console**: מחובר (נכס: https://avielharar.co.il)
- **Google Business Profile**: לא מאומת כרגע, 7 ביקורות 5.0⭐, ממתין לאימות וידאו (ראה היסטוריה 08/05/2026)

## מידע על העסק
- **שם**: אבי אלחרר - מורה נהיגה וטסטר לשעבר
- **בית ספר**: בית הספר לנהיגה יוני (מאז 1976)
- **אזורי פעילות**: ירושלים ומעלה אדומים
- **טלפון**: 052-8449147
- **רכב**: אוטומטי
- **אזורי טסט**: ארנונה, תלפיות, ארמון הנציב, מלחה, טלביה, הר חומה, גבעת משואה, קרית מנחם, מושבה גרמנית, מעלה אדומים
- **מחירים**: שיעור בודד (40 דק') ₪200, שיעור כפול (80 דק') ₪400

## מבנה האתר
- `index.html` - דף הבית עם כל הסקשנים
- `maamarim/index.html` - דף ריכוז מאמרים (hub)
- `maamarim/5-tauyot-test-yerushalayim/index.html` - מאמר: 5 הטעויות שמכשילות בטסט בירושלים
- `style.css` - עיצוב (RTL, responsive, dark theme)
- `main.js` - אינטראקטיביות ונגישות
- `sitemap.xml` - מפת אתר עם image sitemap
- `robots.txt` - הנחיות לסורקים
- `CNAME` - חיבור דומיין מותאם
- `scripts/build_css.py` - בניית `style.min.css` מ-`style.css` (whitespace בלבד, עם אימות זהות מול המקור)
- `scripts/validate_site.py` - בדיקות אוטומטיות לקישורים פנימיים, canonical, Schema, sitemap ונכסי production
- `.github/workflows/validate-site.yml` - הרצת הבדיקות בכל PR ובכל push ל-main

## סקשנים באתר
1. Hero + סטטיסטיקות
2. למה דווקא אבי (proof)
3. אודות אבי (#about)
4. תהליך - 4 שלבים (#process)
5. מחירון (#pricing)
6. אזורי פעילות (#areas) + תיאורים מפורטים
7. המלצות - תמונות + ביקורות טקסטואליות (#testimonials)
8. בוגרים עם רישיון (#graduates)
9. מדריך למתחילים (#beginners-guide)
10. שאלות נפוצות - 16 שאלות (#faq)
11. טופס יצירת קשר (#contact)
12. מדיניות פרטיות (#privacy-policy)
13. תנאי שימוש (#terms-of-use)
14. הצהרת נגישות (#accessibility-statement)

## SEO - מצב נוכחי
### מה בוצע:
- [x] Schema: DrivingSchool (כולל LocalBusiness) + FAQPage (16 שאלות) + OfferCatalog (3 שירותים) + WebSite
- [x] Review Schema + aggregateRating: הוסרו ב-24/05/2026 מה-JSON-LD כדי לא לסמן ביקורות עצמיות/לא עקביות כל עוד ה-GBP לא מאומת; הביקורות נשארו גלויות בעמוד
- [x] Meta tags: robots, geo (IL-JM), author, format-detection
- [x] OG tags: title, description, image, site_name, locale
- [x] Twitter Cards: summary_large_image
- [x] Canonical URL: `<link rel="canonical">` מפורש ב-`<head>`
- [x] Hreflang: `he` + `x-default`
- [x] Favicon: SVG inline (הגה מעוצב)
- [x] Alt text ממוקד SEO בכל התמונות
- [x] Sitemap עם image sitemap
- [x] CSS + JS minified (style.min.css, main.min.js)
- [x] Google Search Console מחובר + sitemap נשלח
- [ ] Google Business Profile — נמחק הפרופיל המאומת הישן ב-08/05/2026; הפרופיל הנוכחי עם 7 הביקורות **לא מאומת** וממתין לאימות וידאו (ראה היסטוריה)

### מה עדיין צריך:
- [ ] **השלמת אימות וידאו ל-GBP החדש** (קריטי — בלי אימות הפרופיל לא מופיע בחיפוש/מפות)
- [ ] בדיקת Rich Results Test אחרי פריסת שינויי ה-Schema של 24/05/2026
- [ ] ביקורות נוספות בגוגל (יעד: 15-20, כרגע 7 על הפרופיל הלא מאומת)
- [x] רישום בדפי זהב (Zap) — בוצע 13/04/2026
- [ ] רישום ב-B144, Drively ושאר הספריות
- [ ] Backlinks מאתרים רלוונטיים
- [x] דף פייסבוק עסקי — פעיל (https://www.facebook.com/share/1FXduxr4NL/)
- [ ] מעקב אחרי דירוג מילות מפתח

## מילות מפתח עיקריות למעקב
1. "מורה נהיגה ירושלים"
2. "מורה נהיגה מעלה אדומים"
3. "לימוד נהיגה אוטומטי ירושלים"
4. "טסט נהיגה ירושלים"
5. "מורה נהיגה מומלץ ירושלים"
6. "אבי אלחרר"
7. "שיעור נהיגה ירושלים מחיר"
8. "הכנה לטסט נהיגה ירושלים"
9. "מורה נהיגה ארנונה תלפיות"
10. "לימוד נהיגה מעלה אדומים"

## דפים משפטיים
- **מדיניות פרטיות**: חוק הגנת הפרטיות, התשמ"א-1981
- **תנאי שימוש**: חוק זכות יוצרים + חוק הגנת הצרכן + סמכות שיפוט ירושלים
- **הצהרת נגישות**: תקן ישראלי ת"י 5568, WCAG 2.0 AA

## ביצועים ונגישות
- אנימציות רקע מבוטלות במובייל (מתחת ל-920px)
- CSS blur מופחת (80px) עם contain:strict
- Lazy loading על כל התמונות (חוץ מ-hero)
- prefers-reduced-motion נתמך
- תפריט נגישות מובנה (גופן, ניגודיות, גווני אפור, סמן גדול)
- localStorage לשמירת העדפות נגישות

## משימות תחזוקה שוטפות
### חודשי:
- [ ] בדיקת Google Search Console לשגיאות
- [ ] בדיקת דירוג מילות מפתח
- [ ] בדיקת ביצועים (PageSpeed Insights)
- [ ] עדכון lastmod ב-sitemap אם יש שינויים

### רבעוני:
- [ ] עדכון מחירים אם השתנו
- [ ] הוספת ביקורות תלמידים חדשות
- [ ] בדיקת קישורים שבורים
- [ ] עדכון תאריכים בדפים משפטיים

### שנתי:
- [ ] חידוש דומיין (תפוגה: 01/04/2028)
- [ ] סקירת SEO מקיפה
- [ ] עדכון Schema אם יש שינויים בשירותים

## היסטוריית שינויים
### 02/08/2026 — יישום מערכת הטיפוגרפיה `itzik-design-system`
- **רקע**: המשתמש ביקש לשפץ את האתר לפי הסקיל `itzik-design-system`. הסקיל עצמו לא היה זמין בסשן (לא בסקילים המקומיים, לא בסקילי claude.ai ולא בקטלוג הפלאגינים), ולכן **סקציית הטיפוגרפיה הודבקה ידנית** על ידי המשתמש ויושמה במלואה. שאר סקציות המערכת (צבעים, spacing, רכיבים) טרם התקבלו — לא נגענו בפלטה ובמרווחים.
- **⚠️ שינוי כיוון מודע**: המערכת מגדירה **משפחת גופן אחת** — Heebo. כתוצאה מכך **`Frank Ruhl Libre` הוסר לגמרי** מהאתר, כולל מהכותרות, מספרי הסטטיסטיקה, מדדי ה-hero והמחירים. זהו ביטול של כיוון ה-"Refined Editorial Luxury" מ-29/05/2026 שהתבסס על display serif. המשתנה `--font-display` נשמר כ-**alias** ל-`--font-body` כדי שכל הכללים הקיימים ימשיכו להתאים בלי שכתוב רוחבי.
- **טעינת גופן**: `family=Frank+Ruhl+Libre:wght@500;700;900&family=Heebo:wght@300;400;500;700;800` → `family=Heebo:wght@400;500;700;800` בכל 4 הדפים (`index.html`, `404.html`, `maamarim/index.html`, דף המאמר). `preconnect` + `display=swap` נשמרו. משקל 300 ירד (לא בשימוש); **כל שימושי `font-weight:900` הומרו ל-800** (h1, `.article-title`, `.mistake__num`) כדי שלא יסונתז משקל שלא נטען.
- **טוקנים חדשים ב-`:root`**: `--fs-lead: 1.15rem`, `--fs-btn: 1rem`, `--fs-sm: .95rem`, `--fs-xs: .9rem`, `--lh-body: 1.7`, `--lh-heading: 1.25`. מכאן ואילך גודל טקסט חדש צריך לצאת מטוקן, לא מ-`font-size` חד-פעמי.
- **בסיס**: `body` קיבל `font-size:18px` + `font-weight:400` מפורשים (קודם ירש 16px מברירת המחדל), ו-`@media(max-width:720px){body{font-size:17px}}` — נקודת שבירה חדשה שלא הייתה באתר (היו רק 920/640/480). `html` לא נדרס, כך ש-`1rem` נשאר 16px.
- **סקאלת כותרות**: `h1` `clamp(2.2rem,5.4vw,4rem)`/900/lh1.04 → `clamp(1.8rem,5vw,3rem)`/800/lh1.25. `h2` `clamp(1.8rem,3.4vw,2.8rem)` → `clamp(1.5rem,3.5vw,2.2rem)`/800/lh1.25. `h3` היה ללא גודל גלובלי (ונדרס פר-רכיב בין 1.05rem ל-1.35rem) → **1.15rem קבוע**/700/lh1.25.
- **ניקוי דריסות רספונסיביות**: הוסרו ~20 דריסות `font-size` מתוך `@media` 920/640/480 (h1, h2, `.subhead`, `.card p`, `.btn`, `.about-lead`, `.faq-item summary` ועוד). ה-`clamp()` על הכותרות + מדרגת ה-17px הן כעת מנגנון הרספונסיביות היחיד; שינויי padding בבלוקים האלה נשמרו.
- **נרמול טקסט הגוף**: כל פסקאות התוכן (`.card p`, `.guide-card p`, `.area-detail-card p`, `.faq-item__body>p`, `.process-step__content p`, `.about-item p`, `.text-review p`, `.article-body p`, `.a11y-statement-content p`) עברו מסקאלה מפוזרת (.88/.92/.93/.95/1/1.05rem) לירושה של 18px. פסקאות פתיח (`.subhead`, `.about-lead`, `.section-intro`, `.article-lead`) → 1.15rem. מטא/קטן → `.95rem`; copyright ו-breadcrumbs → `.9rem`.
- **משקלים**: `.form-note` 500 → 700 (מקביל ל-`.form-status` במפרט), `.footer-links a` → 700 (מקביל ל-`.link-out`). `.btn`/`label`/`summary`/`.brand`/`.process-step__num` כבר תאמו.
- **לא נגענו**: פאנל הנגישות הצף (`.a11y-panel*`, `.a11y-option*`) ותגי ה-micro (`.school-badge__label/__since`, `.price-badge`) — chrome בגודל קבוע שהמפרט לא מכסה, ושינוי בו מסכן פריסה. מצוין כאן במפורש כדי שלא ייחשב לפספוס.
- **תהליך build**: נוסף `scripts/build_css.py` — minifier של whitespace והערות בלבד (בלי כתיבה מחדש של טוקנים), שמסרב לכתוב אלא אם הפלט זהה למקור אחרי הסרת כל תווי הרווח, הסוגריים מאוזנים, מספר הכללים זהה ו-`calc()`/data-URIs שרדו. פלט: 46,251 בתים, חיסכון 8.2%, 458 כללים, 0 שורות חדשות, 3 data-URIs שלמים. ה-README עודכן מ-`cleancss` לסקריפט הזה.
- **אימות**: `scripts/validate_site.py` עובר. נמדדו ערכים מחושבים בדפדפן מול ה-`style.min.css` שנשלח: body 18px/lh1.7, h1 800/lh1.25, h3 18.4px/700, lead 18.4px, btn 16px/700, copyright 14.4px — כולם ב-Heebo. נבדקו גם גבולות נקודת השבירה: 719px→17px, 721px→18px, ו-390px מקבע h1 על 28.8px ו-h2 על 24px (מינימום ה-clamp).
- **cache-busting**: `style.min.css?v=20260529b → ?v=20260802` בכל 4 הדפים. `main.min.js` לא שונה — נשאר `?v=20260524`.
- עדכון sitemap lastmod ל-2026-08-02T12:00:00+03:00 בכל 3 ה-URLs.
- **נקודה לאישור**: לפי המפרט `h3` (18.4px) כמעט זהה בגודלו לטקסט הרץ (18px), כך שההיררכיה בין כותרת-משנה לפסקה נשענת על משקל בלבד. בולט במיוחד בכרטיסי המאמר. זו התנהגות נאמנה למפרט, לא באג — אם רוצים ניגוד חזק יותר צריך להחליט על מדרגת h3 גבוהה יותר במערכת עצמה.

### 21/06/2026 — בדיקת מצב, CI ותיקון פערי תיעוד
- האתר החי נבדק מול `main`: דף הבית, דף המאמרים, המאמר הראשון, CSS, JS, sitemap ו-robots זהים לקבצי המאגר ומחזירים בהצלחה.
- נוסף validator ללא תלויות חיצוניות שבודק את כל דפי ה-HTML, קישורים ונכסים מקומיים, canonical, מזהי fragment, JSON-LD, התאמת sitemap, robots, CNAME וקבצי production.
- נוסף GitHub Actions workflow שמריץ את ה-validator בכל Pull Request ובכל push ל-`main`.
- `README.md` עודכן למבנה הרב-דפי ולמצב ה-Schema הנוכחי; הוסרו מדדי Lighthouse ישנים שלא אומתו מחדש.
- `theme-color` עודכן מהכחול הישן (`#050a14`) לשחור של הפלטה הנוכחית (`#0a0a0a`) בכל שלושת הדפים.
- תגי `hreflang` (`he` ו-`x-default`) שוחזרו בדף הבית לאחר שהבדיקה גילתה שנשארו רק בדפי המאמרים.
- משימות Google החיצוניות נשארות ידניות: אימות וידאו ל-GBP, בקשת אינדוקס לשני דפי המאמרים ובדיקת Rich Results.

### 14/06/2026 — דף תוכן ראשון: מעבר מ-Single Page לאתר רב-דפי (SEO)
- **רקע**: עד היום האתר היה **דף יחיד** (`index.html`). מבחינת גוגל זו מגבלה — דף אחד מתחרה על כל מילות המפתח בבת אחת. המשתמש העלה **קרוסלת אינסטגרם/פייסבוק** של 10 שקופיות ("5 הטעויות שמכשילות תלמידים בטסט בירושלים — מהזווית של מי שישב בצד הבוחן"), שהיא תוכן ייחודי ומעולה אבל "כלוא" בתמונות שגוגל לא קורא. הומר לתוכן HTML אמיתי.
- **דף מאמר חדש** — `/maamarim/5-tauyot-test-yerushalayim/index.html`:
  - 5 הטעויות כ-`<h3>` עם "המחיר שמשלמים" בכל אחת; ביו מחבר; CTA לוואטסאפ + טלפון.
  - **טבלת ההשוואה** (שקופית 09: תהליך רגיל ❌ מול השיטה של אבי ✅) נבנתה כ-HTML אמיתי (grid + רשימות) ולא כתמונה — טוב יותר ל-SEO ולנגישות.
  - מזכיר בשמות את אזורי הטסט (ארנונה, תלפיות, מלחה, טלביה, מעלה אדומים) — סיגנל מקומי.
  - `Article` + `BreadcrumbList` JSON-LD (אומת ב-`JSON.parse`), canonical, hreflang (he/x-default), OG + Twitter, Google Analytics. משתמש ב-`style.min.css` הקיים (`../../`) + בלוק `<style>` ייעודי שיורש את משתני ה-theme.
- **דף ריכוז מאמרים** — `/maamarim/index.html`: hub שמוכן להרחבה עם מאמרים נוספים.
- **חיבורים פנימיים** (`index.html`): פריט "מאמרים" בתפריט הניווט + קישור הקשרי בסוף סקשן ה-FAQ. קריטי לגילוי ולהעברת "מיץ" SEO.
- **רכוך טענות מספריות**: בהתאם להחלטה מ-24/05 (הסרת טענות לא מאומתות), בגרסת האתר "97% שביעות רצון" → "רוב מוחלט / כמעט כל" ו-"80% מהטסטים בארנונה" → "חלק גדול מהנכשלים בארנונה". התמונות המקוריות של הקרוסלה **לא** שובצו בדף כדי לא להחזיר את המספרים ה"צרובים".
- **sitemap.xml**: נוספו `/maamarim/` (priority 0.7) ו-`/maamarim/5-tauyot-test-yerushalayim/` (0.8); lastmod עודכן ל-2026-06-14T18:30:00+03:00.
- מוזג ב-PR #57.
- **משימות ידניות פתוחות (צד יצחק)**: בקשת אינדוקס ל-2 ה-URLs ב-Search Console; Rich Results Test ל-Article Schema.

### 29/05/2026 — שדרוג עיצובי "Refined Editorial Luxury" (frontend-design skill) + תיקון מערכת פונטים
- **רקע**: בקשת המשתמש לשדרג את העיצוב רמה/כמה רמות בעזרת ה-skill הרשמי `frontend-design` של Anthropic, **תוך שמירה מלאה על צבעי המותג וקו העיצוב** (שחור + זהב קלאסי + קרם חם, dark theme, RTL). הכיוון שנבחר: *Refined Editorial Luxury* — שדרוג מדוד דרך טיפוגרפיה ופרטים, לא מקסימליזם. אף משתנה צבע (`--primary`/`--accent`/וכו') לא שונה.
- **🐛 תיקון באג פונטים קריטי**: ה-HTML טען רק `Heebo` אבל ה-CSS השתמש ב-`font-family:"Rubik"` שלא נטען מעולם → כל האתר הוצג ב-system-ui (fallback). תוקן.
- **מערכת טיפוגרפיה חדשה** (`style.css`): נוספו 2 משתני CSS — `--font-display:"Frank Ruhl Libre",Georgia,serif` (serif עברי קלאסי-יוקרתי, תואם "מאז 1976" + זהב) ו-`--font-body:"Heebo",system-ui,sans-serif`. הכותרות (`h1`/`h2`/`h3`), מספרי הסטטיסטיקה (`.stat-item__number`), מדדי ה-hero (`.hero-metrics strong`) והמחירים (`.price-row__amount`) עברו ל-display serif; הגוף נשאר Heebo מעודן. נוסף `text-wrap:balance` לכותרות. ה-`<link>` לגוגל-פונטס עודכן: `Frank+Ruhl+Libre:wght@500;700;900` + `Heebo:wght@300;400;500;700;800`.
- **אקסנט זהב editorial** מתחת לכל כותרת סקשן: `.section h2::after` — פס זהב 56×3px עם glow (logical alignment, מיושר לימין ב-RTL).
- **Sheen זהב על כפתור CTA ראשי**: `.btn-primary::after` — הבזק אור אלכסוני שחולף על הכפתור ב-hover (משתמש ב-`inset-inline-start` ל-RTL-safe).
- **פס גלילה מותאם** בזהב (`::-webkit-scrollbar*` + `scrollbar-color`).
- **🐛 בונוס — תיקון `NaNs`**: ה-`style.min.css` שהוגש הכיל `animation-duration:NaNs`/`transition-duration:NaNs` (ערך לא תקין) בבלוק `prefers-reduced-motion`, בעוד המקור (`style.css`) תקין עם `.01ms`. הרגנרציה של ה-min מהמקור תיקנה זאת.
- **תהליך build בטוח**: `style.min.css` יוצר מחדש מ-`style.css` (מקור האמת) ע"י minifier ייעודי שמגן על strings/data-URIs ומאמת `normalize(out)==normalize(src)` + איזון סוגריים. אומת: 0 newlines, 471 בלוקים, 3 ה-SVG data-URIs שלמים, `calc(100% - 2.5rem)` נשמר.
- **cache-busting**: `style.min.css?v=20260529 → ?v=20260529b`. `main.min.js` לא שונה.
- עדכון sitemap lastmod ל-2026-05-29T16:30:00+03:00.

### 29/05/2026 — שחזור רכיבים שאבדו + noscript fallback (ביקורת מצב)
- **רקע**: ביקורת מצב מקיפה (קוד + SEO + חשיפה) חשפה שני רכיבים שתועדו כ"בוצע" אך **נעלמו מהקוד החי** — ככל הנראה אבדו ב-refresh הפלטה של 03/05 (208 החלפות) או בעריכה אחרת. שוחזרו.
- **`WebSite` Schema שוחזר** (`index.html`): נוסף בלוק `application/ld+json` שלישי עם `@type: WebSite`, שם, `url`, `inLanguage: he` ו-`publisher` שמפנה ב-`@id` ל-`#driving-school`. לא נוסף `SearchAction` (אין חיפוש פנימי באתר). מספר בלוקי ה-Schema: 2 → 3. כולם אומתו ב-`JSON.parse`.
- **`sameAs` לפייסבוק שוחזר** (`index.html`): נוסף `"sameAs": ["https://www.facebook.com/share/1FXduxr4NL/"]` ל-`DrivingSchool` — מחזק Entity + backlink/סיגנל חברתי. חיפוש "facebook" בקוד החזיר 0 לפני התיקון.
- **קישור פייסבוק גלוי בפוטר** (`index.html`): נוסף `<a target="_blank" rel="noopener">פייסבוק</a>` ב-`footer-links` — דף הפייסבוק הפעיל לא היה מקושר משום מקום באתר.
- **noscript fallback לסקשנים משפטיים** (`style.css` + `style.min.css`): הסקשנים `#privacy-policy`/`#terms-of-use`/`#accessibility-statement` מוסתרים ב-`style="display:none"` inline ונחשפו רק ב-JS. נוסף כלל `:target{display:block!important}` (אחרי `.skip-link:focus`) — חשיפה דרך ניווט hash גם בלי JS. ה-`!important` ב-stylesheet גובר על inline-style רגיל. מתח עם handler ה-JS אין: ה-JS עושה preventDefault ומציג ישירות, וה-fallback פועל רק כשאין JS.
- **cache-busting**: `style.min.css?v=20260524 → ?v=20260529` (CSS שונה). `main.min.js` לא שונה — נשאר `?v=20260524`.
- עדכון sitemap lastmod ל-2026-05-29T12:00:00+03:00.
- **לא בקוד (משימות פתוחות שעלו בביקורת)**: אימות וידאו ל-GBP (קריטי, חוסם Local Pack), ביקורות 7→15+, רישום ב-B144/Easy/Midrag, דפי-נחיתה לאזורים, בלוג.

### 24/05/2026 — הסרת ה-Custom Cursor לחלוטין
- **רקע**: לאתר היה Custom Cursor בדסקטופ — נקודה זהובה (8px) שעוקבת בזמן אמת אחרי הסמן + טבעת זהובה (36px) עם עיכוב חלק (easing 0.12). על אלמנטים אינטראקטיביים הם גדלו ל-16px/50px. רץ רק בדסקטופ (>920px) ולא ל-prefers-reduced-motion. בקשת הסרה מהמשתמש — הוסר לחלוטין.
- **קבצים שעודכנו** (4):
  - `style.css`: הוסר בלוק "Custom Cursor" (שורות 312-317) + 2 כללי `display:none` (mobile media query + prefers-reduced-motion)
  - `style.min.css`: הוסרו אותם 3 אזורים — בלוק ראשי 733 בתים + 2 כללי hide 48 בתים כל אחד (סך 829 בתים)
  - `main.js`: הוסר בלוק "Custom Cursor" (שורות 99-100) — היצירה של 2 ה-divs, ה-mousemove listener, ה-requestAnimationFrame loop של הטבעת, וה-mouseenter/leave handlers על כל האלמנטים האינטראקטיביים
  - `main.min.js`: ניתוח עדין — המינימייזר עטף את הקוד בתוך `if(F||TILT,F||MAGNETIC,!F&&innerWidth>920){CURSOR_BODY}` (comma expression בתנאי ה-if שמריץ את ה-3D tilt ו-magnetic buttons כ-side effects). פתרון: החלפת ה-if שלם ב-`F||TILT;F||MAGNETIC;` — שומר את ה-tilt וה-magnetic, מסיר רק את הסמן. חיסכון 773 בתים. אומת ב-`node --check`
- **cache-busting**: `?v=20260524` על style.min.css ו-main.min.js (במקום 20260511b/20260511)
- עדכון sitemap lastmod ל-2026-05-24T15:00:00+03:00

### 24/05/2026 — יישום Quick Wins ל-SEO on-page
- **Title / Meta / H1**: כוונו לביטוי הראשי "מורה נהיגה בירושלים ומעלה אדומים" יחד עם USP ברור "טסטר לשעבר" כדי לשפר רלוונטיות ו-CTR.
- **סטטיסטיקות Hero**: הערכים מוצגים כבר ב-HTML במקום להתחיל מ-0, כך שגם סורקים שרואים את העמוד לפני אנימציית JS יקבלו נתונים אמיתיים.
- **ניקוי Claims**: הוסרו/רוככו טענות מספריות לא מאומתות כמו "95% הצלחה", "97%" ו"מאות תלמידים"; נשאר ניסוח אמין יותר עד שה-GBP יאומת ויצטברו נתונים רשמיים.
- **Schema**: הוסר `aggregateRating` ובלוקי `Review` מה-JSON-LD כדי למנוע סיכון של review markup לא עקבי/לא זכאי; הביקורות הטקסטואליות נשארו בעמוד כסיגנל אמון למשתמשים.
- **Sitemap**: עודכן `lastmod` ל-2026-05-24T03:03:37+03:00 (הוחלף אחר כך ל-15:00:00 על ידי commit הסרת הסמן).

### 24/05/2026 — בדיקת דירוגים ב-GSC + ניקוי repo + טיוטת מייל ל-GBP
- **בדיקת GSC (28 הימים האחרונים, 25/04–22/05)**: 15 קליקים, 146 חשיפות, CTR 10.27%, מיקום ממוצע 4.4 — מספרים חזקים יחסית למצב "פרופיל GBP לא מאומת".
- **שיפור מדיד בדירוגים** מול תקופה קודמת (26/03–22/04):
  - **"אבי אלחרר"**: עלה ממיקום 2.6 ל-1.7, מ-0 ל-6 קליקים, CTR 15.62% — המותג מתבסס
  - **"מורה נהיגה ירושלים"**: הופיע במיקום 10 (ראש עמוד 2) — close to first page
  - **"מורה נהיגה"** (לבד): מיקום 2 בחיפושים מסוימים
  - **"בית ספר יוני"**: מיקום 9
  - **"מורות לנהיגה בירושלים"**: מיקום 12
- **פילוח מכשירים**: מובייל 12 קליקים (CTR 13%) מתוך 92 חשיפות, דסקטופ 3 קליקים (CTR 5.66%) מתוך 53 — קהל היעד פעיל בעיקר במובייל
- **תובנה אסטרטגית**: התקרה ל-"מורה נהיגה ירושלים" (כרגע 10) היא היעדר Local Pack. בלי GBP מאומת קשה לפרוץ ל-top 3
- **ניקוי `.gitignore`** (commit `f76abf1`): הוספת `.claude/`, `design-philosophy.md`, `kinetic-trust-design-framework.pdf`, `seo-audit-*.md`, `preview.html`, `style-preview.css` כדי לנקות `git status` מקבצי עבודה מקומיים. לא משפיע על האתר החי.
- **הגדרת זהות Git גלובלית**: `Yitzhak Harush <itzikhr18@gmail.com>` — לא הייתה קיימת קודם, חסם commits.
- **טיוטת מייל לתמיכת GBP**: ניסוח בקשה לאופציות אימות חלופיות (Live Video Call / Document upload / Postcard) במקום אימות וידאו של "מקום עסק" שלא קיים ב-Service-Area Business. המייל ממתין למשלוח על ידי יצחק.

### 11/05/2026 — תיקון מתיחה אנכית של תמונת ה-hero בדסקטופ
- **באג שתוקן**: אחרי המעבר ל-`<picture>` ב-Option A, התמונה בדסקטופ נראתה מתוחה אנכית. הסיבה: ב-`style.css`/`style.min.css` לא היה כלל CSS ל-`.hero-visual img` בדסקטופ (היה רק למובייל ב-`@media (max-width:920px)`). הדפדפן נשען על `width="1240" height="1240"` שב-HTML attrs בלבד, ובהקשר הזה (תוך `<picture>` בעמודת grid עם `align-items:center` ו-`min-height:80vh`) ה-`aspect-ratio` המשתמע לא תמיד נכנס לתוקף — מה שגרם למתיחה.
- **פתרון**: הוספת כללי CSS מפורשים ל-`.hero-visual img` ו-`.hero-visual picture` בדסקטופ:
  - `.hero-visual picture{display:block;width:100%}` — picture הוא inline by default, צריך לעטוף לבלוק
  - `.hero-visual img{width:100%;height:auto;max-width:520px;aspect-ratio:1/1;object-fit:cover;border-radius:var(--radius-lg);...}` — מימדים מפורשים + יחס 1:1 + שמירה על proportions
- cache-busting (`?v=20260511b`) על style.min.css כדי לאלץ הורדה רעננה
- עדכון sitemap lastmod ל-2026-05-11T18:00:00+03:00

### 11/05/2026 — דוח ביקורת SEO ו-Quick Wins בקוד
- הופק `docs/seo-audit-2026-05-11.md` — דוח ביקורת SEO מקיף עם ציון לכל קטגוריה, חוזקות, Quick Wins, שיפורים בינוניים, אסטרטגיה ארוכת טווח וטבלת מטלות
- **תיקוני באגים בקוד (Option A):**
  - הוסר `meta keywords` — היה עדיין בקוד למרות שתועד שהוסר ב-10/04 (השארה עלולה לחשוף אסטרטגיה למתחרים, גוגל בכל מקרה מתעלמת)
  - `style.css` → `style.min.css?v=20260511` (`index.html:55`) — נטענה הגרסה המלאה במקום המוקטנת, חיסכון ~4KB
  - `main.js` → `main.min.js?v=20260511` (`index.html:1119`) — חיסכון ~5KB
  - **`<picture>` עם srcset ל-hero** — היה `<img src="hero.jpg">` יחיד (199KB) כשעל הדיסק קיימים 8 וריאנטים. עכשיו מובייל מקבל ~24KB (hero-400.webp) במקום 199KB
  - **preload media-aware** — היה `<link rel="preload" href="hero.jpg">` שמשך תמיד את הקובץ הכבד. עכשיו 2 preloads עם `media`: מובייל מקבל `hero-640.webp` + imagesrcset, דסקטופ `hero.webp`
  - **`aggregateRating: 4.9` → `5.0`** — לא תאם את 4 הביקורות בעלות 5⭐ ב-Schema; 7 ביקורות GBP גם הן 5.0⭐ לפי תיעוד
  - **`og:image:width/height` 1200×630 → 1240×1240** — תיאם את ממדי `hero.jpg` בפועל (תוקן ב-CLAUDE.md ב-03/05 אבל בקוד עדיין היה 1200×630)
- עדכון sitemap lastmod ל-2026-05-11T14:00:00+03:00 כדי לאלץ סריקה מחודשת של גוגל

### 11/05/2026 — שדרוגי Schema (Option B חלקי)
- **`paymentAccepted` עודכן** מ-"Cash, Credit Card, Bank Transfer" ל-"Cash, Bank Transfer, Bit, PayBox" — תיאום למציאות (אבי לא מקבל כרטיס אשראי, אבל מקבל Bit/PayBox שזה הסטנדרט הישראלי)
- **`@id` נוסף ל-DrivingSchool** (`https://avielharar.co.il/#driving-school`) — מאפשר reference נקי מ-Schemas עתידיים (Service per area, Article באמצעות `mentions`, וכו')
- **`openingHoursSpecification` נוסף** עם 3 בלוקים:
  - א'/ג'/ה': 07:00-17:30
  - ב'/ד': 07:00-19:00
  - ו': 07:00-11:00
  - שבת סגור (לא מוגדר ב-Schema = ברירת מחדל)
- מאפשר ל-Google להציג שעות פעילות ב-Knowledge Panel ובתוצאות החיפוש המקומיות (Local Pack)
- **דחיית `Service` per area ל-Option C** — הוספת 2 Service Schemas לעמוד יחיד שמכיל גם DrivingSchool עלולה לבלבל את גוגל לגבי entity ראשי. עדיף שכל Service יישב על דף ייעודי (`/areas/jerusalem/`, `/areas/maale-adumim/`) עם `mainEntityOfPage` משלו
- עדכון sitemap lastmod ל-2026-05-11T16:00:00+03:00

### 08/05/2026 — שני פרופילי GBP, מיזוג נדחה, מחיקת המאומת והשארת הלא-מאומת
- **רקע**: היו במקביל 2 פרופילים עסקיים בגוגל לאבי — אחד מאומת מ-13/04 (4 ביקורות), והשני לא מאומת אבל עם 7 ביקורות אמיתיות 5.0⭐. גוגל פנה אלינו ואמר שמיזוג בין השניים **בלתי אפשרי טכנית**.
- **החלטה**: מחקנו את הפרופיל המאומת (4 ביקורות) והשארנו את הפרופיל עם 7 הביקורות. רציונל: ביקורות הן הנכס שאי-אפשר לשחזר; אימות הוא תהליך שאפשר לחזור עליו. 7 ביקורות 5⭐ חזקות מ-Local Pack מאשר תווית "מאומת" עם פחות ביקורות.
- **מצב נוכחי**: הפרופיל עם 7 הביקורות **לא מאומת** ולכן לא מופיע פומבית בחיפוש/מפות. גוגל מציג כפתור "אימות" אבל **רק אופציית וידאו זמינה** — לא הוצעה גלויה.
- **למה רק וידאו**: גוגל בוחרים מסלול אימות לפי קטגוריה, גיל הפרופיל ופרופיל סיכון. למורי נהיגה (Service-Area Business ללא כתובת ציבורית) ה-default לעיתים קרובות הוא וידאו. הבחירה של גוגל לא ניתנת לשינוי דרך ממשק העריכה.
- **משימה פתוחה**: השלמת אימות וידאו (סרטון רציף 1-3 דק' עם רכב + תעודת מורה נהיגה + רישיון רכב + שם רחוב) או הגשת בקשת תמיכה לגוגל לקבלת אופציית גלויה (Help → Contact Us בתוך ממשק GBP).

### 03/05/2026 — סקשן proof עם 3 תמונות + תיקון באג גובה במובייל
- **הוספת 3 תמונות לסקשן "מה הופך את החוויה לפרימיום אמיתי"**: הסקשן עבר מ-grid של 3 כרטיסיות צרות עם אייקונים בלבד ל-stack של 3 כרטיסיות רחבות בסגנון editorial — תמונה אמיתית בצד אחד + אייקון/כותרת/פסקה בצד השני (במובייל התמונה עוברת למעלה)
- 3 תמונות: `proof-1-route` (נהיגה בכביש בין-עירוני בירושלים עם GPS), `proof-2-precision` (מחברת תכנית שיעור + מחזיק מפתחות), `proof-3-service` (לוחית רישוי + מפתחות + חותמת "עבר/ה")
- 3 גדלים (320/500/800w) × 2 פורמטים (JPG + WebP) = 18 קבצי תמונה, lazy-loaded עם width/height מפורש למניעת CLS
- alt texts מפורטים עם מילות מפתח (טסט, נהיגה, ירושלים), sitemap עודכן עם 3 רשומות תמונה חדשות
- **באג שתוקן (חמור — היו תמונות בקוד אבל לא הוצגו במובייל)**: ב-CSS הסתמכנו על שרשרת `aspect-ratio:16/11 על .card-image → height:100% על picture → height:100% על img`. ב-iOS Safari החישוב נשבר באמצע השרשרת ובלוק התמונה התכווץ ל-0 גובה (אפילו בלי להראות ריבוע ריק). פתרון: גובה קבוע מפורש של 220px על `.card-image` במובייל + `!important` על מימדי ה-img — ללא תלות בשרשרת חישוב
- cache-busting (`?v=20260503d`) על style.min.css ו-main.min.js כדי לאלץ הורדה רעננה
- sitemap lastmod עודכן ל-2026-05-03T11:35:00+03:00 (פורמט W3C מלא במקום תאריך בלבד)

### 03/05/2026 — החלפת תמונת hero
- **החלפת תמונת hero**: התמונה הקודמת הייתה JPEG בגודל 300×260 בלבד (פלייר עם טקסט עמוס) — בעוד שה-OG meta הצהיר 1200×630 (חוסר התאמה משמעותי שפגע בתצוגה ברשתות חברתיות). הוחלפה בצילום פורטרט מקצועי 1254×1254 של אבי במכונית עם הברנדינג "טסטר לשעבר • פחות שיעורים, יותר תוצאה"
- נוצרו 4 גדלים אופטימליים (400/640/960/1240) ב-2 פורמטים (JPG + WebP) — סך 8 וריאנטים לטעינה responsive
- שולב `<picture>` עם `srcset` ו-`sizes` במקום `<img>` יחיד — מובייל מקבל ~44KB WebP במקום קובץ אחד שגודלו לא תאם
- `preload` עודכן עם `media` queries — מובייל טוען `hero-640.webp`, דסקטופ `hero.webp`
- OG/Twitter image dimensions תוקנו ל-1240×1240 (במקום 1200×630 השגוי)
- alt text עודכן לתאר את התמונה החדשה ולכלול את ה-USP "פחות שיעורים יותר תוצאה"
- CSS עודכן: aspect-ratio במובייל מ-3/4 ל-1/1, מימדים 300×300 (במקום 240×320) ו-250×250 ל-mobile קטן
- sitemap lastmod עודכן ל-2026-05-03

### 03/05/2026 — refresh פלטה מ"טכי" ל"קלאסי-יוקרתי"
- **רקע**: הציאן (#6ee7ff) + סגול-לבנדר (#a78bfa) שהיו עד עכשיו השדרו וויב של סטארט-אפ/Web3, וזה התנגש עם תמונת ה-hero החדשה (שחור + זהב) ועם המסר העסקי (מורה נהיגה במסורת בית ספר משנת 1976, קהל הורים)
- **הפלטה החדשה**: שחור עמוק (#0a0a0a/#000) + זהב קלאסי (#d4af37) + זהב בהיר (#f4d03f) + טקסט חמים (#f5f0e8) + רקעי בהיר קרם חמים (#faf7f0)
- **היקף השינוי**: 208 החלפות צבעים ב-5 קבצים — `style.css` (92), `style.min.css` (92), `index.html` (20), `main.js` (2), `main.min.js` (2)
- כולל עדכון: כל משתני ה-CSS (8 צבעים), צבעי bg-orbs (3 כדורי רקע), favicon SVG (זהב על שחור), brand mark gradient (לוגו ההגה), route map gradient, FAQ chevron, particle JS canvas, רקעי כל הסקשנים הבהירים (about/pricing/FAQ), צבעי טקסט ומחירים בסקשנים בהירים
- **נשמרו ללא שינוי**: WhatsApp green (#25D366), כפתור הנגישות (#4a90d9 — מכוון להיות מובחן), צבעי הנגישות (צהוב להדגשת קישורים, אדום ל-reset)
- ניגודיות: כל הצבעים בדקו מול WCAG AA — טקסט כהה (#1a1410) על קרם (#faf7f0) הוא AAA, גופן זהב על שחור הוא AA+

### 14/04/2026
- תיקון שגיאת GSC "aggregateRating מספר ביקורות ללא אובייקט" שהתקבלה עבור ה-URL הישן `itzikhr18.github.io/avi-elharar-site/` (מלפני חיבור הדומיין)
- הסרת `ratingCount` כפול מ-`aggregateRating` — נשאר רק `reviewCount: 4` התואם בדיוק ל-4 אובייקטי `Review` (פתרון "clean" שמונע דו-משמעות לגוגל)
- עדכון lastmod ב-sitemap ל-2026-04-14 לצורך trigger לסריקה מחודשת של גוגל
- הערה: הדומיין העיקרי הוא `avielharar.co.il` — ה-URL של github.io עושה 301 redirect אוטומטי דרך CNAME, וצריך להסיר את הנכס הישן מ-GSC
- **פוליש שני** (אחרי אימות ב-Rich Results Test): פישוט `@type` מ-`["DrivingSchool", "LocalBusiness"]` ל-`"DrivingSchool"` בלבד — מנטרל אזהרת "שדה כפול url" של גוגל. `DrivingSchool` כבר subClassOf `LocalBusiness` דרך `AutomotiveBusiness`, אז לא מאבדים כלום
- הערה: `postalCode` ו-`streetAddress` נשארים חסרים במכוון — מורה נהיגה הוא עסק נייד ללא חנות פיזית. `areaServed` (ירושלים + מעלה אדומים) הוא המודל הנכון לפי המלצות גוגל

### 13/04/2026
- Google Business Profile מאומת ופעיל! 4 ביקורות, 5.0 כוכבים
- החזרת Review Schema + aggregateRating עם 2 ביקורות אמיתיות מגוגל (יצחק הרוש, מורן אלחרר)
- רישום בדפי זהב (Zap) בוצע
- עדכון CLAUDE.md ו-directory-submissions.md בהתאם
- דף פייסבוק עסקי פעיל — נוסף `sameAs` ל-Schema (חיזוק Organization + backlink)

### 12/04/2026
- הפקת דוח ביקורת SEO מקיף ותוכנית פעולה
- הוספת `<link rel="canonical">` מפורש ל-`<head>`
- הוספת `hreflang` (he + x-default) לזיהוי שפה
- הוספת favicon (SVG inline — הגה מעוצב)
- הוספת WebSite Schema (שם אתר לגוגל)
- תיקון מחיר חסר בהכנה לטסט ב-OfferCatalog Schema (₪180)
- Minification של CSS (style.min.css — חיסכון 8%) ו-JS (main.min.js — חיסכון 24%)
- עדכון lastmod ב-sitemap ל-2026-04-12
- עדכון CLAUDE.md

### 10/04/2026
- הפקת דוח מצב SEO מקיף (seo-status-report.md)
- תיקון באג JS ב-index.html (תו 'h' עודף בשורה 12 שזרק ReferenceError)
- עדכון lastmod ב-sitemap ל-2026-04-10
- הסרת meta keywords (מיותר — גוגל מתעלמת מ-2009)
- עדכון CLAUDE.md כך שישקף את המצב האמיתי של Review Schema

### 01/04/2026
- הוספת מדיניות פרטיות ותנאי שימוש
- שיפורי SEO מקיפים (Schema, meta tags, geo, keywords)
- הוספת מדריך למתחילים, אזורי טסט מפורטים, ביקורות טקסטואליות
- הרחבת FAQ ל-16 שאלות
- תיקון Review Schema (aggregateRating + datePublished) — הוסר לאחר מכן בעקבות שגיאות Rich Results
- קנייה וחיבור דומיין avielharar.co.il
- הגדרת DNS + HTTPS
- חיבור Google Search Console + שליחת sitemap
- יצירת Google Business Profile
- שיפור OG tags לתצוגה בווטסאפ
