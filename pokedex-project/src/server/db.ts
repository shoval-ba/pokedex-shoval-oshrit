
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://dfxhbbzrpkojps:34c220d66fc6bfd7c387a0297d96582b12959fa4093d1bfd4873616fa64176fa@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d7okfer9krsm48',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// Returns 40 pokemons from the db.
export async function get40pokemons(number:number){
  const sql = `SELECT * FROM pokemons WHERE id  BETWEEN ((${number}*40)-39) AND (${number}*40)`;
  const result = await client.query(sql );
  const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemons;
}

// Returns pokemon by id from the db.
export async function pokemonById(id:number){
  const sql = 'SELECT * FROM pokemons WHERE id = $1';
  const result = await client.query(sql, [id]);
  const pokemon = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemon;
}

// Returns pokemon by name from the db.
export async function pokemonByName(name:string){
  const sql = 'SELECT * FROM pokemons WHERE name = $1';
  const result = await client.query(sql, [name]);
  const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemons;
}

// Returns favorite pokemons from the db.
export async function favoriteList(){
  const sql = 'SELECT * FROM favoritePokemons';
  const result = await client.query(sql);
  const pokemons = result.rows.map((pokemon:any) => Object.assign(pokemon));
  return pokemons;
}

// Add pokemon to the favoritePokemons db.
export async function addToFavorite(pokemon:any){
  const pokemonArray = Object.values(pokemon);
  const sql = 'INSERT INTO favoritePokemons( name ,id , img , height , weight , types , abilities , stats) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
  await client.query(sql, pokemonArray);
}

// Delete pokemon to the favoritePokemons db.
export async function deleteFavorite(pokemon:any){
  const id = pokemon.id;
  const sql = 'DELETE FROM favoritePokemons WHERE id = $1';
  await client.query(sql, [id]);
}

// Create table to favorite pokemons.
async function createTable() {
  await client.query(`
  CREATE TABLE favoritePokemons (
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
  console.log('create');
}

// createTable()
