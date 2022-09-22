import express from 'express';
import path from 'path';
const app =express();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://shoval-ba:shoval31@cluster0.3pm6f.mongodb.net/?retryWrites=true&w=majority';

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', function(_req :any, res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname, '../client'));
});

app.get('/pokemonsData:number', async function (req :any, res:any) {
  let number = 0;
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  number = Number(req.params.number);
  const result = await MyCollection.find({}).skip(number).limit(40).toArray();
  res.send(result);
});
app.get('/pokemonId:number', async function (req :any, res:any) {
  let inputId =0;
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  inputId = Number(req.params.number);
  const result = await MyCollection.find({id: inputId}).toArray();
  res.send(result);
});
app.get('/pokemonName:name', async function (req :any, res:any) {
  let inputName ='';
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  inputName = req.params.name;
  const result = await MyCollection.find({ name: inputName }).toArray();
  res.send(result);
});
app.get('/favoriteList', async function (res:any) {
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemonsFavorite');
  const result = await MyCollection.find({}).toArray();
  res.send(result);
});
app.use(express.json({limit: '1mb'}));
app.post('/addToFavorite', function (req :any){
  const pokemon = req.body;
  MongoClient.connect(uri, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    await dbo.collection('pokemonsFavorite').insertOne(pokemon);
  });
});
app.post('/deleteFavorite', function (req :any){
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