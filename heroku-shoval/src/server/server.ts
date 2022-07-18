
import express from 'express';
import path from 'path';
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI || 'mongodb+srv://oshrit:GKMVvX8BRUsaA3E@cluster0.ueov0.mongodb.net/?retryWrites=true&w=majority';
const MongoClientConnection = new MongoClient(uri);
app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/', function (req: any, res: any) { // serve main path as static file

  res.sendFile(path.join(__dirname, '..client/index.html'));
});


app.get('/pokemonsData/:number', async (req: any, res: any) => {
  let number = 0;
  console.log("a");
  const dbo = MongoClientConnection.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  number = Number(req.params.number);
  console.log("b");
  const result = await MyCollection.find({}).skip(number).limit(40).toArray();
  console.log(result);
  res.send(result);
});

app.get('/pokemonId/:number', async (req: any, res: any) => {
  let number = 0;
  const db = await MongoClient.connect(uri);
  const dbo = MongoClientConnection.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  number = Number(req.params.number);
  const result = await MyCollection.find({}).skip(number - 1).limit(1).toArray();
  res.send(result);
});

app.get('/pokemonName/:name', async (req: any, res: any) => {
  let inputName = '';
  const db = await MongoClient.connect(uri);
  const dbo = MongoClientConnection.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemons');
  inputName = req.params.name;
  const result = await MyCollection.find({ name: inputName }).toArray();
  res.send(result);
});

app.get('/favoriteList', async (req: any, res: any) => {
  // const db = await MongoClient.connect(uri);

  const dbo = MongoClientConnection.db('pokemonsDB');
  const MyCollection = dbo.collection('pokemonsFavorite');
  const result = await MyCollection.find({}).toArray();
  res.send(result);
});

app.use(express.json({ limit: '1mb' }))
app.post('/addToFavorite', async function (req: any, res: any) {
  let pokemon = req.body;
  // MongoClient.connect(uri, async function(err:Error, db:any) {
  //   if (err) throw err;
  const dbo = MongoClientConnection.db('pokemonsDB');
  await dbo.collection('pokemonsFavorite').insertOne(pokemon);
});
// })
;

app.post('/deleteFavorite', async function (req: any, res: any) {
  let pokemon = req.body;
  let id = pokemon.id;
  const dbo = MongoClientConnection.db('pokemonsDB');
  await dbo.collection('pokemonsFavorite').deleteOne(pokemon);

});
const db = MongoClientConnection.connect(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('listen to port 5000');
  });
});
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

