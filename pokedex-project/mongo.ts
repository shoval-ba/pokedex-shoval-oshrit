const fetch = require('fetch')
let  MongoClient = require('mongodb').MongoClient;
let  url = "mongodb://localhost:27017/";

let pokemons: any;

export async function getApi() {
    try {
      let pokemonsData = await(await fetch('/pokemonsData')).url; 
      let response = await fetch(pokemonsData);
      pokemons = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function insertToMongo(){
    await getApi();
    MongoClient.connect(url, function(err:Error, db:any) {
        if (err) throw err;
        var dbo = db.db("mongo_practice");
        // dbo.collection("pokemons").insertMany(pokemons);
        dbo.collection("pokemons").find({}).forEach((pokemon: any) => console.log(pokemon));
    })
  }

  insertToMongo();