const BASE_URL = "https://pokeapi.co/api/v2/"
let pokemonList = [];
function init() {
    fetchAllPokemons();
}

async function fetchAllPokemons() {
    const response = await fetch(BASE_URL + "pokemon?limit=20&offset=0");
    const pokemonListData = await response.json();
    pokemonListData.results.forEach(pokemon => {
        fetchPokemonDetails(pokemon.url);
    })
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    const types = pokemonDetails.types.map(entry => entry.type.name);
    const image = pokemonDetails.other?.dream_world?.front_default || pokemonDetails.sprites.front_default;
    const pokemon = {
        name: pokemonDetails.name,
        image: image,
        types: types
    };
    pokemonList.push(pokemon);
    console.log(pokemon);
    renderPokemon(pokemon);

}

function renderPokemon(pokemon) {
    let html = document.getElementById('content');
    html.innerHTML = getPokemonCardTemplate(pokemon);
}


function getPokemonCardTemplate(pokemon) {
    return `
<div class="pokeCard type-${pokemon.types[0]}">
    <div class="pokeImage">
        <img src="${pokemon.image}" alt="Bild von ${pokemon.name}">
    </div>
    <div class="pokeInfo">
        <h2>${pokemon.name}</h2>
        <div class="types">${pokemon.types.join(', ')}</div>
    </div>
</div>
` 
}