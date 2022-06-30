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
    data.weight = data.weight ;
    data.height = data.height;
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
    <div class ='backgroundImg'>
    <img class ='img' src=' ${this.data.sprites.other.dream_world.front_default}'>
    </div>
    <div class="title">
    <h1 class="name"> ${this.data.name}</h1>
    </div>
    <div class='info'>
    <h3 class="id"> id: ${this.data.id}</h3>
      <h3 class="weight"> weight: ${this.data.weight/10} kg </h3>
      <h3 class="height"> height: ${this.data.height/10} m</h3>
      <h3 class="abilities"> abilities: ${abilitiesName}</h3>
      <h3 class="types"> types: ${typesName}</h3>
    </div>
      `;
    item.classList.add('item');
  }

}
