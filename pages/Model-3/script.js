document.getElementById('btn-local').addEventListener('click', () => {
  fetch('FunData.json')
    .then(response => response.json())
    .then(data => {
      // Pick a random person from the local JSON
      const person = data[Math.floor(Math.random() * data.length)];
      displayData('.local .data-container', person);
    })
    .catch(error => console.error('Error cargando JSON local:', error));
});

document.getElementById('btn-api').addEventListener('click', () => {
  // Using RandomUser API for comparison
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      const user = data.results[0];
      const person = {
        nombre: user.name.first,
        apellido: user.name.last,
        edad: user.dob.age,
        email: user.email,
        profesion: 'Usuario API', // The API doesn't provide profession
        pais: user.location.country
      };
      displayData('.api .data-container', person);
    })
    .catch(error => console.error('Error cargando API:', error));
});

function displayData(selector, person) {
  const container = document.querySelector(selector);
  // Add a small fade-in effect via classes if we wanted, but let's keep it simple and clean
  container.innerHTML = `
    <p><strong>Nombre:</strong> ${person.nombre}</p>
    <p><strong>Apellido:</strong> ${person.apellido}</p>
    <p><strong>Edad:</strong> ${person.edad}</p>
    <p><strong>Email:</strong> ${person.email}</p>
    <p><strong>Profesión:</strong> ${person.profesion}</p>
    <p><strong>País:</strong> ${person.pais}</p>
  `;
  
  // Animation effect
  container.style.opacity = '0';
  setTimeout(() => {
    container.style.transition = 'opacity 0.5s ease';
    container.style.opacity = '1';
  }, 50);
}
