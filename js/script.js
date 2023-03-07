/* Aqui estou selecionando a tag html através de sua classe usando o document.querySelector(). */
const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

/* Função para pesquisar p Pokemon na API. */
const fetchPokemon = async (pokemon) => {
  /* AWAIT para aguardar a resposta do fetch de depois executar os demais comandos. */
  /* AWAIT só pode ser usado em funções assíncronas. */
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    /* A API retorna os dados em JSON. */
    const data = await APIResponse.json();
    return data;
  }
};

/* Função para renderizar as informações na tela. */
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    /* INNERHTML para inserir a info na tag html selecionada através da const pokemonName. */
    /* O .name ou .id é a chave JSON da informação que eu quero retornar. */
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    /* O caminho percorrido pelas chaves do JSON até chegar na informação 
    que eu quero retornar também podem ser feitas pelos colchetes []. */
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :C";
    pokemonNumber.innerHTML = "";
  }
};

/* Função para usar a renderização através da pesquisa do input. */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

/* Quando a página carrega já começa com o pokémon 1. */
renderPokemon(searchPokemon);
