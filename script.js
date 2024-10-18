const [form] = document.forms;
const feedback = document.querySelector('.feedback');
const table = document.querySelector('table');
const tbodyRows = [...table.tBodies[0].rows];

const getCellValue = cell => {
  return cell.innerText || cell.textContent;
}

form.searchBox.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const hasValue = !!e.target.value.length;
  let resultCount = 0;
  
  tbodyRows.forEach(row => {
    const cells = row.querySelectorAll('td:not([data-searchable="false"])');
    let isFound = false;
    
    cells.forEach(cell => {
      const value = getCellValue(cell).toLowerCase();
      const isMatch = value.includes(term);
      
      if (isMatch) {
        isFound = true;
      }
      
      cell.classList.toggle('is-match', hasValue && isMatch);
    });
    
    row.classList.toggle('is-hidden', !isFound);
    resultCount += isFound ? 1 : 0;
  });
  
  feedback.textContent = hasValue
    ? resultCount === 1
      ? 'Showing 1 result'
      : `Showing ${resultCount} results`
    : null;
});



function copyToClipboard(button) {
    // Encuentra el primer <td> en el mismo <tr> que el botón
    const firstTd = button.closest('tr').querySelector('td');

    // Crea un elemento temporal para copiar el texto
    const tempInput = document.createElement('input');
    tempInput.value = firstTd.textContent;
    document.body.appendChild(tempInput);

    // Selecciona y copia el contenido
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Cambiar el icono por un check
    const icon = button.querySelector('i');
    icon.classList.remove('fa-copy');
    icon.classList.add('fa-check');

    // Agregar clase para animación de éxito
    button.classList.add('copied');

    // Restaurar el icono original después de 2 segundos
    setTimeout(() => {
      icon.classList.remove('fa-check');
      icon.classList.add('fa-copy');
      button.classList.remove('copied');
    }, 2000);
  }