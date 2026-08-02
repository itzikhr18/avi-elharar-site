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
  var index = 0;
  var correctCount = 0;
  var answered = false;
  var seconds = 0;
  var paused = false;
  var ticker = null;

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
  function paintTimer() {
    var m = Math.floor(seconds / 60), s = seconds % 60;
    timerEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
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
  }

  function choose(btn, list, q, picked) {
    if (answered) return;
    answered = true;

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
    progressEl.textContent = '';
    nextBtn.hidden = true;

    stage.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'quiz__result';

    var score = document.createElement('p');
    score.className = 'quiz__score';
    score.textContent = correctCount + '/' + questions.length;
    wrap.appendChild(score);

    var verdict = document.createElement('p');
    verdict.className = 'quiz__verdict';
    verdict.textContent = 'שלד — מסך התוצאה יקבל את הניסוח והמשך התהליך בשלב הבא.';
    wrap.appendChild(verdict);

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
