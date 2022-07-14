import { removeAllDivs , pokemons } from './app'
import { pokemonComponent } from './pokemonComp';
import { popup } from './popUp'

// Search for some pokemon by name
export function search() {
    removeAllDivs();
    const search: HTMLInputElement | null = document.querySelector('.search');
    const value = search?.value.toLowerCase();
  
    if (value === '') {
      const content: HTMLElement | null = document.querySelector('#content2');
      pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  
    } else if (Number(value)) {
      for (const pokemon of pokemons) {
        if (pokemon.id == Number(value)!) {
          const content: HTMLElement | null = document.querySelector('#content');
          new pokemonComponent(pokemon, content!).renderAfterSearch();
        }
      }
  
    } else {
      for (const pokemon of pokemons) {
        if (pokemon.name.toLowerCase().includes(value!)) {
          const content: HTMLElement | null = document.querySelector('#content');
          new pokemonComponent(pokemon, content!).renderAfterSearch();
        }
      }
    }
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