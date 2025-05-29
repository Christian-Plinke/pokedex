const BASE_URL = "https://pokeapi.co/api/v2/"
let pokemonList = [];
let currentOffset = 0;

function init() {
    fetchAllPokemons();
}

async function fetchAllPokemons(currentOffset) {
    const response = await fetch(BASE_URL + `pokemon?limit=20&offset=${currentOffset}`);
    const pokemonListData = await response.json();
    for (let pokemon of pokemonListData.results) {
    await fetchPokemonDetails(pokemon.url);
}
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    const types = pokemonDetails.types.map(entry => entry.type.name);
    //const image = pokemonDetails.other?.dream_world?.front_default || pokemonDetails.sprites.front_default;
    const image = pokemonDetails.sprites.other.dream_world.front_default;
    const pokemon = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        image: image,
        types: types
    };
    pokemonList.push(pokemon);
    console.log(pokemonDetails);
    renderPokemon(pokemon);

}

async function loadMorePokemons(){
    currentOffset += 20; 
    await fetchAllPokemons(currentOffset);
}

function renderPokemon(pokemon) {
    let html = document.getElementById('content');
    html.innerHTML += getPokemonCardTemplate(pokemon);
}


