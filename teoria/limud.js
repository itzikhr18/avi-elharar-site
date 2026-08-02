/* ===================================================================
   מצב לימוד — תרגול שאינו מבחן.

   למה זה קיים: בבדיקת תשעה אתרי תרגול ישראליים, **כולם משכפלים את מבנה
   המבחן הרשמי** — 30 שאלות, 40 דקות, 26 לעבור. זה שימושי ביום שלפני
   המבחן וחסר ערך בשבועיים שלפניו. אף אתר לא בנה מצב לימוד.

   ההבדלים המכוונים מהסימולטור:
   · אין טיימר · אין ציון · אין "נכשלת" · משוב מיד אחרי כל שאלה
   · אפשר לחזור רק על מה שטעית בו · 10 שאלות, לא 30

   עצמאי מ-teoria.js ומ-main.js של האתר החי.
   =================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('study');
  if (!root) return;

  var MISSED_KEY = 'teoria.missed.v1';
  var pickEl  = document.getElementById('studyPick');
  var runEl   = document.getElementById('studyRun');
  var doneEl  = document.getElementById('studyDone');
  var stage   = document.getElementById('studyStage');
  var dotsEl  = document.getElementById('studyDots');
  var topicEl = document.getElementById('studyTopic');
  var nextBtn = document.getElementById('studyNext');
  var quitBtn = document.getElementById('studyQuit');

  var ctx = null;              /* TeoriaPool: שאלות, הגדרות, ממדים, מתג התמונות */
  var all = [], round = [], index = 0, answered = false;
  var got = [];               /* true/false לכל שאלה בסבב */
  var perTopic = {};

  /* ---- זוגות מלכודת ----
     שאלות כמעט זהות שהתשובה הנכונה בהן **שונה** — בדיוק המקום שבו מי
     ששינן משפט נופל.

     ⚠️ זיהוי אוטומטי נבדק ונפסל. אשכול לפי דמיון טקסט מצא 41 אשכולות,
     ומהם **31 היו שגויים** — "לחץ אוויר נמוך מדי בצמיגים יגרום:" מופיעה
     שלוש פעמים עם שלוש תשובות נכונות שונות, וכולן נכונות. הודעה בסגנון
     "שיננת ולא הבנת" שם היא פשוט שקר לתלמיד. לכן הרשימה **מאומתת ידנית**
     ומוחזקת ב-data/confusion-pairs.json. עדיף עשרה נכונים מארבעים שחלקם
     מטעים. */
  var twinOf = {};            /* id → { twin, why } */

  function loadPairs() {
    return fetch('../data/confusion-pairs.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        if (!doc || !doc.pairs) return;
        doc.pairs.forEach(function (p) {
          twinOf[p.a.id] = { twin: p.b, why: p.why };
          twinOf[p.b.id] = { twin: p.a, why: p.why };
        });
      })
      .catch(function () { /* הפיצ'ר אופציונלי — כישלון טעינה לא שובר כלום */ });
  }

  function twinBox(q) {
    var rec = twinOf[q.id];
    if (!rec) return null;
    var box = document.createElement('div');
    box.className = 'twin';

    var h = document.createElement('p');
    h.className = 'twin__head';
    h.textContent = 'יש שאלה כמעט זהה — עם תשובה אחרת';
    box.appendChild(h);

    var why = document.createElement('p');
    why.className = 'twin__why';
    why.textContent = rec.why;
    box.appendChild(why);

    var grid = document.createElement('div');
    grid.className = 'twin__grid';
    [[q.text, q.answers[q.correct], 'זו שענית עליה', q],
     [rec.twin.text, rec.twin.answer, 'התאומה שלה', null]].forEach(function (row) {
      var cell = document.createElement('div');
      cell.className = 'twin__cell';
      var tag = document.createElement('span');
      tag.className = 'twin__tag';
      tag.textContent = row[2];
      cell.appendChild(tag);
      var t = document.createElement('p');
      t.className = 'twin__q';
      t.textContent = row[0];
      cell.appendChild(t);
      if (row[3]) {
        var tf = window.TeoriaPool && window.TeoriaPool.imageEl(row[3], ctx);
        if (tf) { tf.className = 'q-figure q-figure--sm'; cell.appendChild(tf); }
      }
      var a = document.createElement('p');
      a.className = 'twin__a';
      a.textContent = row[1];
      cell.appendChild(a);
      grid.appendChild(cell);
    });
    box.appendChild(grid);
    return box;
  }

  /* ---------- localStorage: שאלות שטעית בהן, משותף עם הסימולטור ---------- */
  function readMissed() {
    try { return JSON.parse(localStorage.getItem(MISSED_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeMissed(list) {
    try { localStorage.setItem(MISSED_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function addMissed(id) {
    var l = readMissed();
    if (l.indexOf(id) === -1) { l.push(id); writeMissed(l); }
  }
  function clearMissed(id) {
    var l = readMissed(), i = l.indexOf(id);
    if (i !== -1) { l.splice(i, 1); writeMissed(l); }
  }

  function shuffle(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  /* ---------- הקראה ---------- */
  var speech = { on: false };
  function narrate(q) {
    if (!speech.on || !window.TeoriaSpeech) return;
    window.TeoriaSpeech.speak([q.text].concat(q.answers));
  }

  function setupSpeech() {
    if (!window.TeoriaSpeech || !window.TeoriaSpeech.supported) {
      document.getElementById('speechNone').hidden = false;
      return;
    }
    window.TeoriaSpeech.onReady(function (hasVoice) {
      if (!hasVoice) { document.getElementById('speechNone').hidden = false; return; }
      var bar = document.getElementById('speechBar');
      var btn = document.getElementById('speechToggle');
      bar.hidden = false;
      speech.on = window.TeoriaSpeech.isEnabled();
      btn.setAttribute('aria-pressed', String(speech.on));
      btn.classList.toggle('is-on', speech.on);
      btn.addEventListener('click', function () {
        speech.on = !speech.on;
        window.TeoriaSpeech.setEnabled(speech.on);
        btn.setAttribute('aria-pressed', String(speech.on));
        btn.classList.toggle('is-on', speech.on);
        /* הפעלה מיידית נותנת משוב שהפיצ'ר עובד — ובכרום גם משחררת את
           חסימת ה-autoplay, שדורשת מחווה של המשתמש. */
        if (speech.on && round.length) narrate(round[index]);
        else window.TeoriaSpeech.cancel();
      });
    });
  }

  /* ---- "רק שאלות בלי תמונה" ----
     לא מגבלה אלא בחירה: מי שמשתמש בהקראה או בקורא מסך לא יכול לענות על
     שאלה שכל תוכנה בתמונה. המתג מוצג רק כשהתמונות בכלל פעילות. */
  function setupTextOnly() {
    var note = document.getElementById('studyPool');
    var bar  = document.getElementById('textOnlyBar');
    var btn  = document.getElementById('textOnlyToggle');
    var on   = window.TeoriaPool.isTextOnly();

    function paint() {
      if (note) note.textContent = window.TeoriaPool.poolNotice(ctx, all.length, on);
      if (btn) {
        btn.setAttribute('aria-pressed', String(on));
        btn.classList.toggle('is-on', on);
      }
    }
    if (bar) bar.hidden = !ctx.imagesOn;      /* אין תמונות — אין מה לסנן */
    if (btn) {
      btn.addEventListener('click', function () {
        on = !on;
        window.TeoriaPool.setTextOnly(on);
        all = window.TeoriaPool.pool(ctx, on);
        countTopics();
        paint();
      });
    }
    paint();
  }

  function countTopics() {
    perTopic = {};
    all.forEach(function (q) { perTopic[q.topic] = (perTopic[q.topic] || 0) + 1; });
    var map = {
      'cnt-law':  perTopic['חוקי התנועה'], 'cnt-safe': perTopic['בטיחות'],
      'cnt-car':  perTopic['הכרת הרכב'],   'cnt-sign': perTopic['תמרורים'],
      'cnt-all':  all.length
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = (map[id] || 0) + ' שאלות';
    });
  }

  /* ---------- מסכים ---------- */
  function show(el) {
    [pickEl, runEl, doneEl].forEach(function (s) { s.hidden = (s !== el); });
  }

  function paintDots() {
    dotsEl.innerHTML = '';
    for (var i = 0; i < round.length; i++) {
      var li = document.createElement('li');
      li.className = 'study__dot';
      if (i < got.length) li.setAttribute('data-state', got[i] ? 'ok' : 'no');
      else if (i === index) li.setAttribute('data-state', 'now');
      dotsEl.appendChild(li);
    }
  }

  function renderQuestion() {
    var q = round[index];
    answered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = (index === round.length - 1) ? 'סיימתי' : 'הבא';
    paintDots();
    stage.innerHTML = '';

    var title = document.createElement('p');
    title.className = 'study__q';
    title.textContent = q.text;
    stage.appendChild(title);

    /* התמונה מוצגת רק כשהמתג פתוח. ראה pool.js. */
    var fig = window.TeoriaPool && window.TeoriaPool.imageEl(q, ctx);
    if (fig) stage.appendChild(fig);

    var list = document.createElement('ul');
    list.className = 'study__answers';
    q.answers.forEach(function (answer, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'study__answer';
      b.textContent = answer;
      b.addEventListener('click', function () { choose(b, list, q, i); });
      li.appendChild(b);
      list.appendChild(li);
    });
    stage.appendChild(list);

    narrate(q);
  }

  function choose(btn, list, q, picked) {
    if (answered) return;
    answered = true;
    if (window.TeoriaSpeech) window.TeoriaSpeech.cancel();

    var right = picked === q.correct;
    var buttons = list.querySelectorAll('.study__answer');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === q.correct) buttons[i].setAttribute('data-state', 'correct');
    }
    if (!right) btn.setAttribute('data-state', 'wrong');
    got.push(right);
    paintDots();

    if (right) clearMissed(q.id); else addMissed(q.id);

    var box = document.createElement('div');
    box.className = 'study__feedback';
    box.setAttribute('data-state', right ? 'ok' : 'no');

    var head = document.createElement('p');
    head.className = 'study__verdict';
    head.textContent = right ? 'נכון.' : 'לא — וזו בדיוק שאלה ששווה לעצור עליה.';
    box.appendChild(head);

    /* ⚠️ הפער שאף אתר בשוק לא ממלא: הסבר לטעות שבחרת, ולא רק לתשובה
       הנכונה. שני האתרים שכן מסבירים (avor, testli) מסבירים את הנכונה
       בלבד. השדות האלה מגיעים מאבי ועדיין ריקים. */
    if (!right && q.whyWrong && q.whyWrong[picked]) {
      var w = document.createElement('p');
      w.className = 'study__why';
      var lead = document.createElement('b');
      lead.textContent = 'למה זה מפתה: ';
      w.appendChild(lead);
      w.appendChild(document.createTextNode(q.whyWrong[picked]));
      box.appendChild(w);
    }

    if (q.examinerNote) {
      var n = document.createElement('p');
      n.className = 'study__note';
      var nl = document.createElement('b');
      nl.textContent = 'מהזווית של הבוחן: ';
      n.appendChild(nl);
      n.appendChild(document.createTextNode(q.examinerNote));
      box.appendChild(n);
    } else if (!right) {
      var a = document.createElement('p');
      a.className = 'study__correct';
      var al = document.createElement('b');
      al.textContent = 'התשובה הנכונה: ';
      a.appendChild(al);
      a.appendChild(document.createTextNode(q.answers[q.correct]));
      box.appendChild(a);
    }

    var tw = twinBox(q);
    if (tw) box.appendChild(tw);

    stage.appendChild(box);
    nextBtn.disabled = false;
    nextBtn.focus();
  }

  function renderDone() {
    if (window.TeoriaSpeech) window.TeoriaSpeech.cancel();
    var okCount = got.filter(Boolean).length;
    var missed = [];
    for (var i = 0; i < round.length; i++) if (!got[i]) missed.push(round[i]);

    doneEl.innerHTML = '';
    var h = document.createElement('h2');
    h.className = 'study__h';
    /* בכוונה בלי "עברת/נכשלת" ובלי אחוזים — זה לא מבחן. */
    h.textContent = 'סיימתם ' + round.length + ' שאלות';
    doneEl.appendChild(h);

    var sum = document.createElement('p');
    sum.className = 'study__sum';
    sum.textContent = missed.length
      ? okCount + ' נכונות · ' + missed.length + ' שווה לחזור עליהן'
      : 'כל התשובות נכונות. הנושא הזה יושב.';
    doneEl.appendChild(sum);

    if (missed.length) {
      var ol = document.createElement('ol');
      ol.className = 'study__review';
      missed.forEach(function (q) {
        var li = document.createElement('li');
        var qt = document.createElement('p');
        qt.className = 'study__review-q';
        qt.textContent = q.text;
        li.appendChild(qt);
        /* בלי התמונה, "מה פירוש התמרור?" ברשימת הטעויות חסר משמעות —
           התלמיד לא יודע על איזה תמרור בדיוק טעה. */
        var rfig = window.TeoriaPool && window.TeoriaPool.imageEl(q, ctx);
        if (rfig) { rfig.className = 'q-figure q-figure--sm'; li.appendChild(rfig); }
        var at = document.createElement('p');
        at.className = 'study__review-a';
        var b = document.createElement('b');
        b.textContent = 'התשובה הנכונה: ';
        at.appendChild(b);
        at.appendChild(document.createTextNode(q.answers[q.correct]));
        li.appendChild(at);
        ol.appendChild(li);
      });
      doneEl.appendChild(ol);
    }

    var acts = document.createElement('div');
    acts.className = 'study__acts';

    if (missed.length) {
      var again = document.createElement('button');
      again.type = 'button';
      again.className = 'btn btn-primary';
      again.textContent = 'חזרה על ' + missed.length + ' השאלות האלה';
      again.addEventListener('click', function () { start(missed.slice(), topicEl.textContent); });
      acts.appendChild(again);
    }

    var more = document.createElement('button');
    more.type = 'button';
    more.className = 'btn ' + (missed.length ? 'btn-secondary' : 'btn-primary');
    more.textContent = 'עוד ' + root.dataset.count + ' שאלות';
    more.addEventListener('click', function () { startTopic(currentTopic); });
    acts.appendChild(more);

    var other = document.createElement('button');
    other.type = 'button';
    other.className = 'btn btn-secondary';
    other.textContent = 'נושא אחר';
    other.addEventListener('click', toPicker);
    acts.appendChild(other);

    doneEl.appendChild(acts);
    show(doneEl);
  }

  /* ---------- זרימה ---------- */
  var currentTopic = '';

  function start(list, label) {
    round = list; index = 0; got = []; answered = false;
    topicEl.textContent = label;
    show(runEl);
    renderQuestion();
    runEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function startTopic(topic) {
    currentTopic = topic;
    var n = parseInt(root.dataset.count, 10) || 10;
    var pool = topic ? all.filter(function (q) { return q.topic === topic; }) : all;
    start(shuffle(pool).slice(0, n), topic || 'מעורב');
  }

  function toPicker() {
    if (window.TeoriaSpeech) window.TeoriaSpeech.cancel();
    paintMissedButton();
    show(pickEl);
    pickEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function paintMissedButton() {
    var ids = readMissed();
    var wrap = document.getElementById('studyMistakes');
    var have = all.filter(function (q) { return ids.indexOf(q.id) !== -1; });
    wrap.hidden = have.length === 0;
    document.getElementById('studyMissedCount').textContent =
      have.length ? '(' + have.length + ')' : '';
    wrap.dataset.count = have.length;
  }

  nextBtn.addEventListener('click', function () {
    if (!answered) return;
    index++;
    if (index >= round.length) renderDone();
    else renderQuestion();
  });
  quitBtn.addEventListener('click', toPicker);

  /* ---------- טעינה ---------- */
  window.TeoriaPool.load(root.dataset.src)
    .then(function (c) {
      ctx = c;
      all = window.TeoriaPool.pool(ctx, window.TeoriaPool.isTextOnly());
      setupTextOnly();

      countTopics();

      var cards = document.querySelectorAll('.topic-card');
      for (var i = 0; i < cards.length; i++) {
        (function (card) {
          card.addEventListener('click', function () { startTopic(card.dataset.topic); });
        }(cards[i]));
      }

      document.getElementById('studyMissedBtn').addEventListener('click', function () {
        var ids = readMissed();
        var have = shuffle(all.filter(function (q) { return ids.indexOf(q.id) !== -1; }));
        if (have.length) { currentTopic = ''; start(have.slice(0, 20), 'הטעויות שלכם'); }
      });

      paintMissedButton();
      setupSpeech();
      loadPairs();
    })
    .catch(function (err) {
      pickEl.innerHTML = '<p class="study__err">לא הצלחנו לטעון את השאלות. ' +
        'רעננו את העמוד ונסו שוב.</p>';
      if (window.console) console.error(err);
    });
}());
