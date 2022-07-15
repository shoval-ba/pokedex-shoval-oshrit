
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

app.get('/pokemonsData:number' ,async (req :any, res:any)=>{
    let number =0;
    const db = await MongoClient.connect(uri);
    var dbo = db.db("pokemonsDB");
    const MyCollection = dbo.collection('pokemons');
    number = Number(req.params.number)
    const result = await MyCollection.find({}).skip(number).limit(40).toArray();
    res.send(result); 
})

app.listen( process.env.PORT || 5000,()=>{
  console.log("listen to port 5000");
})







