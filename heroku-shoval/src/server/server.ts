
import express from 'express';
import path from 'path';
const app =express();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/';

app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', function(req :any, res:any) { // serve main path as static file
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

if (process.env.NODE_ENV === 'production'){
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.get('/pokemonsData:number', async (req :any, res:any) => {
  let number =0;
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  number = Number(req.params.number);
  const result = await MyCollection.find({}).skip(number).limit(40).toArray();
  res.send(result);
});

app.get('/pokemonId:number', async (req :any, res:any) => {
  let number =0;
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  number = Number(req.params.number);
  const result = await MyCollection.find({}).skip(number-1).limit(1).toArray();
  res.send(result);
});

app.get('/pokemonName:name', async (req :any, res:any) => {
  let inputName ='';
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  inputName = req.params.name;
  const result = await MyCollection.find({ name: inputName }).toArray();
  res.send(result);
});

app.get('/favoriteList', async (req :any, res:any) => {
  const db = await MongoClient.connect(uri);
  const dbo = db.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemonsFavorite');
  const result = await MyCollection.find({}).toArray();
  res.send(result);
});

app.get('/addToFavorite:array', function (req :any, res:any){
  MongoClient.connect(uri, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    const array:any[] = req.params.array;
    await dbo.collection('pokemonsFavorite').insertMany(array);
  });
});

app.get('/deleteFavorite:id', function (req :any, res:any){
  MongoClient.connect(uri, async function(err:Error, db:any) {
    if (err) throw err;
    const dbo = db.db('pokemonsDB');
    const id = req.params.id;
    await dbo.collection('pokemonsFavorite').delete({id: id});
  });
});

app.listen( process.env.PORT || 5000, () => {
  console.log('listen to port 5000');
});
