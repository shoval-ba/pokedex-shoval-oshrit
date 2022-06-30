import { Pokemon, pokemonComponent } from "./pokimonComp";

const api_url = "https://pokeapi.co/api/v2/pokemon?limit=151"

export let pokemons: any[] = [];
export async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (let pokemonData of data.results) {
      const pokemonUrl = pokemonData.url;
      const detailes = await fetch(pokemonUrl);
      const Pokemon = await detailes.json();
      pokemons.push(Pokemon);
    }

  }
  catch (error) {
    console.error(error);
  }
}

export async function renderIt() {
  await getApi(api_url);
  console.log(pokemons);
  let content: HTMLElement | null = document.querySelector('#content')
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());


}




window.onload = () => {
  renderIt();
}


