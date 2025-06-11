async function fetchAllPokemons(currentOffset) {
    try {
        const response = await fetch(BASE_URL + `pokemon?limit=20&offset=${currentOffset}`);
        const pokemonListData = await response.json();
        for (const pokemon of pokemonListData.results) {
            await fetchPokemonInfos(pokemon.url);
        }
        renderAllPokemons();
        showLoadButton();
    } catch (error) {
        console.error("failed to load pokemon list:", error);
        document.getElementById('error').innerHTML = "failed to load pokemon list!";
    }
}

async function fetchPokemonInfos(url) {
    try {
        const response = await fetch(url);
        const pokemonInfos = await response.json();
        const description = await getPokemonDescription(pokemonInfos.species.url);
        const pokemon = buildPokemonObject(pokemonInfos, description);
        pokemonList.push(pokemon);
    } catch (error) {
        console.error("failed to load pokemon details", error);
        document.getElementById('error').innerHTML = "failed to load pokemon details";
    }
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

function getPokemonStats(pokemonInfos) {
    const stats = {};
    pokemonInfos.stats.forEach(statObj => {
        const name = statObj.stat.name;
        stats[name] = statObj.base_stat;
    });
    return stats;
}

async function getPokemonDescription(speciesUrl) {
    let description = "no description found.";
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const entry = speciesData.flavor_text_entries.find(e => e.language.name === "en")
        description = entry.flavor_text.replace(/\n|\f/g, ' ');
    } catch (err) {
        console.error("Fehler beim Laden der Description für ID", id, err);
    }
    return description;
}