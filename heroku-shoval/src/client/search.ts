import { removeAllDivs , pokemons } from './app'
import { pokemonComponent } from './pokemonComp';
import { popupAfterSearch } from './popUp'

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
      
    } else if (Number(value)) {
      let pokemon:any;
        try {
          let pokemonsData = await(await fetch(`/pokemonId${value}`)).url; 
          let response = await fetch(pokemonsData);
          pokemonInArray = await response.json();
          if (pokemonInArray.length === 0) {noPokemon()}
          else {
            pokemonInArray.forEach((pok: any) => pokemon = pok)
          }
        } catch (error) {
          console.error(error);
        }
        const content: HTMLElement | null = document.querySelector('#content');
        new pokemonComponent(pokemon, content!).renderAfterSearch();
  
    } else {
      let pokemon:any;
        try {
          let pokemonsData = await(await fetch(`/pokemonName${value}`)).url; 
          let response = await fetch(pokemonsData);
          pokemonInArray = await response.json();
          console.log(pokemonInArray)
          if (pokemonInArray.length === 0) {noPokemon()}
          else {
            pokemonInArray.forEach((pok: any) => pokemon = pok)
          }
        } catch (error) {
          console.error(error);
        }
        const content: HTMLElement | null = document.querySelector('#content');
        new pokemonComponent(pokemon, content!).renderAfterSearch();
    }
    const divsAfterSearch = document.querySelectorAll('.img');
    for (let i = 0; i < divsAfterSearch.length; i++) {
      const divAfterSearch = divsAfterSearch[i];
      divAfterSearch.addEventListener('click', popupAfterSearch);
    }
  }