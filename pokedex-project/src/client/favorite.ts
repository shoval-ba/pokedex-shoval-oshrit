import { pokemons, favoriteList } from './app';
import { pokemonInArray } from './search';

export async function addToFavorite(event:any){
  const id = event.target.id;
  for (const pokemon of pokemons){
    if (pokemon.id == id){
      const items = document.querySelectorAll('.backgroundImg') ;
      for (let i = 0; i < items.length; i++) {
        const itemDiv = items[i];
        if (itemDiv.id == id){
          const starImages = document.querySelectorAll('.starImage');
          for (let j=0;j <starImages.length;j++){
            const starImage = starImages[j] as HTMLElement;
            if (starImage!.id == id){
              if (starImage!.style.opacity === '1'){
                  starImage!.style.opacity = '0';
                  const index:number = favoriteList.indexOf(pokemon);
                  if (index! === undefined) return;
                  favoriteList.splice(index, 1);
                  const options ={
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pokemon)
                  };
                  fetch('deleteFavorite', options);
              } else {
                  starImage!.style.opacity = '1';
                  favoriteList.push(pokemon);
                  const options ={
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pokemon)
                  };
                  fetch('addToFavorite', options);
              }
            }
          }
        }
      }
    }
  }
}

export async function addToFavoriteAfterSearch(event:any){
  const id = event.target.id;
  for (const pokemon of pokemonInArray){
    if (pokemon.id == id){
      const items = document.querySelectorAll('.backgroundImg') ;
      for (let i = 0; i < items.length; i++) {
        const itemDiv = items[i];
        if (itemDiv.id == id){
          const starImages = document.querySelectorAll('.starImage');
          for (let j=0;j <starImages.length;j++){
            const starImage = starImages[j] as HTMLElement;
            if (starImage!.id == id){
              if (starImage!.style.opacity == '1'){
                  starImage!.style.opacity = '0';
                  const index:number = favoriteList.indexOf(pokemon);
                  if (index! === undefined) return;
                  favoriteList.splice(index, 1);
                  const options ={
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pokemon)
                  };
                  fetch('deleteFavorite', options);
              } else {
                  starImage!.style.opacity = '1';
                  favoriteList.push(pokemon);
                  const options ={
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pokemon)
                  };
                  fetch('addToFavorite', options);
              }
            }
          }
        }
      }
    }
  }
}
