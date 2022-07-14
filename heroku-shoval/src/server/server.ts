
import express from 'express';
import path from "path";
const app =express();
import fs from "fs";

let filePath = path.join(__dirname,'../data/data.json');
let readFileData = JSON.parse(fs.readFileSync(filePath,"utf8"));

let  MongoClient = require('mongodb').MongoClient;
let  uri = "mongodb://localhost:27017/";

app.use('/', express.static(path.join(__dirname,'../client')));
app.get('/', function(req :any , res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname,'../client/index.html'));
});

// app.get('/pokemonsData',(req :any, res:any)=>{
//   res.send(readFileData);
// })

let pokemonsMongo: any[] = [];
app.get('/pokemonsData',async (req :any, res:any)=>{
  await MongoClient.connect(uri, function(err:Error, db:any) {
    if (err) throw err;
    var dbo = db.db("pokemonsDB");
    dbo.collection("pokemons").find({}).forEach((pokemon: any) =>{
      pokemonsMongo.push(pokemon)
    });
  })
  // pokemonsMongo.filter(()=>{
    
  // })
  res.send(pokemonsMongo)
})
  

app.listen( process.env.PORT || 5000,()=>{
  console.log("listen to port 5000");
})







