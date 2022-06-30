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
  data: Pokemon
  parent: HTMLElement
  constructor(data: Pokemon, parent: HTMLElement) {
    this.data = data;
    this.parent = parent;
    data.weight=data.weight/10;
    data.height=data.height/10;
  }
  render() {
    let parent = this.parent;
    const item: HTMLDivElement = document.createElement('div');
    parent.appendChild(item);

    let typesName: any[] = [];
    for (let i = 0; i < this.data.types.length; i++) {
      const type = this.data.types[i].type;
      let name: string = type.name;
      typesName.push(' ' + name);
    }
    let abilitiesName: any[] = [];
    for (let i = 0; i < this.data.abilities.length; i++) {
      const ability = this.data.abilities[i].ability;
      let name: string = ability.name;
      abilitiesName.push(' ' + name);
    }
    item.innerHTML = `
    <img class ='img' src=' ${this.data.sprites.front_default}'>
    <h1 class="name"> name: ${this.data.name}</h1>
    <h3 class="id"> id: ${this.data.id}</h3>
      <h3 class="weight"> weight: ${this.data.weight} kg </h3>
      <h3 class="height"> height: ${this.data.height} m</h3>
      <h3 class="abilities"> abilities: ${abilitiesName}</h3>
      <h3 class="types"> types: ${typesName}</h3>
      </div></div>
      `;
    item.classList.add('laptop');
  }

}
