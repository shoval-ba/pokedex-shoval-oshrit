import { removeAllDivs, pokemons, favorites, getFavorite} from './app';
import { pokemonComponent } from './pokemonComp';
import { popupAfterSearch } from './popUp';
import { addToFavoriteAfterSearch } from './favorite';

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
    pokemonInArray=pokemons

  } else if (Number(value)) {
    let pokemon:any;
    try {
      const pokemonsData = await fetch(`/pokemonId${value}`);
      await pokemonsData.json().then(res =>pokemon =res);
      if (pokemon.length == 0) {
        noPokemon();
      } else {    
        const content: HTMLElement | null = document.querySelector('#content');
        new pokemonComponent(pokemon, content!).renderAfterSearch();
      }
    } catch (error) {
      console.error(error);
    }

  } else {
    try {
      const pokemonsData = await fetch(`/pokemonName${value}`);
      await pokemonsData.json().then(res =>pokemonInArray =res)
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
    divAfterSearch.addEventListener('click', popupAfterSearch);
  }

  const favoriteButton = document.querySelectorAll('.fa.fa-star');
  for (let i = 0; i < favoriteButton.length; i++) {
    const favorite = favoriteButton[i];
    favorite.addEventListener('click', addToFavoriteAfterSearch);
  }
  await getFavorite();
  for (const pokemon of pokemonInArray){
    for (const favorite of favorites){
      if (pokemon.id == favorite.id){
        const starImages = document.querySelectorAll('.starImage');
        for (let j=0;j <starImages.length;j++){
          const starImage = starImages[j] as HTMLElement;
          if (starImage!.id == pokemon.id){
                starImage!.style.opacity = '1';
          }
        }
      }
    }
  }
}
