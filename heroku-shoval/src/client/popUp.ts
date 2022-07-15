import { pokemons } from './app'
import { pokemonInArray } from './search'

// Popop information for the chosen pokemon.
export function popup(event: any) {
    const currentPokemon = event.target.id;
    const popupContainer: HTMLElement | null = document.querySelector('.popupContainer');
    popupContainer!.style.display = 'block';
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
        const popup = document.createElement('div');
        popup.className = 'popup';
        popupContainer?.appendChild(popup);
        popup!.innerHTML = `
        <div class="closeContainer">
        <button class="closeContainer">
          <img class="close" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png" alt="Snow">
        </button>
        </div>
        <h1>${pokemon.name}  #${pokemon.id}</h1>
        <div class='imgPopupContainer'>
  '      <img class ='imgPopup' src=' ${pokemon.img}'></div>
          <h3 class="weightpopup"> weight: ${pokemon.weight} kg </h3>
          <h3 class="heightpopup"> height: ${pokemon.height} m</h3>
          <h3 class="abilitiesPopup"> abilities: ${abilitiesName}</h3>
          <h3 class="typesPopup"> types: ${typesName}</h3>
          <h3 class="statsPopup"> types: ${stats}</h3>
        `;
        const closePopups = document.querySelectorAll('.close');
        for (let i = 0; i < closePopups.length; i++) {
          const closePopup = closePopups[i];
          closePopup!.addEventListener('click', () => {
            popupContainer!.style.display = 'none';
            popup.remove();
          });
        }
        popupContainer?.addEventListener('click', () => {
          popupContainer!.style.display = 'none';
          popup.remove();
  
        });
      }
    }
  }

  // Popop information for the chosen pokemon.
export function popupAfterSearch(event: any) {
  const currentPokemon = event.target.id;
  const popupContainer: HTMLElement | null = document.querySelector('.popupContainer');
  popupContainer!.style.display = 'block';
  for (const pokemon of pokemonInArray) {
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
      const popup = document.createElement('div');
      popup.className = 'popup';
      popupContainer?.appendChild(popup);
      popup!.innerHTML = `
      <div class="closeContainer">
      <button class="closeContainer">
        <img class="close" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png" alt="Snow">
      </button>
      </div>
      <h1>${pokemon.name}  #${pokemon.id}</h1>
      <div class='imgPopupContainer'>
'      <img class ='imgPopup' src=' ${pokemon.img}'></div>
        <h3 class="weightpopup"> weight: ${pokemon.weight} kg </h3>
        <h3 class="heightpopup"> height: ${pokemon.height} m</h3>
        <h3 class="abilitiesPopup"> abilities: ${abilitiesName}</h3>
        <h3 class="typesPopup"> types: ${typesName}</h3>
        <h3 class="statsPopup"> types: ${stats}</h3>
      `;
      const closePopups = document.querySelectorAll('.close');
      for (let i = 0; i < closePopups.length; i++) {
        const closePopup = closePopups[i];
        closePopup!.addEventListener('click', () => {
          popupContainer!.style.display = 'none';
          popup.remove();
        });
      }
      popupContainer?.addEventListener('click', () => {
        popupContainer!.style.display = 'none';
        popup.remove();

      });
    }
  }
}

