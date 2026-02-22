const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const phoneInput = document.getElementById('phone');
    const phone = phoneInput?.value.trim() || '';
    const israeliPhonePattern = /^0(?:5\d|[2-4]|8|9)-?\d{7}$/;

    if (!israeliPhonePattern.test(phone)) {
      note.textContent = 'אנא הזינו מספר טלפון ישראלי תקין.';
      return;
    }

    note.textContent = 'מעולה, הפרטים נקלטו בהצלחה. נעשה איתך קשר בקרוב.';
    form.reset();
  });
}
