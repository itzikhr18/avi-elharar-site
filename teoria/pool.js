/* ===================================================================
   TeoriaPool — בחירת בריכת השאלות ורינדור התמונות.

   משותף למצב הלימוד ולסימולטור, כדי שלוגיקת ההפעלה של התמונות תשב
   במקום אחד בלבד.

   ⚠️ שאלות התמונה כבויות עד לאישור בכתב ממשרד התחבורה.
      המתג היחיד: data/config.json → imagesEnabled.
      אל תערכו אותו ביד — scripts/teoria_enable_images.py עושה את כל
      הצעדים יחד ומאמת שהקבצים באמת קיימים.
   =================================================================== */
(function (global) {
  'use strict';

  var TEXT_ONLY_KEY = 'teoria.textOnly.v1';

  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
      return r.json();
    });
  }

  /* טוען שאלות + הגדרות + ממדים. ההגדרות והממדים אופציונליים:
     כישלון בהם לא שובר את הכלי, הוא רק משאיר את התמונות כבויות. */
  function load(src) {
    return Promise.all([
      getJSON(src),
      getJSON('../data/config.json').catch(function () { return {}; }),
      getJSON('../data/image-dims.json').catch(function () { return { dims: {} }; })
    ]).then(function (r) {
      var all = r[0].questions || [];
      var cfg = r[1] || {};
      return {
        all: all,
        config: cfg,
        dims: (r[2] && r[2].dims) || {},
        imagesOn: cfg.imagesEnabled === true
      };
    });
  }

  function fileOf(q) {
    return q.imageRef ? String(q.imageRef).split('/').pop() : null;
  }

  /* textOnly הוא בחירה של המשתמש, לא מגבלה: מי שמשתמש בהקראה לא יכול
     לענות על שאלת תמונה, ולכן אפשר לסנן אותן מרצון. */
  function isTextOnly() {
    try { return localStorage.getItem(TEXT_ONLY_KEY) === '1'; } catch (e) { return false; }
  }
  function setTextOnly(on) {
    try { localStorage.setItem(TEXT_ONLY_KEY, on ? '1' : '0'); } catch (e) {}
  }

  function pool(ctx, textOnly) {
    if (!ctx.imagesOn || textOnly) {
      return ctx.all.filter(function (q) { return !q.imageRef; });
    }
    return ctx.all.slice();
  }

  /* מחזיר <figure> עם התמונה, או null. */
  function imageEl(q, ctx) {
    if (!ctx.imagesOn || !q.imageRef) return null;
    var file = fileOf(q);
    if (!file) return null;

    var fig = document.createElement('figure');
    fig.className = 'q-figure';

    var img = document.createElement('img');
    img.src = (ctx.config.imagesPath || '../data/images/') + file;

    /* ⚠️ ה-alt לא מתאר את התמונה בכוונה. בשאלות "מה פירוש התמרור?"
       תיאור הוא התשובה, ו-alt שמתאר היה הופך את השאלה לחסרת טעם —
       ודווקא עבור מי שתלוי בקורא מסך. במקום זה: alt ענייני, והבהרה
       גלויה שלשאלות תמונה אין תחליף קולי. */
    img.alt = 'איור השאלה, מתוך מאגר השאלות הרשמי של משרד התחבורה';
    img.loading = 'lazy';
    img.decoding = 'async';

    var d = ctx.dims[file];
    if (d) { img.width = d[0]; img.height = d[1]; }   /* מונע קפיצת פריסה */

    fig.appendChild(img);
    return fig;
  }

  /* משפט המצב שמוצג למשתמש. אף פעם לא מסתירים את המגבלה. */
  function poolNotice(ctx, used, textOnly) {
    var total = ctx.all.length;
    if (ctx.imagesOn && !textOnly) {
      return 'נשאלות שאלות מתוך כל ' + total + ' שאלות המאגר, כולל שאלות עם תמונה.';
    }
    if (ctx.imagesOn && textOnly) {
      return 'מצב "בלי תמונות" פעיל: ' + used + ' שאלות מתוך ' + total +
             '. שאלות שדורשות התבוננות בתמונה מסוננות החוצה.';
    }
    return used + ' שאלות זמינות מתוך ' + total + ' במאגר. ' +
           'שאלות עם תמונה ימתינו לאישור בכתב ממשרד התחבורה לשימוש בקובצי התמונה.';
  }

  global.TeoriaPool = {
    load: load,
    pool: pool,
    imageEl: imageEl,
    fileOf: fileOf,
    poolNotice: poolNotice,
    isTextOnly: isTextOnly,
    setTextOnly: setTextOnly
  };
}(window));
