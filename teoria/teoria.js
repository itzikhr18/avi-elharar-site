/* ===================================================================
   Teoria quiz engine — skeleton.

   Deliberately standalone: it is NOT part of main.js / main.min.js, so
   nothing here can affect a page on the live site. Vanilla JS, no build
   step, matching the rest of the repo.

   Storage is localStorage only — no accounts, no network, nothing that
   would require a privacy-policy change.
   =================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('quiz');
  if (!root) return;

  var STORE_KEY = 'teoria.missed.v1';
  var stage = document.getElementById('quizStage');
  var progressEl = document.getElementById('quizProgress');
  var timerEl = document.getElementById('quizTimer');
  var nextBtn = document.getElementById('quizNext');

  var questions = [];

  /* ---- data hazards, all verified against the published bank ----------
     1. The licence-grade marker for private car is «В» — CYRILLIC CAPITAL VE
        (U+0412), NOT Latin B (U+0042). The bank contains zero Latin "B".
        Filtering with a keyboard-typed "B" returns an empty set, silently.
        questions-b.json is already filtered, so nothing here depends on it —
        but anything that ever re-filters the full 1,802-row bank must use
        '\u0412'.
     2. Questions are NOT unique by text. 112 of them read "מה פירוש התמרור?"
        and differ only by image. 22 pairs are identical in BOTH text and
        image and differ only in their answers. The only unique key is `id`.
        Never de-duplicate on text.
     3. 553 of the 1,273 questions (43.4%) carry an image hosted on gov.il,
        whose terms forbid reproduction without written consent. Until the
        signs are redrawn as SVG those questions cannot be shown, so the
        pool is restricted below and the restriction is stated on screen
        rather than hidden. */
  var GRADE_B = '\u0412';

  /* 26 \u05de\u05ea\u05d5\u05da 30 \u2014 \u05e1\u05e3 \u05d4\u05de\u05e2\u05d1\u05e8 \u05d4\u05e8\u05e9\u05de\u05d9, \u05db\u05dc\u05d5\u05de\u05e8 \u05e2\u05d3 4 \u05d8\u05e2\u05d5\u05d9\u05d5\u05ea.
     \u05de\u05e7\u05d5\u05e8: \u05de\u05e9\u05e8\u05d3 \u05d4\u05ea\u05d7\u05d1\u05d5\u05e8\u05d4. \u05e8\u05d0\u05d4 teoria/docs/exam-structure.md \u05e1\u05e2\u05d9\u05e3 2.
     \u05e0\u05e9\u05de\u05e8 \u05db\u05d9\u05d7\u05e1 \u05d5\u05dc\u05d0 \u05db\u05de\u05e1\u05e4\u05e8, \u05db\u05d3\u05d9 \u05e9\u05de\u05d1\u05d7\u05df \u05de\u05e7\u05d5\u05e6\u05e8 \u05d9\u05e7\u05d1\u05dc \u05e1\u05e3 \u05e2\u05e7\u05d1\u05d9. */
  var PASS_RATIO = 26 / 30;

  var index = 0;
  var correctCount = 0;
  var answered = false;
  var seconds = 0;
  var paused = false;
  var ticker = null;
  var missedThisRun = [];

  /* ---- storage: which questions this visitor got wrong ---- */
  function readMissed() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function rememberMissed(id) {
    try {
      var list = readMissed();
      if (list.indexOf(id) === -1) list.push(id);
      localStorage.setItem(STORE_KEY, JSON.stringify(list));
    } catch (e) { /* private mode — practice still works, just not remembered */ }
  }

  /* ---- timer: pausable on purpose. A timer a user cannot stop is an
     accessibility failure (WCAG 2.2.1), and this one is not scored. ---- */
  function formatTime(total) {
    var m = Math.floor(total / 60), s = total % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function paintTimer() { timerEl.textContent = formatTime(seconds); }
  function startTimer() {
    stopTimer();
    ticker = setInterval(function () { if (!paused) { seconds++; paintTimer(); } }, 1000);
  }
  function stopTimer() { if (ticker) { clearInterval(ticker); ticker = null; } }
  timerEl.addEventListener('click', function () {
    paused = !paused;
    timerEl.setAttribute('data-paused', String(paused));
    timerEl.setAttribute('aria-label', paused ? 'המשך את הטיימר' : 'עצור את הטיימר');
  });

  /* ---- הקראה קולית. ראה speech.js — אף אתר תרגול ישראלי לא מציע זאת,
     והמבחן הרשמי כן מתקיים בשמע. ---- */
  var speakOn = false;
  function narrate(q) {
    if (speakOn && window.TeoriaSpeech) window.TeoriaSpeech.speak([q.text].concat(q.answers));
  }
  function setupSpeech() {
    if (!window.TeoriaSpeech || !window.TeoriaSpeech.supported) return;
    window.TeoriaSpeech.onReady(function (hasVoice) {
      if (!hasVoice) return;
      var bar = document.getElementById('speechBar');
      var btn = document.getElementById('speechToggle');
      if (!bar || !btn) return;
      bar.hidden = false;
      speakOn = window.TeoriaSpeech.isEnabled();
      btn.setAttribute('aria-pressed', String(speakOn));
      btn.classList.toggle('is-on', speakOn);
      btn.addEventListener('click', function () {
        speakOn = !speakOn;
        window.TeoriaSpeech.setEnabled(speakOn);
        btn.setAttribute('aria-pressed', String(speakOn));
        btn.classList.toggle('is-on', speakOn);
        if (speakOn && questions.length) narrate(questions[index]);
        else window.TeoriaSpeech.cancel();
      });
    });
  }

  function shuffle(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  function renderQuestion() {
    var q = questions[index];
    answered = false;
    nextBtn.disabled = true;
    progressEl.textContent = (index + 1) + ' / ' + questions.length;

    stage.innerHTML = '';

    var title = document.createElement('p');
    title.className = 'quiz__question';
    title.textContent = q.text;
    stage.appendChild(title);

    var list = document.createElement('ul');
    list.className = 'quiz__answers';

    q.answers.forEach(function (answer, i) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__answer';
      btn.textContent = answer;
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () { choose(btn, list, q, i); });
      li.appendChild(btn);
      list.appendChild(li);
    });

    stage.appendChild(list);
    narrate(q);
  }

  function choose(btn, list, q, picked) {
    if (answered) return;
    answered = true;
    if (window.TeoriaSpeech) window.TeoriaSpeech.cancel();

    var buttons = list.querySelectorAll('.quiz__answer');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === q.correct) buttons[i].setAttribute('data-state', 'correct');
    }
    btn.setAttribute('aria-pressed', 'true');

    if (picked === q.correct) {
      correctCount++;
    } else {
      btn.setAttribute('data-state', 'wrong');
      if (missedThisRun.indexOf(q.id) === -1) missedThisRun.push(q.id);
      rememberMissed(q.id);
    }

    if (q.examinerNote) {
      var note = document.createElement('p');
      note.className = 'quiz__note';
      var lead = document.createElement('b');
      lead.textContent = 'מהזווית של הבוחן: ';
      note.appendChild(lead);
      note.appendChild(document.createTextNode(q.examinerNote));
      stage.appendChild(note);
    }

    nextBtn.disabled = false;
    nextBtn.textContent = (index === questions.length - 1) ? 'סיום' : 'הבא';
  }

  function renderResult() {
    stopTimer();
    if (window.TeoriaSpeech) window.TeoriaSpeech.cancel();
    progressEl.textContent = '';
    nextBtn.hidden = true;

    stage.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'quiz__result';

    var score = document.createElement('p');
    score.className = 'quiz__score';
    score.textContent = correctCount + '/' + questions.length;
    wrap.appendChild(score);

    /* סף המעבר הרשמי: 26 מתוך 30, כלומר עד 4 טעויות.
       מקור: משרד התחבורה, "המבחן העיוני" — ראה docs/exam-structure.md.
       המבחן כאן עשוי להיות קצר מ-30, ולכן הסף מחושב באותו יחס ולא מקובע. */
    var required = Math.ceil(questions.length * PASS_RATIO);
    var passed = correctCount >= required;

    var verdict = document.createElement('p');
    verdict.className = 'quiz__verdict';
    verdict.setAttribute('data-state', passed ? 'pass' : 'fail');
    verdict.textContent = passed
      ? 'עברתם. במבחן האמיתי נדרשות ' + required + ' תשובות נכונות מתוך ' + questions.length + '.'
      : 'לא עברתם. נדרשות ' + required + ' תשובות נכונות מתוך ' + questions.length +
        ' — חסרו לכם ' + (required - correctCount) + '.';
    wrap.appendChild(verdict);

    var meta = document.createElement('p');
    meta.className = 'quiz__meta';
    meta.textContent = 'זמן: ' + formatTime(seconds) +
      ' · במבחן הרשמי עומדות לרשותכם 40 דקות ל-30 שאלות.';
    wrap.appendChild(meta);

    /* חזרה על הטעויות — זה מה שבאמת מקדם, ולא הציון עצמו. */
    var missed = [];
    for (var m = 0; m < questions.length; m++) {
      if (missedThisRun.indexOf(questions[m].id) !== -1) missed.push(questions[m]);
    }
    if (missed.length) {
      var h = document.createElement('h3');
      h.className = 'quiz__review-title';
      h.textContent = 'הטעויות שלכם (' + missed.length + ')';
      wrap.appendChild(h);

      var list = document.createElement('ol');
      list.className = 'quiz__review';
      for (var r = 0; r < missed.length; r++) {
        var li = document.createElement('li');
        var qt = document.createElement('p');
        qt.className = 'quiz__review-q';
        qt.textContent = missed[r].text;
        li.appendChild(qt);
        var at = document.createElement('p');
        at.className = 'quiz__review-a';
        var lead = document.createElement('b');
        lead.textContent = 'התשובה הנכונה: ';
        at.appendChild(lead);
        at.appendChild(document.createTextNode(missed[r].answers[missed[r].correct]));
        li.appendChild(at);
        list.appendChild(li);
      }
      wrap.appendChild(list);
    }

    var again = document.createElement('button');
    again.type = 'button';
    again.className = 'btn btn-secondary';
    again.textContent = 'נסו שוב';
    again.addEventListener('click', function () { window.location.reload(); });
    wrap.appendChild(again);

    stage.appendChild(wrap);
  }

  nextBtn.addEventListener('click', function () {
    if (!answered) return;
    index++;
    if (index >= questions.length) renderResult();
    else renderQuestion();
  });

  fetch(root.dataset.src)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var count = parseInt(root.dataset.count, 10) || 30;
      var all = data.questions || [];

      /* Only questions that are answerable without an image we may not serve. */
      var pool = all.filter(function (q) { return !q.imageRef; });
      var poolEl = document.getElementById('quizPool');
      if (poolEl) {
        poolEl.textContent = 'נשאלות ' + count + ' שאלות מתוך ' + pool.length +
          ' זמינות כרגע (מתוך ' + all.length + ' במאגר). שאלות שדורשות תמונה ' +
          'ייכנסו כשספריית התמרורים תהיה מוכנה.';
      }

      questions = shuffle(pool).slice(0, count);
      if (!questions.length) throw new Error('empty pool');
      paintTimer();
      startTimer();
      setupSpeech();
      renderQuestion();
    })
    .catch(function (err) {
      stage.innerHTML = '';
      var p = document.createElement('p');
      p.className = 'quiz__loading';
      p.textContent = 'לא הצלחנו לטעון את השאלות. נסו לרענן את העמוד.';
      stage.appendChild(p);
      if (window.console) console.error('teoria:', err);
    });
})();
