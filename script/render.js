function showLoadingSpinner() {
    const html = document.getElementById('content');
    const buttonHtml = document.getElementById('btn-container');
    buttonHtml.innerHTML = ``;
    html.innerHTML = getLoadingSpinnerTemplate();
}

function renderAllPokemons() {
    const html = document.getElementById('content');
    html.innerHTML = "";
    pokemonList.forEach(pokemon => {
        html.innerHTML += getPokemonCardTemplate(pokemon);
    });
}

function renderFilteredPokemons(filteredList) {
    const html = document.getElementById('content');
    html.innerHTML = "";
    filteredList.forEach(pokemon => {
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

function showLoadButton() {
    document.getElementById('btn-container').innerHTML = getLoadButtonTemplate();
}