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
    
    <div onclick="closeOverlay()" id="poke-details" class="overlay-card type-${pokemon.types[0]}">
        <div class="overlay-header">
        <h2><span>#${pokemon.id}</span> <span>${pokemon.name}</span></h2>
        </div>
        <div class="description-container">
        <p id="poke-description">${pokemon.description}</p>   
        </div>
        <div class="pokeImage">
            <img src="${pokemon.image}" alt="Bild von ${pokemon.name}">
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
        <p>speed: ${pokemon.stats.defense}</p>

        
        </div>
        
    </div>
    <div class="btn">
    <button class="next-btn" onclick="previousPokemon()">back</button>
    <button class="next-btn" onclick="nextPokemon()">next</button>
    </div>
    `
}   