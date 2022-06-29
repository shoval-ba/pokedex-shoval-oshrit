
export class PokimonComponent {
    data:Laptop;
    parent:Element;
    static initialize: any;
    constructor(data:Laptop, parent:Element){
      this.data = data;
      this.parent = parent;
      this.initialize();
    }
  
    // Renders laptop to the DOM.
    initialize() {
      const all = this.parent;
      const item = document.createElement('div');
      item.className='item';
      all.appendChild(item);
      const priceInfo = document.createElement('div');
      priceInfo.classList.add('priceInfo');
      item?.appendChild(priceInfo);
      const div = document.createElement('div');
      priceInfo.appendChild(div);
      const imageLogo = document.createElement('img');
      imageLogo.src = this.data.companyLogo;
      imageLogo.className = 'imageLogo';
      priceInfo.appendChild(imageLogo);
      const priceText = document.createElement('h1');
      priceText.className ='priceText';
      priceText.innerText = this.data.price + this.data.currency;
      priceInfo.appendChild(priceText);
      const allInfo = document.createElement('div');
      allInfo.classList.add('allInfo');
      item?.appendChild(allInfo);
      const title = document.createElement('h1');
      title.classList.add('title');
      title.innerText = this.data.title;
      allInfo.appendChild(title);
      const info = document.createElement('p');
      info.className ='info';
      info.innerText = 'brand: ' + this.data.specs.brand + 
          ', type: ' + this.data.specs.type + 
          ', ram: ' + this.data.specs.ram +
          ', memory ' + this.data.specs.memory + 
          ', processor: ' + this.data.specs.processor + 
          ', resolution: ' + this.data.specs.resolution +
          ', screen size: ' + this.data.specs.screensize + 
          ', os: ' + this.data.specs.os;   
      allInfo?.appendChild(info);
      const image = document.createElement('img');
      image.src = this.data.img;
      image.className = 'image';
      item?.appendChild(image);
    }   
  }
  