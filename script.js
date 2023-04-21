const pokemonName = document.querySelector(".pokemon_name");
const pokemonID = document.querySelector(".pokemon_number");
const pokemonGIF = document.querySelector(".pokemon_img");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonID.innerHTML = "";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonGIF.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonGIF.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Not found :C";
    pokemonID.innerHTML = "";
    pokemonGIF.style.display = "none";
  }
  input.value = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
