# CLAUDE.md - ניהול האתר של אבי אלחרר

## מידע על הפרויקט
- **אתר**: https://avielharar.co.il
- **ריפו**: https://github.com/itzikhr18/avi-elharar-site
- **דומיין**: avielharar.co.il (רשום עד 01/04/2028)
- **אחסון**: GitHub Pages
- **Google Analytics**: G-Q3V66EP3E5
- **Google Search Console**: מחובר (נכס: https://avielharar.co.il)
- **Google Business Profile**: נוצר, ממתין לאימות

## מידע על העסק
- **שם**: אבי אלחרר - מורה נהיגה וטסטר לשעבר
- **בית ספר**: בית הספר לנהיגה יוני (מאז 1976)
- **אזורי פעילות**: ירושלים ומעלה אדומים
- **טלפון**: 052-8449147
- **רכב**: אוטומטי
- **אזורי טסט**: ארנונה, תלפיות, ארמון הנציב, מלחה, טלביה, הר חומה, גבעת משואה, קרית מנחם, מושבה גרמנית, מעלה אדומים
- **מחירים**: שיעור בודד ₪190, שיעור כפול ₪380

## מבנה האתר
- `index.html` - דף יחיד עם כל הסקשנים
- `style.css` - עיצוב (RTL, responsive, dark theme)
- `main.js` - אינטראקטיביות ונגישות
- `sitemap.xml` - מפת אתר עם image sitemap
- `robots.txt` - הנחיות לסורקים
- `CNAME` - חיבור דומיין מותאם

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
- [x] Schema: DrivingSchool + LocalBusiness + FAQPage (16 שאלות) + OfferCatalog (3 שירותים) + WebSite
- [x] Review Schema + aggregateRating: הוחזרו ב-13/04/2026 עם 4 ביקורות אמיתיות מגוגל (5.0 כוכבים)
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
- [x] Google Business Profile — מאומת ופעיל (13/04/2026), 4 ביקורות, 5.0 כוכבים

### מה עדיין צריך:
- [ ] ביקורות נוספות בגוגל (יעד: 15-20, כרגע 4)
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
