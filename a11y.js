/* Accessibility widget — shared by every page on the site.
 *
 * IS 5568 requires the accessibility controls and a reachable accessibility
 * statement on EVERY page, not just the home page. The widget used to live as
 * hand-written markup inside index.html only, which left the articles hub, the
 * article page and the 404 page with no controls at all. Injecting it from one
 * script keeps a single source of truth instead of four copies drifting apart.
 *
 * Loaded standalone (not part of main.js) so that secondary pages get the
 * controls without also pulling in the home page's animation code.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'a11y-settings';
  var MAX_FONT = 3, MIN_FONT = -1;

  /* Root-absolute so the link resolves identically from /maamarim/<slug>/ and
     from /. The statement itself lives in a section of the home page. */
  var STATEMENT_HREF = '/#accessibility-statement';

  var ICON = {
    toggle: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v5"/><path d="M8 10l4 2 4-2"/><path d="M9 21l3-6 3 6"/>',
    contrast: '<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 010 20V2z" fill="currentColor"/>',
    grayscale: '<rect x="3" y="3" width="18" height="18" rx="3"/><line x1="3" y1="3" x2="21" y2="21"/>',
    links: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
    font: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
    cursor: '<path d="M4 4l7.07 17 2.51-7.39L21 11.07z"/>',
    stop: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    reset: '<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 105.64-9.36L3 10"/>'
  };

  function svg(paths, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + paths + '</svg>';
  }

  function option(key, icon, label) {
    return '<button class="a11y-option__toggle" data-a11y="' + key + '">' +
      svg(icon, 20) + ' ' + label + '</button>';
  }

  function build() {
    var w = document.createElement('div');
    w.className = 'a11y-widget';
    w.id = 'a11yWidget';
    w.innerHTML =
      '<button class="a11y-toggle" id="a11yToggle" aria-label="תפריט נגישות" aria-expanded="false" aria-controls="a11yPanel">' +
        svg(ICON.toggle, 28) +
      '</button>' +
      '<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="הגדרות נגישות" aria-hidden="true">' +
        '<div class="a11y-panel__header">' +
          '<h3>הגדרות נגישות</h3>' +
          '<button class="a11y-panel__close" id="a11yClose" aria-label="סגור תפריט נגישות">&times;</button>' +
        '</div>' +
        '<div class="a11y-panel__body">' +
          '<div class="a11y-option">' +
            '<span>הגדלת טקסט</span>' +
            '<div class="a11y-option__btns">' +
              '<button data-a11y="font-decrease" aria-label="הקטנת גופן">א-</button>' +
              '<button data-a11y="font-reset" aria-label="איפוס גופן">א</button>' +
              '<button data-a11y="font-increase" aria-label="הגדלת גופן">א+</button>' +
            '</div>' +
          '</div>' +
          option('high-contrast', ICON.contrast, 'ניגודיות גבוהה') +
          option('grayscale', ICON.grayscale, 'גווני אפור') +
          option('highlight-links', ICON.links, 'הדגשת קישורים') +
          option('readable-font', ICON.font, 'גופן קריא') +
          option('big-cursor', ICON.cursor, 'סמן גדול') +
          option('stop-animations', ICON.stop, 'עצירת אנימציות') +
          '<hr class="a11y-divider" />' +
          '<button class="a11y-option__toggle a11y-reset" data-a11y="reset">' +
            svg(ICON.reset, 20) + ' איפוס הגדרות' +
          '</button>' +
          '<a href="' + STATEMENT_HREF + '" class="a11y-statement-link" id="a11yStatementLink">הצהרת נגישות</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(w);
    return w;
  }

  function init() {
    if (document.getElementById('a11yWidget')) return;
    build();

    var toggle = document.getElementById('a11yToggle');
    var panel = document.getElementById('a11yPanel');
    var closeBtn = document.getElementById('a11yClose');
    var stmtLink = document.getElementById('a11yStatementLink');
    /* Only present on the home page, where the statement is a collapsed section. */
    var stmtSection = document.getElementById('accessibility-statement');

    var fontStep = 0;

    function load() {
      try { var s = localStorage.getItem(STORAGE_KEY); if (s) return JSON.parse(s); } catch (e) {}
      return {};
    }
    function save(obj) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
    }
    function applyClass(cls, on) {
      document.body.classList[on ? 'add' : 'remove'](cls);
    }
    function applyFontSize(step) {
      fontStep = step;
      var size = 100 + step * 12.5;
      document.documentElement.style.fontSize = size === 100 ? '' : size + '%';
    }
    function updateToggles() {
      var s = load();
      panel.querySelectorAll('[data-a11y]').forEach(function (btn) {
        var key = btn.getAttribute('data-a11y');
        if (key.indexOf('font-') === 0 || key === 'reset') return;
        btn.classList.toggle('active', !!s[key]);
        btn.setAttribute('aria-pressed', String(!!s[key]));
      });
    }
    function applyAll() {
      var s = load();
      applyFontSize(s.fontStep || 0);
      applyClass('a11y-high-contrast', !!s['high-contrast']);
      applyClass('a11y-grayscale', !!s['grayscale']);
      applyClass('a11y-highlight-links', !!s['highlight-links']);
      applyClass('a11y-readable-font', !!s['readable-font']);
      applyClass('a11y-big-cursor', !!s['big-cursor']);
      applyClass('a11y-stop-animations', !!s['stop-animations']);
      updateToggles();
    }
    function toggleSetting(key) {
      var s = load();
      s[key] = !s[key];
      save(s);
      applyAll();
    }
    function changeFontSize(dir) {
      var s = load();
      var step = s.fontStep || 0;
      if (dir === 'increase' && step < MAX_FONT) step++;
      else if (dir === 'decrease' && step > MIN_FONT) step--;
      else if (dir === 'reset') step = 0;
      s.fontStep = step;
      save(s);
      applyFontSize(step);
    }
    function resetAll() {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      document.body.className = document.body.className.replace(/\ba11y-\S+/g, '').trim();
      document.documentElement.style.fontSize = '';
      fontStep = 0;
      updateToggles();
    }

    function setOpen(open) {
      panel.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
    }

    toggle.addEventListener('click', function () {
      var open = !panel.classList.contains('open');
      setOpen(open);
      if (open) panel.querySelector('button').focus();
    });
    closeBtn.addEventListener('click', function () {
      setOpen(false);
      toggle.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target) &&
          e.target !== toggle && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y]');
      if (!btn) return;
      var action = btn.getAttribute('data-a11y');
      if (action === 'font-increase') changeFontSize('increase');
      else if (action === 'font-decrease') changeFontSize('decrease');
      else if (action === 'font-reset') changeFontSize('reset');
      else if (action === 'reset') resetAll();
      else toggleSetting(action);
    });

    /* On the home page the statement is a collapsed section: reveal and scroll to
       it in place. Everywhere else the link is left alone and navigates to the
       home page, where the :target CSS rule opens it even without JavaScript. */
    if (stmtLink && stmtSection) {
      stmtLink.addEventListener('click', function (e) {
        e.preventDefault();
        stmtSection.style.display = '';
        setOpen(false);
        stmtSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    applyAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
