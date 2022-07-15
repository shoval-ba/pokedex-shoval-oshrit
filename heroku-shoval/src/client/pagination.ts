// import { removeAllDivs , pokemons} from './app'
// import { popup } from './popUp'
// import { pokemonComponent } from './pokemonComp';


// // Search for some pokemon by name
// export async function pagination() {
//     const paginationButtons = document.getElementsByClassName('butttonPagination');
//     for (let i = 0; i < paginationButtons.length; i++) {
//       const button = paginationButtons[i] as HTMLButtonElement;
//       button.style.background = '#ddd';
//       button.addEventListener('click', async () => {
//         let number = Number(button.innerHTML)
//             try {
//               let pokemonsData = await(await fetch(`/pokemonsData${number*40-40}`)).url; 
//               let response = await fetch(pokemonsData);
//               pokemons = await response.json();
//             } catch (error) {
//               console.error(error);
//             }
//             removeAllDivs();
//             const content: HTMLElement | null = document.querySelector('#content2');
//             pokemons.forEach(pokemon => new pokemonComponent(pokemon, content!).render());
//             pagination(); 
//             button.style.background = 'rgb(86, 207, 167)';
//             const itemDivs = document.querySelectorAll('.img');
//             for (let i = 0; i < itemDivs.length; i++) {
//               const itemDiv = itemDivs[i];
//               itemDiv.addEventListener('click', popup);
//             }
//       });
//     }
//   }