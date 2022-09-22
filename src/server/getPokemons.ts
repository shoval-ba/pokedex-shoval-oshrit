const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DATA_BASE;

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
  // const URL = 'https://pokeapi.co/api/v2/pokemon?limit=300';
  // const response = await axios.get(URL)
  //   .then(function (result: any) {
  //     pokemonUrlArray = result.data.results;
  //   });

  return pokemonUrlArray;
}

// Fetch from URL the specific Pokemon data
async function fetchData(pokemon: any) {
  const URL = pokemon.url;
  const response = await axios.get(URL);
  const data = response.data;
  return data;
}

/**
 * Code runs and uses above functions, compiles only wanted
 * information to reduce loading time on actual app
 */
loadPokemonURLS().then(async function (pokemonUrlArray) {
  const pokemonJsonArray: customData[] = [];

  /**
     * Goes through every URL=> fetches data=> compiles only
     * wanted data (global app interface) => adds it to array
     */
  for (const pokemonUrl of pokemonUrlArray) {
    await fetchData(pokemonUrl).then(pokemonData => {

      const customData: customData = {
        name: pokemonData.name,
        id: pokemonData.id,
        img: pokemonData.sprites.other!.dream_world.front_default,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types,
        abilities: pokemonData.abilities,
        stats: pokemonData.stats
      };

      pokemonJsonArray.push(customData);
    });
  }
  const newArray:customData[]=[];
  let Firstid = pokemonJsonArray.length;
  for (const pokemon1 of pokemonJsonArray){
    for (const pokemon2 of pokemonJsonArray){
      if (pokemon1 === pokemon2) continue;
      else {
        const random = Math.random();
        const newPokemon:customData = {
          name: pokemon1.name.slice(0, 4) + pokemon2.name.slice(4, 6),
          id: Firstid + 1,
          img: pokemon2.img,
          weight: (pokemon1.weight + pokemon2.weight) / 2,
          height: (pokemon1.height + pokemon2.height) / 2,
          abilities: random > 0.5 ? pokemon1.abilities : pokemon2.abilities,
          types: random < 0.5 ? pokemon1.types : pokemon2.types,
          stats: random > 0.5 ? pokemon1.stats : pokemon2.stats,
        };
        Firstid ++;
        newArray.push(newPokemon);
      }
    }
  }
  for (const pokemon of newArray){
    pokemonJsonArray.push(pokemon);
  }
  return pokemonJsonArray;

}).then(pokemonJsonArray => {
  MongoClient.connect(url, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    while (pokemonJsonArray.length){
      await dbo.collection('pokemons').insertMany(pokemonJsonArray.splice(0,5001));
      console.log('done');
    }
    console.log("done all")
    // dbo.collection("pokemons").deleteMany({});
    // dbo.collection("pokemons").find({}).forEach((pokemon: any) => console.log(pokemon));
  });
});
