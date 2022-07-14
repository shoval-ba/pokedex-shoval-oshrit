import { pokemons } from './app'

// Add
function addToFavorite(event: any) {
    const pokemonId = event?.target.id;
    // let pokemon =exports.pokemons[pokemonId];
    pokemons[pokemonId-1];
  }
  