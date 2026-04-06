document.addEventListener("DOMContentLoaded", () => {

    fetch("datos.json")
        .then(response => response.json())
        .then(datos => {
            const tbody = document.querySelector("#miTabla tbody");
            tbody.innerHTML = "";

            datos.forEach(persona => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.provincia}</td>
                    <td>${persona.correo}</td>
                `;

                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error cargando el JSON:", error);
        });

});