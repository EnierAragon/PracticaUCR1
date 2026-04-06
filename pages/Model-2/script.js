const select = document.getElementById("pokemonSelect");
const container = document.getElementById("pokemonContainer");

let todosLosPokemons = []; // 🔹 Guardaremos todos los datos completos

// 🔹 Cargar todos los Pokémon al inicio
async function cargarPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await res.json();

    // Hacemos fetch de cada URL para obtener todos los datos
    const pokemons = await Promise.all(
      data.results.map(p => fetch(p.url).then(r => r.json()))
    );

    todosLosPokemons = pokemons; // Guardamos todo en la variable

    // Llenamos el select
    pokemons.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      select.appendChild(option);
    });

  } catch (error) {
    console.error(error);
  }
}

// 🔹 Mostrar Pokémon desde la variable
function mostrarPokemon(nombre) {
  const pokemon = todosLosPokemons.find(p => p.name === nombre);
  if (!pokemon) return;

  container.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("card");

  // Mínimo 3 datos
  div.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>ID: ${pokemon.id}</p>
    <p>Altura: ${pokemon.height}</p>
    <p>Peso: ${pokemon.weight}</p>
  `;

  container.appendChild(div);
}

// 🔹 Evento al cambiar el select
select.addEventListener("change", (e) => {
  const valor = e.target.value;
  if (valor !== "all") {
    mostrarPokemon(valor);
  } else {
    container.innerHTML = "<p>Selecciona un Pokémon</p>";
  }
});

// 🔹 Inicializar
cargarPokemons();