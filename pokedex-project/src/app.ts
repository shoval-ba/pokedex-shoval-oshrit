const api_url = "https://pokeapi.co/api/v2/pokemon?limit=151"

let pokimons:any[] = [];
async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    for(let pokimon of data.results){
      const pokimonUrl = pokimon.url;
      const detailes = await fetch(pokimonUrl);
      const Pokimon = await detailes.json();
      pokimons.push(Pokimon);
    }
    return pokimons
  }
  catch (error) {
    console.error(error);
  }
}

getApi(api_url)
pokimons = getApi(api_url);



