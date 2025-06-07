function getPokemonCardTemplate(pokemon) {
    return `
<div onclick="showOverlay(${pokemon.id})" id="poke-${pokemon.id}" class="pokeCard type-${pokemon.types[0]}">
<div class="card-h2">
<h2><span>#${pokemon.id}</span> <span>${pokemon.name}</span></h2>
</div>
    <div class="pokeImage">
        <img src="${pokemon.image}" alt="Bild von ${pokemon.name}">
    </div>
    <div class="pokeInfo">
        
        <div class="types"><strong><p>Type:</p></strong> <p>${pokemon.types.join(', ')}</p></div>
    </div>
</div>
`
}

function getPokemonOverlayTemplate(pokemon) {
    return `
    <div id="poke-details" class="overlay-card type-${pokemon.types[0]}">
        <div class="overlay-header">
        <h2><span>#${pokemon.id}</span> <span>${pokemon.name}</span></h2>
        </div>
        <div class="description-container">
        <p id="poke-description">${pokemon.description}</p>   
        </div>
        <div class="poke-image">
            <button class="next-btn" onclick="previousPokemon()">back</button>
            <img class="img-detail" src="${pokemon.image}" alt="Bild von ${pokemon.name}">
            <button class="next-btn" onclick="nextPokemon()">next</button>
        </div>
        <div class="detail-infos">
        <h3>height: ${pokemon.height} </h3>
        <h3>weight: ${pokemon.weight}</h3>
        </div>
        <div class="stats-container">
        <h3>Stats:</h3>
        <p>hp: ${pokemon.stats.hp}</p>
        <p>attack: ${pokemon.stats.attack}</p>
        <p>defense: ${pokemon.stats.defense}</p>
        <p>speed: ${pokemon.stats.speed}</p>
        <p>special-attack: ${pokemon.stats["special-attack"]}</p>
        <p>special-defense: ${pokemon.stats["special-defense"]}</p>
        </div>
    </div>
    `
}   

function getLoadingSpinnerTemplate(){
    return `
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `; 
}