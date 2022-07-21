import express from 'express';
import path from 'path';
const app =express();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://shoval-ba:shoval31@cluster0.3pm6f.mongodb.net/?retryWrites=true&w=majority';

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', function(req :any, res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

import { allPokemons , pokemonById , pokemonByName } from './db';

app.get('/pokemons', (_request: any, response: any) => { 
  allPokemons().then((pokemons) => response.json(pokemons))
});

// Gives pokemon by id after search.
app.get('/pokemonId:id', (req: any, response: any) => { 
  let id = Number(req.params.id);
  pokemonById(id).then((pokemons) => {
   for(let pokemon of pokemons){
    response.json(pokemon)
   }
  })
});

// Gives pokemon by name after search.
app.get('/pokemonName:name', (req: any, response: any) => { 
  let name = req.params.name;
  pokemonByName(name).then((pokemon) => response.json(pokemon))
});

// Gives favorite pokemons.
app.get('/favoriteList', async (req :any, res:any) => {
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemonsFavorite');
  const result = await MyCollection.find({}).toArray();
  res.send(result);
});

app.use(express.json({limit: '1mb'}));
// Add the pokemon to the mongo favorite list.
app.post('/addToFavorite', function (req :any, res:any){
  const pokemon = req.body;
  MongoClient.connect(uri, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    await dbo.collection('pokemonsFavorite').insertOne(pokemon);
  });
});

// Delete the pokemon from the mongo favorite list.
app.post('/deleteFavorite', function (req :any, res:any){
  const pokemon = req.body;
  MongoClient.connect(uri, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    await dbo.collection('pokemonsFavorite').deleteOne(pokemon);
  });
});

app.listen( process.env.PORT || 4000, () => {
  console.log('listen to port 4000');
});