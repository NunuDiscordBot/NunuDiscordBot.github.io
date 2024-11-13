document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm"); // Usamos el ID del formulario directamente
  const searchBox = document.getElementById("searchBox");
  const feedback = document.querySelector(".feedback");
  const tableBody = document.getElementById("word-table-body");

  // Búsqueda en la tabla
  searchBox.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const rows = Array.from(tableBody.rows); // Convertir NodeList a Array
    let resultCount = 0;

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td:not([data-searchable="false"])');
      let isFound = false;

      cells.forEach((cell) => {
        const value = cell.innerText.toLowerCase();
        if (value.includes(term)) {
          isFound = true;
        }
        cell.classList.toggle("is-match", term && value.includes(term));
      });

      row.classList.toggle("is-hidden", !isFound); // Oculta las filas que no coinciden
      resultCount += isFound ? 1 : 0;
    });

    // Actualiza el mensaje de retroalimentación
    feedback.textContent = term
      ? resultCount === 1
        ? "Showing 1 result"
        : `Showing ${resultCount} results`
      : null;
  });

  // Cargar diccionario desde JSON
  fetch("./assets/data/diccionario.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((word) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${word.word}</td>
            <td>${word.description}</td>
          `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
      feedback.textContent = "Error loading commands";
    });
});
