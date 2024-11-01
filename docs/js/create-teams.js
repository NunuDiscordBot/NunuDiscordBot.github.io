function createTeams() {
    const namesInput = document.getElementById("namesInput").value;
    const teamSize = parseInt(document.getElementById("teamSize").value);
    const teamsOutput = document.getElementById("teamsOutput");

    // Convertir la lista de nombres en un array y remover espacios
    let names = namesInput.split(",").map(name => name.trim()).filter(name => name !== "");
    
    // Validar la cantidad de nombres
    if (names.length < teamSize) {
        teamsOutput.innerHTML = "<p>Por favor, ingresa suficientes nombres para formar equipos.</p>";
        return;
    }

    // Barajar los nombres
    names = names.sort(() => Math.random() - 0.5);

    // Dividir en equipos
    const teams = [];
    while (names.length >= teamSize) {
        teams.push(names.splice(0, teamSize));
    }

    // Mostrar los equipos generados
    let resultHTML = "<h3>Equipos Generados:</h3>";
    teams.forEach((team, index) => {
        resultHTML += `<p>Equipo ${index + 1}: ${team.join(", ")}</p>`;
    });

    // Agregar los nombres sobrantes si hay
    if (names.length > 0) {
        resultHTML += `<p>Sin equipo: ${names.join(", ")}</p>`;
    }

    teamsOutput.innerHTML = resultHTML;
}
