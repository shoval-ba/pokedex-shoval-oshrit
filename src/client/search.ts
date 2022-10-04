import { removeAllDivs, pokemons, renderTheStars, getFavorite} from './app';
import { pokemonComponent } from './pokemonComp';
import { popup } from './popUp';
import { addToFavorite } from './favorite';

function noPokemon(){
  const content: HTMLElement | null = document.querySelector('#content3');
  content!.style.display = 'block';
}

export let pokemonInArray:any[]=[];
// Search for some pokemon by name
export async function search() {
  removeAllDivs();
  const search: HTMLInputElement | null = document.querySelector('.search');
  const value = search?.value.toLowerCase();
  if (value === '') {
    const content: HTMLElement | null = document.querySelector('#content2');
    pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
    pokemonInArray=pokemons;

  } else if (Number(value)) {
    try {
      const pokemonsData = await fetch(`/pokemonId${value}`);
      await pokemonsData.json().then(res => pokemonInArray =res);
      if (pokemonInArray.length == 0) {
        noPokemon();
      }
    } catch (error) {
      console.error(error);
    }
    const content: HTMLElement | null = document.querySelector('#content');
    pokemonInArray.forEach((pokemon: any) => new pokemonComponent(pokemon, content!).renderAfterSearch());
  } else {
    try {
      const pokemonsData = await fetch(`/pokemonName${value}`);
      await pokemonsData.json().then(res => pokemonInArray =res);
      if (pokemonInArray.length === 0) {
        noPokemon();
      }
    } catch (error) {
      console.error(error);
    }
    const content: HTMLElement | null = document.querySelector('#content');
    pokemonInArray.forEach((pokemon: any) => new pokemonComponent(pokemon, content!).renderAfterSearch());
  }
  const divsAfterSearch = document.querySelectorAll('.img');
  for (let i = 0; i < divsAfterSearch.length; i++) {
    const divAfterSearch = divsAfterSearch[i];
    divAfterSearch.addEventListener('click', (event)=>{
      popup(event , pokemonInArray)});
  }

  const favoriteButton = document.querySelectorAll('.fa.fa-star');
  for (let i = 0; i < favoriteButton.length; i++) {
    const favorite = favoriteButton[i];
    favorite.addEventListener('click', (event)=>{
      addToFavorite(event , pokemonInArray)});
  }
  await getFavorite();
  renderTheStars(pokemonInArray)
}
