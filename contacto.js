(() => {
  const whatsapp = 'https://wa.me/56992136714';
  const email = 'mailto:contacto@excellum.cl';

  window.excellumContact = (links, subject, message) => {
    links.querySelector('[data-whatsapp]').href = whatsapp + '?text=' + encodeURIComponent(message);
    links.querySelector('[data-email]').href = email + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(message.replace(/\r?\n/g, '\r\n'));
  };
})();
