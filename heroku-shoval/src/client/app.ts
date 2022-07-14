import { pokemonComponent } from './pokemonComp';
import { popup } from './popUp'
import { pagination } from './pagination'
import { search } from './search'

export let pokemons: any[] = [];

// Gets the data from the website.
export async function getApi() {
  try {
    let pokemonsData = await(await fetch('/pokemonsData')).url; 
    let response = await fetch(pokemonsData);
    pokemons = await response.json();
  } catch (error) {
    console.error(error);
  }
}


// Render the pokemons.
export async function renderIt() {
  await getApi();
  console.log(pokemons);
  const content: HTMLElement | null = document.querySelector('#content2');
  const pokemons20 = pokemons.filter(pokemon => pokemon.id <= 20);
  pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  const divsAfterSearch = document.querySelectorAll('.img');
  for (let i = 0; i < divsAfterSearch.length; i++) {
    const divAfterSearch = divsAfterSearch[i];
    divAfterSearch.addEventListener('click', popup);
  }

  // const favoriteButton = document.querySelectorAll('.fa.fa-star');
  // for (let i = 0; i < favoriteButton.length; i++) {
  //   const favorite = favoriteButton[i];
  //   favorite.addEventListener('click', addToFavorite);
  // }
}

// Removes all the elements.
export function removeAllDivs() {
  const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
  pokemonsDivBeforeSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const pokemonsDivAfterSearch = document.querySelectorAll('.item');
  pokemonsDivAfterSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
}

// Renders all the pokemons.
function backToMainPage() {
  removeAllDivs();
  const content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  const itemDivs = document.querySelectorAll('.img');
  for (let i = 0; i < itemDivs.length; i++) {
    const itemDiv = itemDivs[i];
    itemDiv.addEventListener('click', popup);
  }

  // const favoriteButton = document.querySelectorAll('.fa.fa-star');
  // for (let i = 0; i < favoriteButton.length; i++) {
  //   const favorite = favoriteButton[i];
  //   favorite.addEventListener('click', addToFavorite);
  // }
}

window.onload = () => {
  renderIt();
  const searchButton = document.getElementsByClassName('searchButton')[0];
  searchButton!.addEventListener('click', search);
  const pokemonList = document.getElementById('mainPage');
  pokemonList!.addEventListener('click', backToMainPage);
  pagination();
  const paginationFirstButton = document.getElementsByClassName('butttonPagination')[0] as HTMLElement;
  paginationFirstButton.style.background = 'rgb(86, 207, 167)';
};
