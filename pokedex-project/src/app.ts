import { Pokemon, pokemonComponent } from './pokemonComp';

const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const pokemons: any[] = [];

// Gets the data from the website.
export async function getApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (const pokemonData of data.results) {
      const pokemonUrl = pokemonData.url;
      const detailes = await fetch(pokemonUrl);
      const pokemon = await detailes.json();
      pokemons.push(pokemon);
    }
  } catch (error) {
    console.error(error);
  }
}

// Render the pokemons.
export async function renderIt() {
  await getApi(api_url);
  console.log(pokemons);
  const content: HTMLElement | null = document.querySelector('#content2');
  const pokemons20 = pokemons.filter(pokemon => pokemon.id <= 20);
  pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
  const itemDivs = document.querySelectorAll('.pokemonElement');
  for (let i = 0; i < itemDivs.length; i++) {
    const itemDiv = itemDivs[i];
    itemDiv.addEventListener('click', popup);
  }
}
function popup(event: any) {
  const currentPokemon = event.target.parentElement.id;

  removeAllDivs();
  const popupContainer: HTMLElement | null = document.querySelector('.popupContainer');
  popupContainer!.style.display = 'block';
  const content: HTMLElement | null = document.querySelector('#content2');
  for (const pokemon of pokemons) {
    if (pokemon.id == currentPokemon!) {
      const typesName: any[] = [];
      for (let i = 0; i < pokemon.types.length; i++) {
        const type = pokemon.types[i].type;
        const name: string = type.name;
        typesName.push(' ' + name);
      }
      const abilitiesName: any[] = [];
      for (let i = 0; i < pokemon.abilities.length; i++) {
        const ability = pokemon.abilities[i].ability;
        const name: string = ability.name;
        abilitiesName.push(' ' + name);
      }
      const stats: any[] = [];
      for (let i = 0; i < pokemon.stats.length; i++) {
        const stat = pokemon.stats[i].stat.name;
        const statLevel = pokemon.stats[i].effort;
        stats.push(`${stat}:${statLevel}`);
      }
      new pokemonComponent(pokemon, content!).render();
      let popup = document.createElement('div');
      popup.className = 'popup';
      popupContainer?.appendChild(popup);
      console.log(pokemon);
      popup!.innerHTML = `
      <div class="popup" >
      <h1>${pokemon.name}  #${pokemon.id}</h1>
      <div class='imgPopupContainer'>
'      <img class ='imgPopup' src=' ${pokemon.sprites.other.dream_world.front_default}'></div>
        <h3 class="weightpopup"> weight: ${pokemon.weight / 10} kg </h3>
        <h3 class="heightpopup"> height: ${pokemon.height / 10} m</h3>
        <h3 class="abilitiesPopup"> abilities: ${abilitiesName}</h3>
        <h3 class="typesPopup"> types: ${typesName}</h3>
        <h3 class="statsPopup"> types: ${stats}</h3>
        

      </div>
      `;
    }
  }

}
function pagination() {
  const paginationButtons = document.getElementsByClassName('butttonPagination');
  for (let i = 0; i < paginationButtons.length; i++) {
    const button = paginationButtons[i] as HTMLElement;
    button.addEventListener('click', () => {
      for (let j = 1; j < 9; j++) {
        if (button.innerHTML == j.toString()) {
          button.style.background = 'rgb(86, 207, 167)';
          removeAllDivs();
          const pokemons20 = pokemons.filter(pokemon => pokemon.id <= j * 20 && pokemon.id > j * 20 - 20);
          const content: HTMLElement | null = document.querySelector('#content2');
          pokemons20.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
          const itemDivs = document.querySelectorAll('.pokemonElement');
          for (let i = 0; i < itemDivs.length; i++) {
            const itemDiv = itemDivs[i];
            itemDiv.addEventListener('click', popup);
          }
        }
      }
    });
  }
}

function removeAllDivs() {
  const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
  pokemonsDivBeforeSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
  const pokemonsDivAfterSearch = document.querySelectorAll('.item');
  pokemonsDivAfterSearch.forEach(pokemonDiv => {
    pokemonDiv.remove();
  });
}

// Search for some pokemon by name
function search() {
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
}

function backToMainPage() {
  removeAllDivs();
  const content: HTMLElement | null = document.querySelector('#content2');
  pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
}

window.onload = () => {
  renderIt();
  const searchButton = document.getElementsByClassName('searchButton')[0];
  searchButton!.addEventListener('click', search);
  const pokemonList = document.getElementById('mainPage');
  pokemonList!.addEventListener('click', backToMainPage);
  pagination();
};

// function popup() {
//   console.log("object");
// }
