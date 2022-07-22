import express from 'express';
import path from 'path';
const app =express();

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', function(req :any, res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

import { get40pokemons , pokemonById , pokemonByName , favoriteList , addToFavorite , deleteFavorite} from './db';

// Gives 40 pokemons from the db.
app.get(`/pokemonsData:number`, (req: any, response: any) => {
  let number: number = Number(req.params.number);
  get40pokemons(number).then((pokemons) => response.json(pokemons))
})

// Gives pokemon by id after search.
app.get('/pokemonId:id', (req: any, response: any) => { 
  let id = Number(req.params.id);
  pokemonById(id).then((pokemons) => {
   for(let pokemon of pokemons){
    response.json(pokemon)
   }
   if(pokemons =[]) response.json(pokemons);
  })
});

// Gives pokemon by name after search.
app.get('/pokemonName:name', (req: any, response: any) => { 
  let name = req.params.name;
  pokemonByName(name).then((pokemon) => response.json(pokemon))
});

// Gives favorite pokemons.
app.get('/favoriteList', async (req :any, response:any) => {
  favoriteList().then((pokemons) => response.json(pokemons))
});

app.use(express.json({limit: '1mb'}));
// Add the pokemon to the db favorite list.
app.post('/addToFavorite', function (req :any, response:any){
  const pokemon = req.body;
  addToFavorite(pokemon);
});

// Delete the pokemon from the db favorite list.
app.post('/deleteFavorite', function (req :any, response:any){
  const pokemon = req.body;
  deleteFavorite(pokemon);
});

app.listen( process.env.PORT || 4000, () => {
  console.log('listen to port 4000');
});