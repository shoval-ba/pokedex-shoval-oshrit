const api_url = "https://pokeapi.co/api/v2/pokemon/arbok"

async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error(error);
  }
}

getApi(api_url)



