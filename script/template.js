function getPokemonCardTemplate(pokemon) {
    return `
<div onclick="showDetails(id)" id="poke-${pokemon.id}" class="pokeCard type-${pokemon.types[0]}">
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
    <div id="poke-details" class=" overlay-card type-${pokemon.types[0]}">
        <h2><span>#${pokemon.id}</span> <span>${pokemon.name}</span></h2>
        <div class="pokeImage">
            <img src="${pokemon.image}" alt="Bild von ${pokemon.name}">
        </div>
        <div class="detail-infos">
        <h3>height: ${pokemon.height} </h3>
        <h3>width: ${pokemon.weight}</h3>    
        </div>
    </div>
    `
}   