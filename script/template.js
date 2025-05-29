function getPokemonCardTemplate(pokemon) {
    return `
<div class="pokeCard type-${pokemon.types[0]}">
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