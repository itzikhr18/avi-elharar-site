/* ===================================================================
   TeoriaSpeech — הקראה קולית של שאלות ותשובות.

   למה זה קיים: נבדקו תשעה אתרי תרגול תיאוריה ישראליים, ו**אף אחד מהם
   אינו מציע הקראה** — אפס `<audio>`, אפס `speechSynthesis`. במקביל,
   המבחן הרשמי כן מתקיים בשמע עבור בעלי לקויות למידה. כלומר יש קהל
   שנבחן בפורמט שאי אפשr להתאמן עליו בשום מקום.

   עצמאי לחלוטין: לא נטען באף דף של האתר החי.
   =================================================================== */
(function (global) {
  'use strict';

  var KEY = 'teoria.speech.v1';
  var supported = typeof global.speechSynthesis !== 'undefined' &&
                  typeof global.SpeechSynthesisUtterance !== 'undefined';

  var voice = null;
  var resolveReady;
  var ready = new Promise(function (r) { resolveReady = r; });
  var listeners = [];

  /* ⚠️ getVoices() מחזיר מערך ריק בטעינה הראשונה ברוב הדפדפנים, והרשימה
     מגיעה מאוחר יותר באירוע voiceschanged. בדיקה סינכרונית תחזיר "אין
     קול" גם כשיש. */
  function pickVoice() {
    if (!supported) return null;
    var all = global.speechSynthesis.getVoices() || [];
    if (!all.length) return null;
    /* עברית בלבד. קול לטיני שמנסה לקרוא עברית מפיק ג'יבריש — גרוע
       מלהשתיק את הפיצ'ר. */
    for (var i = 0; i < all.length; i++) {
      if ((all[i].lang || '').toLowerCase().indexOf('he') === 0) return all[i];
    }
    return null;
  }

  function settle() {
    voice = pickVoice();
    resolveReady(!!voice);
    for (var i = 0; i < listeners.length; i++) listeners[i](!!voice);
    listeners = [];
  }

  if (supported) {
    if ((global.speechSynthesis.getVoices() || []).length) {
      settle();
    } else {
      global.speechSynthesis.addEventListener('voiceschanged', settle, { once: true });
      /* רשת ביטחון: יש דפדפנים שלא יורים voiceschanged בכלל. */
      global.setTimeout(function () { if (voice === null) settle(); }, 1600);
    }
  } else {
    resolveReady(false);
  }

  function enabled() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function setEnabled(on) {
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* מצב פרטי */ }
    if (!on) cancel();
  }

  function cancel() {
    if (supported) { try { global.speechSynthesis.cancel(); } catch (e) {} }
  }

  /* מקבל מערך של מחרוזות ומקריא אותן ברצף עם הפסקה קצרה ביניהן,
     כדי ששאלה ותשובות לא יישמעו כמשפט אחד ארוך. */
  function speak(parts) {
    if (!supported || !voice) return;
    cancel();
    var list = [].concat(parts).filter(Boolean);
    for (var i = 0; i < list.length; i++) {
      var u = new global.SpeechSynthesisUtterance(String(list[i]));
      u.voice = voice;
      u.lang = voice.lang || 'he-IL';
      u.rate = 0.95;   /* מעט לאט מברירת המחדל — זה חומר לימוד */
      u.pitch = 1;
      global.speechSynthesis.speak(u);
    }
  }

  function onReady(fn) {
    if (voice !== null) { fn(!!voice); return; }
    ready.then(fn);
    listeners.push(fn);
  }

  /* עצירה כשעוזבים את העמוד — אחרת ההקראה ממשיכה ברקע. */
  global.addEventListener('pagehide', cancel);
  global.document.addEventListener('visibilitychange', function () {
    if (global.document.hidden) cancel();
  });

  global.TeoriaSpeech = {
    supported: supported,
    onReady: onReady,
    speak: speak,
    cancel: cancel,
    isEnabled: enabled,
    setEnabled: setEnabled
  };
}(window));
