const BASE_URL = "https://pokeapi.co/api/v2/"

let pokemonList = [];
let currentOffset = 0;
let currentPokeId = null;

function init() {
    showLoadingSpinner();
    fetchAllPokemons(currentOffset);
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
    renderFilteredPokemons(filtered);
}

function nextPokemon() {
    const maxId = Math.max(...pokemonList.map(p => p.id));
    if (currentPokeId === maxId) {
        showOverlay(1);
    }
    else {
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
