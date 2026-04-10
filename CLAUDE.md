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
- [x] Schema: DrivingSchool + LocalBusiness + FAQPage (16 שאלות) + OfferCatalog (3 שירותים)
- [!] Review Schema + aggregateRating: הוסרו בקומיט 8b44184 בעקבות שגיאות Rich Results ב-GSC. יוחזרו רק כשיצטברו 5+ ביקורות אמיתיות בגוגל
- [x] Meta tags: robots, geo (IL-JM), author, format-detection
- [x] OG tags: title, description, image, site_name, locale
- [x] Twitter Cards: summary_large_image
- [x] Canonical URL: https://avielharar.co.il/
- [x] Alt text ממוקד SEO בכל התמונות
- [x] Sitemap עם image sitemap
- [x] Google Search Console מחובר + sitemap נשלח
- [x] Google Business Profile נוצר

### מה עדיין צריך:
- [ ] אימות Google Business Profile (ממתין לגלויה/SMS)
- [ ] ביקורות בגוגל מתלמידים (יעד: 15-20 ביקורות)
- [ ] רישום באתרי מדריכים (דפי זהב, B144, Bizportal)
- [ ] Backlinks מאתרים רלוונטיים
- [ ] דף פייסבוק/אינסטגרם עסקי
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
