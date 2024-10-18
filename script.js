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
