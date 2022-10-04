import { Pokemon } from './pokemonComp'

// Popop information for the chosen pokemon.
export function popup(event: any, pokemons: Pokemon[]) {
  const currentPokemon = event.target.id;
  const popupContainer: HTMLElement | null = document.querySelector('.popupContainer');
  popupContainer!.style.display = 'block';
  for (const pokemon of pokemons) {
    if (pokemon.id == currentPokemon!) {
      const typesName: any[] = [];
      for (let i = 0; i < pokemon.types.length; i++) {
        const types = JSON.parse(pokemon.types[i]);
        if (pokemon.id <= 10) {
          const name: string = types.type.name;
          typesName.push(' ' + name);
        } else {
          const name: string = types.ability.name;
          typesName.push(' ' + name);
        }
      }
      const abilitiesName: any[] = [];
      for (let i = 0; i < pokemon.abilities.length; i++) {
        const abilities = JSON.parse(pokemon.abilities[i]);
        if (pokemon.id <= 10) {
          const name: string = abilities.ability.name;
          abilitiesName.push(' ' + name);
        } else {
          const name: string = abilities.type.name;
          abilitiesName.push(' ' + name);
        }
      }
      const stats: any[] = [];
      for (let i = 0; i < pokemon.stats.length; i++) {
        const pokemonStats = JSON.parse(pokemon.stats[i]);
        const stat = pokemonStats.stat.name;
        const statLevel = pokemonStats.effort;
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
