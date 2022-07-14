import { removeAllDivs , pokemons } from './app'
import { popup } from './popUp'
import { pokemonComponent } from './pokemonComp';

// Search for some pokemon by name
export function pagination() {
    const paginationButtons = document.getElementsByClassName('butttonPagination');
    for (let i = 0; i < paginationButtons.length; i++) {
      const button = paginationButtons[i] as HTMLButtonElement;
      button.style.background = '#ddd';
      button.addEventListener('click', () => {
        for (let j = 1; j < 9; j++) {
          if (button.innerHTML == j.toString()) {
            removeAllDivs();
            const pokemons20 = pokemons.filter(pokemon => pokemon.id <= j * 20 && pokemon.id > j * 20 - 20);
            const content: HTMLElement | null = document.querySelector('#content2');
            pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
            const itemDivs = document.querySelectorAll('.img');
            pagination();
            button.style.background = 'rgb(86, 207, 167)';
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
        }
      });
    }
  }