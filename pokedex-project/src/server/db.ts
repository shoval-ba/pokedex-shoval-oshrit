
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://dfxhbbzrpkojps:34c220d66fc6bfd7c387a0297d96582b12959fa4093d1bfd4873616fa64176fa@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d7okfer9krsm48",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

export async function allPokemons(){
    const sql = `SELECT * FROM pokemons`;
    const result = await client.query(sql);
    const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
    return pokemons;
}

export async function get40pokemons(number:number){
  const sql = `SELECT * FROM pokemons WHERE id=$1`;
  const result = await client.query(sql , [number]);
  const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemons;
}

export async function pokemonById(id:number){
  const sql = `SELECT * FROM pokemons WHERE id = $1`;
  const result = await client.query(sql , [id]);
  const pokemon = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemon;
}

export async function pokemonByName(name:string){
  const sql = `SELECT * FROM pokemons WHERE name = $1`;
  const result = await client.query(sql , [name]);
  const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemons;
}

// import { allPokemons , pokemonById , pokemonByName } from './db';

// app.get('/pokemons', (_request: any, response: any) => { 
//   allPokemons().then((pokemons) => response.json(pokemons))
// });

// // Gives pokemon by id after search.
// app.get('/pokemonId:id', (req: any, response: any) => { 
//   let id = Number(req.params.id);
//   pokemonById(id).then((pokemon) => response.json(pokemon))
// });

// // Gives pokemon by name after search.
// app.get('/pokemonName:name', (req: any, response: any) => { 
//   let name = req.params.name;
//   pokemonByName(name).then((pokemon) => response.json(pokemon))
// });

