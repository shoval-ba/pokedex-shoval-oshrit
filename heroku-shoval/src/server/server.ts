// Runs this script only once and it save the data in the data folder.// const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

// const axios = require ("axios")
// let pokemons:any[] = []; 
// async function getData(){
//    const dataPokemonsUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15')
//     const data = dataPokemonsUrl.data;
//     for (const pokemonData of data.results) {
//       const pokemonUrl = pokemonData.url;
//       const detailes =await axios.get(pokemonUrl);
//       const pokemon = detailes.data;
//       pokemons.push(pokemon);
//     }
//     fs.writeFileSync("./dist/data/data.json", JSON.stringify(pokemons));
//     console.log(pokemons)
// }

// getData()

import express from 'express';
import path from "path";
const app =express();
import fs from "fs";

let filePath = path.join(__dirname,'../data/data.json');
let readFileData = JSON.parse(fs.readFileSync(filePath,"utf8"));


app.use('/', express.static(path.join(__dirname,'../client')));
app.get('/', function(req :any , res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname,'../client/index.html'));
});

app.get('/pokemonsData',(req :any, res:any)=>{
  res.send(readFileData);
})

app.listen( process.env.PORT || 5000,()=>{
  console.log("listen to port 5000");
})







