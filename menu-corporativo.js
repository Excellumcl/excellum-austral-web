(() => {
  'use strict';
  const compact = matchMedia('(max-width:1200px)');
  const menus = Array.from(document.querySelectorAll('[data-menu-corporativo]'), header => {
    const button = header.querySelector('button[aria-controls]');
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    function setOpen(open) {
      nav.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      button.textContent = open ? '×' : '☰';
    }
    return { header, button, nav, setOpen };
  });

  for (const menu of menus) {
    menu.setOpen(false);
    menu.button.addEventListener('click', () => {
      const open = compact.matches && !menu.nav.classList.contains('open');
      for (const other of menus) other.setOpen(other === menu && open);
    });
    menu.nav.addEventListener('click', event => {
      if (event.target.closest('a')) menu.setOpen(false);
    });
  }

  document.addEventListener('click', event => {
    for (const menu of menus) {
      if (!menu.header.contains(event.target)) menu.setOpen(false);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = menus.find(menu => menu.nav.classList.contains('open'));
    if (open) {
      open.setOpen(false);
      open.button.focus();
    }
  });
  compact.addEventListener('change', () => {
    for (const menu of menus) menu.setOpen(false);
  });
  window.addEventListener('pageshow', () => {
    for (const menu of menus) menu.setOpen(false);
  });
})();
