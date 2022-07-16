import express from 'express';
import path from 'path';
const app =express();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/';

if (process.env.NODE_ENV === 'production'){
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
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}
app.listen( process.env.PORT, () => {
  console.log('listen to port 5000');
});
