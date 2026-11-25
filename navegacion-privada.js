(() => {
  'use strict';
  const form = document.getElementById('planner-form');
  const result = document.getElementById('planner-result');
  const error = document.getElementById('form-error');
  form.addEventListener('input', () => {result.hidden = true; error.hidden = true;});
  form.addEventListener('change', () => {result.hidden = true; error.hidden = true;});
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('nombre') || '').trim();
    const email = String(data.get('correo') || '').trim();
    const phone = String(data.get('telefono') || '').trim();
    if (!name || !email || !phone) {
      error.textContent = 'Completa tu nombre, correo electrónico y teléfono.';
      error.hidden = false;
      form.elements[!name ? 'nombre' : (!email ? 'correo' : 'telefono')].focus();
      return;
    }
    const experience = String(data.get('experiencia') || 'Navegación privada');
    const shared = experience === 'Navegación compartida';
    const subject = 'Consulta de ' + experience.toLowerCase() + ' - Excellum Austral';
    const message = [
      'EXCELLUM AUSTRAL · ' + experience.toUpperCase(), '',
      'Me interesa: ' + data.get('experiencia'),
      'Fecha estimada: ' + data.get('fecha'),
      'Personas: ' + data.get('personas'),
      'Nombre: ' + name,
      'Correo electrónico: ' + email,
      'Teléfono / WhatsApp: ' + phone,
      'Lo que me gustaría conocer o hacer: ' + (String(data.get('detalle') || '').trim() || 'Por conversar.'), '',
      shared ? 'Quisiera conocer disponibilidad y valor por pasajero. Entiendo que la salida compartida requiere al menos 4 pasajeros confirmados.' : 'Quisiera conocer disponibilidad y una propuesta exclusiva para mi grupo.',
      'Consulta de interés. No es una reserva confirmada.'
    ].join('\n');
    window.excellumContact(result, subject, message);
    result.hidden = false;
    error.hidden = true;
    result.querySelector('[data-whatsapp]').focus();
  });
})();
