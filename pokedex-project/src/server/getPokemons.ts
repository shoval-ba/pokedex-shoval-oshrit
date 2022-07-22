const axios = require('axios');
// import fs from 'fs';
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://shoval-ba:shoval31@cluster0.3pm6f.mongodb.net/?retryWrites=true&w=majority';

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://dfxhbbzrpkojps:34c220d66fc6bfd7c387a0297d96582b12959fa4093d1bfd4873616fa64176fa@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d7okfer9krsm48",
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
interface customData {
  name: string;
  id: number;
  img: string;
  height: number;
  weight: number;
  types: any[];
  abilities: any[];
  stats: any[];
}

async function loadPokemonURLS() {
  let pokemonUrlArray: any[] = [];
  const URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';
  await axios.get(URL)
    .then(function (result: any) {
      pokemonUrlArray = result.data.results;
    });

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
  const newArray: customData[] = [];
  let Firstid = pokemonJsonArray.length;
  for (const pokemon1 of pokemonJsonArray) {
    for (const pokemon2 of pokemonJsonArray) {
      if (pokemon1 === pokemon2) continue;
      else {
        const random = Math.random();
        const newPokemon: customData = {
          name: pokemon1.name.slice(0, 4) + pokemon2.name.slice(4, 6),
          id: Firstid + 1,
          img: pokemon2.img,
          weight: (pokemon1.weight + pokemon2.weight) / 2,
          height: (pokemon1.height + pokemon2.height) / 2,
          abilities: random > 0.5 ? pokemon1.abilities : pokemon2.abilities,
          types: random < 0.5 ? pokemon1.types : pokemon2.types,
          stats: random > 0.5 ? pokemon1.stats : pokemon2.stats,
        };
        Firstid++;
        newArray.push(newPokemon);
      }
    }
  }
  for (const pokemon of newArray) {
    pokemonJsonArray.push(pokemon);
  }
  return pokemonJsonArray;

}).then(async pokemonJsonArray => {
  let  pokemonArray = pokemonJsonArray.map((x:any) => Object.values(x));
for(let i=0;i<pokemonArray.length;i++){
  let queryString = 'INSERT INTO pokemons( name ,id , img , height , weight , types , abilities , stats) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
  client.query(queryString, pokemonArray[i], (err:any)=>{
    if (err){
      console.log(err);
    } else {
      console.log(i);
    }
  })
}
});

async function createTable() {
  console.log("init")
  await client.query(`
  CREATE TABLE pokemons (
    name VARCHAR(255) NOT NULL,
    id INTEGER PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    height NUMERIC NOT NULL,
    weight NUMERIC NOT NULL,
    types TEXT [], 
    abilities TEXT [], 
    stats TEXT []
  );
`);
console.log("create")
}

// createTable()
