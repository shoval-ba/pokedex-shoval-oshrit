// import { getApi,pokimons} from "./app.js";

export interface Pokemon {
  name: string;
  id: number;
  img:string;
  weight: number;
  height: number;
  abilities: any[];
  types: any[];
  stats:any[]
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
    <img class ='starImage' id ="${this.data.id}" src="https://cdn-icons-png.flaticon.com/128/1040/1040230.png">
    <img class ='img' id ="${this.data.id}" src='${this.data.img}'>
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
      let types = JSON.parse(this.data.types[i])
      const name: string = types.type.name;
      typesName.push(' ' + name);
    }
    const abilitiesName: any[] = [];
    for (let i = 0; i < this.data.abilities.length; i++) {
      let abilities = JSON.parse(this.data.abilities[i])
      const name: string = abilities.ability.name;
      abilitiesName.push(' ' + name);
    }
    item.innerHTML = `
    <div class ='backgroundImg' id ="${this.data.id}">
    <i  id="${this.data.id}" class="fa fa-star" aria-hidden="true"></i>
    <img class ='starImage' id ="${this.data.id}" src="https://cdn-icons-png.flaticon.com/128/1040/1040230.png">
    <img class ='img' id ="${this.data.id}" src=' ${this.data.img}'> 
    </div>
    <div class="title" id ="${this.data.id}" style.font-family:"KoHo", sans-serif;>
    <h1 class="name" id ="${this.data.id}"> ${this.data.name}</h1>
    </div>
    <div class='info' id ="${this.data.id}" style.font-family:"KoHo", sans-serif>
    <h3 class="id" id ="${this.data.id}"> id: ${this.data.id} </h3>
      <h3 class="weight" id ="${this.data.id}"> weight: ${this.data.weight} kg </h3>
      <h3 class="height" id ="${this.data.id}"> height: ${this.data.height} m</h3>
      <h3 class="abilities" id ="${this.data.id}"> abilities: ${typesName}</h3>
      <h3 class="types" id ="${this.data.id}"> types: ${abilitiesName}</h3>
    </div>
      `;
    item.classList.add('item');
    item.id = `${this.data.id}`;
  }

}
