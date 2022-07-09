// import { getApi,pokimons} from "./app.js";

export interface Pokemon {
  sprites: any;
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: any[];
  types: any[];
}
export class pokemonComponent {
  data: Pokemon;
  parent: HTMLElement;
  constructor(data: Pokemon, parent: HTMLElement) {
    this.data = data;
    this.parent = parent;
  }

  // Renders the pokemons to the page.
  render() {
    const parent = this.parent;
    const pokemonElement: HTMLDivElement = document.createElement('div');
    parent.appendChild(pokemonElement);
    pokemonElement.innerHTML = `
    <div class ='backgroundImg' id ="${this.data.id}">
   
  <i  id="${this.data.id}" class="fa fa-star" aria-hidden="true"></i>
    <img class ='img' id ="${this.data.id}" src=' ${this.data.sprites.other.dream_world.front_default}'>
    </div>
    <div class="title" id='${this.data.id}'>
    <h1 class="name" id ="${this.data.id}"> ${this.data.name}</h1>
    <h3 class="id" id ="${this.data.id}"> id: ${this.data.id}</h3>
    </div>
      `;
    pokemonElement.classList.add('pokemonElement');

    pokemonElement.id = `${this.data.id}`;
  }

  // Renders the pokemons after searce with the information about them.
  renderAfterSearch() {
    const parent = this.parent;
    const item: HTMLDivElement = document.createElement('div');
    parent.appendChild(item);
    const typesName: any[] = [];
    for (let i = 0; i < this.data.types.length; i++) {
      const type = this.data.types[i].type;
      const name: string = type.name;
      typesName.push(' ' + name);
    }
    const abilitiesName: any[] = [];
    for (let i = 0; i < this.data.abilities.length; i++) {
      const ability = this.data.abilities[i].ability;
      const name: string = ability.name;
      abilitiesName.push(' ' + name);
    }
    item.innerHTML = `
    <div class ='backgroundImg' id ="${this.data.id}">
    <img class ='img' id ="${this.data.id}" src=' ${this.data.sprites.other.dream_world.front_default}'>
    
  <i  id="${this.data.id}" class="fa fa-star" aria-hidden="true"></i>
    </div>
    <div class="title" id ="${this.data.id}" style.font-family:"KoHo", sans-serif;>
    <h1 class="name" id ="${this.data.id}"> ${this.data.name}</h1>
    </div>
    <div class='info' id ="${this.data.id}" style.font-family:"KoHo", sans-serif>
    <h3 class="id" id ="${this.data.id}"> id: ${this.data.id} </h3>
      <h3 class="weight" id ="${this.data.id}"> weight: ${this.data.weight / 10} kg </h3>
      <h3 class="height" id ="${this.data.id}"> height: ${this.data.height / 10} m</h3>
      <h3 class="abilities" id ="${this.data.id}"> abilities: ${abilitiesName}</h3>
      <h3 class="types" id ="${this.data.id}"> types: ${typesName}</h3>
    </div>
      `;
    item.classList.add('item');
    item.id = `${this.data.id}`;
  }

}
