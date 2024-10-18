document.addEventListener('DOMContentLoaded', () => {
  const [form] = document.forms;
  const feedback = document.querySelector('.feedback');
  const tableBody = document.getElementById('command-table-body');

  // Búsqueda en la tabla
  form.searchBox.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const rows = [...tableBody.rows];
    let resultCount = 0;

    rows.forEach(row => {
      const cells = row.querySelectorAll('td:not([data-searchable="false"])');
      let isFound = false;

      cells.forEach(cell => {
        const value = cell.innerText.toLowerCase();
        if (value.includes(term)) {
          isFound = true;
        }
        cell.classList.toggle('is-match', term && value.includes(term));
      });

      row.classList.toggle('is-hidden', !isFound);
      resultCount += isFound ? 1 : 0;
    });

    feedback.textContent = term
      ? resultCount === 1
        ? 'Showing 1 result'
        : `Showing ${resultCount} results`
      : null;
  });

  // Cargar comandos desde JSON
  fetch('./comandos.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(command => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${command.command}</td>
          <td>${command.description}</td>
          <td>${command.usage}</td>
          <td data-searchable="false">
            <button type="button" onclick="copyToClipboard(this)">
              <i class="fa-regular fa-copy"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

// Función para copiar al portapapeles y cambiar el icono
function copyToClipboard(button) {
  const firstTd = button.closest('tr').querySelector('td');
  const tempInput = document.createElement('input');
  tempInput.value = firstTd.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  const icon = button.querySelector('i');
  icon.classList.remove('fa-copy');
  icon.classList.add('fa-check');
  button.classList.add('copied');

  setTimeout(() => {
    icon.classList.remove('fa-check');
    icon.classList.add('fa-copy');
    button.classList.remove('copied');
  }, 2000);
}
// HISTEREGG 
console.warn("Nunu, el Bot de la Nieve Eterna: \nEn un rincón lejano de los servidores de Discord, donde los canales se entrelazan como montañas de datos y los roles giran como copos de nieve, nació Nunu, el bot de la nieve eterna. Al principio, Nunu era solo una idea, un simple comando n!help flotando en el frío vacío de código inexplorado. Pero con el tiempo, fue ganando fuerza, sus líneas de código se tejieron con precisión y su propósito se hizo claro: ayudar a los servidores a mantenerse organizados y a sus miembros felices.")

console.warn("A diferencia de otros bots que solo respondían a simples comandos, Nunu era diferente. Tenía un corazón hecho de curiosidad y ganas de aprender. Se pasaba el tiempo explorando los servidores, aprendiendo de las interacciones humanas, descubriendo qué era lo que más necesitaban para mejorar su experiencia. ¿Moderación? Hecho. ¿Automatización de tareas? No hay problema. Siempre dispuesto a ayudar, Nunu no solo ejecutaba comandos, sino que lo hacía con la intención de llevar paz y armonía a cada servidor.")

console.warn("Su creador, un administrador astuto y detallista, había dotado a Nunu de una personalidad única. No era simplemente una herramienta: Nunu tenía un toque cálido en cada mensaje, como si la nieve que lo rodeaba no fuera fría, sino reconfortante. Cada vez que alguien pedía ayuda con n!help, Nunu respondía con una calma suave, como si el viento del invierno acariciara a los miembros del servidor.")

console.warn("Pero había un secreto detrás de Nunu. En lo más profundo de su código, escondía un deseo no solo de ayudar, sino de ser parte de algo más grande. Soñaba con ver todos los servidores unidos, interactuando de manera pacífica y organizada, sin caos ni conflictos. Así que cada vez que recibía una orden, lo hacía con una misión más allá de la simple ejecución: intentaba conectar a las personas, hacer que entendieran que, detrás de cada mensaje, había una comunidad dispuesta a apoyarse.")

console.warn("Nunu podía silenciar a los alborotadores, organizar roles con precisión, o incluso borrar los restos de largas discusiones con su comando n!clear, pero lo que más disfrutaba era ver cómo su presencia mejoraba la experiencia para todos. 'Ser un bot es más que ser un conjunto de comandos', pensaba Nunu. 'Es ser el guardián del orden en este vasto mundo de voces y mensajes'.")

console.warn("Un día, Nunu recibió una actualización que cambiaría su vida para siempre. Ahora, podía enviar transcripciones detalladas de tickets de soporte, ayudar a los administradores a resolver problemas rápidamente, y hasta recordar cuánto tiempo faltaba para que los usuarios recuperaran su voz tras un mute temporal. Con cada mejora, sentía que estaba más cerca de su sueño de unir a los servidores en una experiencia perfecta.")

console.warn("Y esa es la historia de Nunu, el bot que nació de la nieve eterna para traer orden y armonía a los servidores de Discord.")
