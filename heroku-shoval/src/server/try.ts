const axios = require ("axios");
import fs from "fs";
let  MongoClient = require('mongodb').MongoClient;
let  url = "mongodb://localhost:27017/";

interface customData {
    name: string;
    id:number;
    img: string;
    height: number;
    weight: number;
    types: any[];
    abilities: any[];
    stats:any[];
}

async function loadPokemonURLS() {
    let pokemonUrlArray: any[] = [];
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=3`
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
                id:pokemonData.id,
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
    let newArray:customData[]=[];
    let Firstid = pokemonJsonArray.length
    for(let pokemon of pokemonJsonArray){
        for(let pokemon2 of pokemonJsonArray){
            if(pokemon === pokemon2) continue
            else {
                let random = Math.random();
                let newPokemon:customData = {
                    name : pokemon.name.slice(0,4) + pokemon2.name.slice(4,6),
                    id: Firstid + 1,
                    img: random < 0.5 ? pokemon.img : pokemon2.img,
                    weight: (pokemon.weight + pokemon2.weight) / 2,
                    height: (pokemon.height + pokemon2.height) / 2,
                    abilities: random > 0.5 ? pokemon.abilities : pokemon2.abilities,
                    types: random < 0.5 ? pokemon.types : pokemon2.types,
                    stats: random > 0.5 ? pokemon.stats : pokemon2.stats,
                }
                Firstid ++;
                newArray.push(newPokemon)
            }
        }
    }
    for(let pokemon of newArray){
        pokemonJsonArray.push(pokemon)
    }
    return pokemonJsonArray;

}).then(pokemonJsonArray=> {
    // console.log(pokemonJsonArray);
    // Creating a json file for our server (contains all data)
    fs.writeFile('./dist/data.json', JSON.stringify(pokemonJsonArray), (err)=>{
        if(err) throw err;
    });
    MongoClient.connect(url, function(err:Error, db:any) {
        if (err) throw err;
        var dbo = db.db("pokemonsDB");
        // dbo.collection("pokemons").insertMany(pokemonJsonArray);
        // dbo.collection("pokemons").find({}).forEach((pokemon: any) => console.log(pokemon));
    })
})
