// import { getApi,pokimons} from "./app.js";


export interface Pokemon{
  img:string;
  id:number;
  name:string;
  weight:number;
  height:number;
  abilities:string[];
  types:string[];
} 
export class pokemonComponent{
  data:Pokemon
  parent:HTMLElement
  constructor(data:Pokemon,parent:HTMLElement){
    this.data=data;
    this.parent=parent;
  }
  render() {
    let parent = this.parent;
    const item: HTMLDivElement = document.createElement('div');
    parent.appendChild(item)
    item.innerHTML =`
      <img class="img" src="${this.data.img}">
      <h3 class="name">${this.data.name}</h3>
      <h3 class="name">${this.data.id}</h3>
      <h3 class="name">${this.data.weight}</h3>
      <h3 class="name">${this.data.height}</h3>
      // <h3 class="name">${this.data.abilities}</h3>
      // <h3 class="name">${this.data.types[0]}</h3>
      </div></div>
      `;
    item.classList.add('laptop');
  }  
  
}
  