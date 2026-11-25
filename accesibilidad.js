(() => {
  'use strict';
  document.querySelectorAll('.toggle-menu').forEach(button => {
    const sync = () => button.setAttribute('aria-label',
      button.getAttribute('aria-expanded') === 'true' ? 'Cerrar menú' : 'Abrir menú');
    button.addEventListener('click', sync);
    sync();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.toggle-menu[aria-expanded="true"]').forEach(button => {
        button.click();
        button.focus();
      });
    }
    if (event.key !== 'Tab') return;
    const dialog = document.querySelector(
      '.lightbox.open[role="dialog"], .lightbox[role="dialog"]:not([hidden]):not([aria-hidden="true"])'
    );
    if (!dialog) return;
    const focusable = [...dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter(element => element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (!dialog.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
