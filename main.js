const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

if (menuToggle && mainMenu) {
  const closeMenu = () => {
    mainMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

if (leadForm && formMessage) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = (document.getElementById('fullName')?.value || '').trim();
    const phone = (document.getElementById('phone')?.value || '').trim();
    const city = (document.getElementById('city')?.value || '').trim();

    if (!fullName || !city) {
      formMessage.textContent = 'אנא מלאו שם מלא ואזור מגורים.';
      return;
    }

    const isPhoneValid = /^0(?:5\d|[2-4]|8|9)-?\d{7}$/.test(phone);
    if (!isPhoneValid) {
      formMessage.textContent = 'מספר הטלפון לא תקין. אנא בדקו ונסו שוב.';
      return;
    }

    formMessage.textContent = 'תודה! הפרטים נקלטו בהצלחה וניצור קשר בהקדם.';
    leadForm.reset();
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}
