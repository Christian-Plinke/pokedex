const BASE_URL = "https://pokeapi.co/api/v2/"
let pokemonList = [];
let currentPokemon = [];
let currentOffset = 0;
let currentPokeId = null;

function init() {
    currentPokemon = pokemonList;
    fetchAllPokemons();
}

async function fetchAllPokemons(currentOffset) {
    const response = await fetch(BASE_URL + `pokemon?limit=20&offset=${currentOffset}`);
    const pokemonListData = await response.json();
    for (let i = 0; i < pokemonListData.results.length; i++) {
        const pokemon = pokemonListData.results[i];
        await fetchPokemonInfos(pokemon.url);
    }
    renderAllPokemons();
}

async function fetchPokemonInfos(url) {
    const response = await fetch(url);
    const pokemonInfos = await response.json();
    const types = pokemonInfos.types.map(entry => entry.type.name);
    const image = pokemonInfos.sprites.other.dream_world.front_default;
    const pokemon = {
        id: pokemonInfos.id,
        name: pokemonInfos.name,
        image: image,
        types: types
    };
    pokemonList.push(pokemon);
    
}

async function loadMorePokemons() {
    currentOffset += 20;
    showLoadingSpinner();
    await fetchAllPokemons(currentOffset);
}

function renderAllPokemons() {
    const html = document.getElementById('content');
    html.innerHTML = "";
    pokemonList.forEach(pokemon => {
        html.innerHTML += getPokemonCardTemplate(pokemon);
    });
}
function searchName() {
    const input = document.getElementById('search-input').value.toLowerCase();
    if (input.length < 3) {
        renderAllPokemons();
        return
    }

    const filtered = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(input)
    );

    const html = document.getElementById('content');
    html.innerHTML = "";

    filtered.forEach(pokemon => {
        html.innerHTML += getPokemonCardTemplate(pokemon);
    });
}


    function showLoadingSpinner() {
    const html = document.getElementById('content');
    html.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `;
}


function showDetails(id) {
    currentPokeId = id;
    console.log(id);
    const pokemon = pokemonList.find(p => p.id === id);
    console.log(pokemon);
}


