function getPokemonCardTemplate(){
    return `
    <div class="pokeCard">
    <img src=${pokemon.image} alt="Bild eines Pokemon">
    Name: ${pokemon.name}<br>
    Type: ${pokemon.types}<br>

    </div>
    `
}