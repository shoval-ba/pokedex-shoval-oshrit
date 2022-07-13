const axios = require ("axios");
import fs from "fs";

interface customData {
    name: string;
    img: string;
    height: number;
    weight: number;
    types: any[];
    abilities: any[];
    stats:any[];
}

async function loadPokemonURLS() {
    let pokemonUrlArray: any[] = [];
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=151`
    const response = await axios.get(URL)
        .then(function (result: any) {
            pokemonUrlArray = result.data.results;
        })

    return pokemonUrlArray;
}

// Fetch from URL the specific Pokemon data
async function fetchData(pokemon: any) {
    const URL = pokemon.url;
    const response = await axios.get(URL)
    let data = response.data;
    return data;

}

/**
 * Code runs and uses above functions, compiles only wanted 
 * information to reduce loading time on actual app
 */
loadPokemonURLS().then(async function (pokemonUrlArray) {
    let pokemonJsonArray: customData[] = [];

    /**
     * Goes through every URL=> fetches data=> compiles only 
     * wanted data (global app interface) => adds it to array
     */
    for (let pokemonUrl of pokemonUrlArray) {
        await fetchData(pokemonUrl).then(pokemonData=> {
            
            const customData: customData = {
                name: pokemonData.name,
                img: pokemonData.sprites.other!.dream_world.front_default,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types,
                abilities: pokemonData.abilities,
                stats : pokemonData.stats
            }

            pokemonJsonArray.push(customData);
        })
    }

    return pokemonJsonArray;

}).then(pokemonJsonArray=> {
    console.log(pokemonJsonArray);
    // Creating a json file for our server (contains all data)
    fs.writeFile('./dist/data.json', JSON.stringify(pokemonJsonArray), (err)=>{
        if(err) throw err;
    });
})