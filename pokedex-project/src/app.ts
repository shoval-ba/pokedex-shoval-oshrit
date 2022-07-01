import { Pokemon, pokemonComponent } from "./pokimonComp";

const api_url = "https://pokeapi.co/api/v2/pokemon?limit=151"

export let pokemons: any[] = [];

// Gets the data from the website.
export async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (let pokemonData of data.results) {
      const pokemonUrl = pokemonData.url;
      const detailes = await fetch(pokemonUrl);
      const pokemon = await detailes.json();
      pokemons.push(pokemon);
    }
  }
  catch (error) {
    console.error(error);
  }
}

// Render the pokemons.
export async function renderIt() {
  await getApi(api_url);
  console.log(pokemons);
  let content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
}

// Search for some pokemon by name
function search() {
  const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
  pokemonsDivBeforeSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const pokemonsDivAfterSearch = document.querySelectorAll('.item');
  pokemonsDivAfterSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const search: HTMLInputElement | null = document.querySelector('.search');
  const value = search?.value.toLowerCase();
  const valueCheck = Number(search?.value);

  if (value === "") {
    let content: HTMLElement | null = document.querySelector('#content2')
    pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  }
  else if (valueCheck == value) {

    for (const pokemon of pokemons) {
      if (pokemon.id == valueCheck!) {
        let content: HTMLElement | null = document.querySelector('#content')
        new pokemonComponent(pokemon, content!).renderAfterSearch();
      }
      // else if(valueCheck==Number)
    }

  }
  else {
    for (const pokemon of pokemons) {
      if (pokemon.name.toLowerCase().includes(value!)) {
        let content: HTMLElement | null = document.querySelector('#content')
        new pokemonComponent(pokemon, content!).renderAfterSearch();
      }
      // else if(valueCheck==Number)
    }
  }
}

window.onload = () => {
  renderIt();
  const searchButton = document.getElementsByClassName('searchButton')[0];
  searchButton!.addEventListener('click', search)
}


