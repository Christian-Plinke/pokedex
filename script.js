const BASE_URL = "https://pokeapi.co/api/v2/"
let pokemonList = [];
let currentPokemon = [];
let currentOffset = 0;
let currentPokeId = null;

function init() {
    currentPokemon = pokemonList;
    showLoadingSpinner();
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
    
    showLoadButton();
}

async function fetchPokemonInfos(url) {
    const response = await fetch(url);
    const pokemonInfos = await response.json();
    const types = pokemonInfos.types.map(element => element.type.name);
    const image = pokemonInfos.sprites.other.dream_world.front_default;
    const height = pokemonInfos.height;
    const weight = pokemonInfos.weight;
    const pokemon = {
        id: pokemonInfos.id,
        name: pokemonInfos.name,
        image: image,
        types: types,
        height: height,
        weight: weight
    };
    pokemonList.push(pokemon);
}

function renderAllPokemons() {
    const html = document.getElementById('content');
    html.innerHTML = "";
    pokemonList.forEach(pokemon => {
        html.innerHTML += getPokemonCardTemplate(pokemon);
    });
}

function renderPokemonOverlay() {
    const html = document.getElementById('poke-details');
    html.innerHTML = "";
    
        html.innerHTML += getPokemonOverlayTemplate(pokemon);

}

function closeOverlay() {
    document.getElementById('overlay').classList.add("d_none");
}

async function loadMorePokemons() {
    currentOffset += 20;
    showLoadingSpinner();
    await fetchAllPokemons(currentOffset);
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
    const buttonHtml = document.getElementById('btn-container');

    buttonHtml.innerHTML = ``;

    html.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `;
}

function showLoadButton() {
    document.getElementById('btn-container').innerHTML = `<button class="load-pokes" onclick="loadMorePokemons()">load more pokemons</button>`;
}


function showDetails(id) {
    currentPokeId = id;
    console.log(id);
    const numericId = Number(id.toString().replace("poke-", ""));
    const pokemon = pokemonList.find(p => p.id === numericId);
    console.log(pokemon.image);
    document.getElementById('overlay').innerHTML = getPokemonOverlayTemplate(pokemon);
    document.getElementById('overlay').classList.remove("d_none");
}


