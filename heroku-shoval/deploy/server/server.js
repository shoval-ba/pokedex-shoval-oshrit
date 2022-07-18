"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://shoval-ba:shoval31@cluster0.3pm6f.mongodb.net/?retryWrites=true&w=majority';
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../client')));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.get('/pokemonsData:number', async (req, res) => {
    let number = 0;
    const db = await MongoClient.connect(uri);
    const dbo = db.db('pokemonsDB');
    const MyCollection = dbo.collection('pokemons');
    number = Number(req.params.number);
    const result = await MyCollection.find({}).skip(number).limit(40).toArray();
    res.send(result);
});
app.get('/pokemonId:number', async (req, res) => {
    let inputId = 0;
    const db = await MongoClient.connect(uri);
    const dbo = db.db('pokemonsDB');
    const MyCollection = dbo.collection('pokemons');
    inputId = Number(req.params.number);
    const result = await MyCollection.find({ id: inputId }).toArray();
    res.send(result);
});
app.get('/pokemonName:name', async (req, res) => {
    let inputName = '';
    const db = await MongoClient.connect(uri);
    const dbo = db.db('pokemonsDB');
    const MyCollection = dbo.collection('pokemons');
    inputName = req.params.name;
    const result = await MyCollection.find({ name: inputName }).toArray();
    res.send(result);
});
app.get('/favoriteList', async (req, res) => {
    const db = await MongoClient.connect(uri);
    const dbo = db.db('pokemonsDB');
    const MyCollection = dbo.collection('pokemonsFavorite');
    const result = await MyCollection.find({}).toArray();
    res.send(result);
});
app.use(express_1.default.json({ limit: '1mb' }));
app.post('/addToFavorite', function (req, res) {
    const pokemon = req.body;
    MongoClient.connect(uri, async function (err, db) {
        if (err)
            throw err;
        const dbo = db.db('pokemonsDB');
        await dbo.collection('pokemonsFavorite').insertOne(pokemon);
    });
});
app.post('/deleteFavorite', function (req, res) {
    const pokemon = req.body;
    MongoClient.connect(uri, async function (err, db) {
        if (err)
            throw err;
        const dbo = db.db('pokemonsDB');
        await dbo.collection('pokemonsFavorite').deleteOne(pokemon);
    });
});
app.listen(process.env.PORT || 5000, () => {
    console.log('listen to port 5000');
});
//# sourceMappingURL=server.js.map