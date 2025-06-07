const BASE_URL = "https://pokeapi.co/api/v2/"

let pokemonList = [];
let currentOffset = 0;
let currentPokeId = null;

function init() {
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
    const description = await getPokemonDescription(pokemonInfos.species.url);
    const pokemon = buildPokemonObject(pokemonInfos, description);
    pokemonList.push(pokemon);
}

function buildPokemonObject(pokemonInfos, description) {
    const types = pokemonInfos.types.map(element => element.type.name);
    const image = pokemonInfos.sprites.other.dream_world.front_default;
    const height = pokemonInfos.height;
    const weight = pokemonInfos.weight;
    const stats = getPokemonStats(pokemonInfos);
    const pokemon = {
        id: pokemonInfos.id,
        name: pokemonInfos.name,
        image: image,
        types: types,
        height: height,
        weight: weight,
        description: description,   
        stats: stats
    };
    return pokemon; 
}

async function getPokemonDescription(speciesUrl) {
    let description = "no description found.";
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const entry = speciesData.flavor_text_entries.find(e => e.language.name === "en")
        description = entry.flavor_text//.replace(/\n|\f/g, ' ');
    } catch (err) {
        console.error("Fehler beim Laden der Description für ID", id, err);
    }
    return description;
}

function getPokemonStats(pokemonInfos) {
    const stats = {};
    pokemonInfos.stats.forEach(statObj => {
        const name = statObj.stat.name;
        stats[name] = statObj.base_stat;
    });
    return stats;
}

function renderAllPokemons() {
    const html = document.getElementById('content');
    html.innerHTML = "";
    pokemonList.forEach(pokemon => {
        html.innerHTML += getPokemonCardTemplate(pokemon);
    });
}

function showOverlay(id) {
    currentPokeId = id;
    const pokemon = pokemonList.find(p => p.id === id);
    document.getElementById('overlay').innerHTML = getPokemonOverlayTemplate(pokemon);
    document.getElementById('overlay-container').classList.remove("d_none");
    document.body.classList.add("disable-scroll");
}

function closeOverlay() {
    document.getElementById('overlay-container').classList.add("d_none");
    document.body.classList.remove("disable-scroll");
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

function nextPokemon() {
    const maxId = Math.max(...pokemonList.map(p => p.id));
    if (currentPokeId === maxId){
        showOverlay(currentId = 1);
    }
    else{
    showOverlay(currentPokeId + 1);
    }
}

function previousPokemon() {
        if (currentPokeId === 1) {
        const maxId = Math.max(...pokemonList.map(p => p.id));
        showOverlay(maxId);
    } else {
        showOverlay(currentPokeId - 1);
    }
}
