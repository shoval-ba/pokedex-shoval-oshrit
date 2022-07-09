// const fs = require ("fs");
// const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
// const axios = require ("axios")
// const pokemons = []; 
// async function getData(){
//    const dataPokemonsUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
//     const data = dataPokemonsUrl.data;
//     for (const pokemonData of data.results) {
//       const pokemonUrl = pokemonData.url;
//       const detailes =await axios.get(pokemonUrl);
//       const pokemon = detailes.data;
//       pokemons.push(pokemon);
//     }
//     fs.writeFileSync("../data/data.json", JSON.stringify(pokemons));

// }
const express = require('express');
const path = require("path");
const app =express();
const fs = require("fs");
let favorits=[];
filePath = path.join(__dirname,'../data/data.json');
let readFileData = JSON.parse(fs.readFileSync(filePath,"utf8"))

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html')
})

app.get('/css/styles.css', function(req, res) {
  res.sendFile(__dirname + "/styles.css");
});

app.get('/app.js',(req,res)=>{
  res.sendFile(__dirname+'/app.js')
})
app.get('/pokemonsData',(req,res)=>{
  res.send(readFileData)
})
app.post('/favoritePokemons',(req,res)=>{
console.log(req.body);
  let favoritePokemon = req.body;
  readFileData.push(favorits);
})
app.get('/favoritePokemons',(req,res)=>{
  res.send(pokemons)
})
app.listen(5000,()=>{
  console.log("listen to port 5000");
})







