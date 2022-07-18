var app;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/tsc/client/app.js":
/*!********************************!*\
  !*** ./dist/tsc/client/app.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeAllDivs = exports.getFavorite = exports.pagination = exports.renderIt = exports.getApi = exports.favorites = exports.favoriteList = exports.pokemons = void 0;
const pokemonComp_1 = __webpack_require__(/*! ./pokemonComp */ "./dist/tsc/client/pokemonComp.js");
const popUp_1 = __webpack_require__(/*! ./popUp */ "./dist/tsc/client/popUp.js");
const favorite_1 = __webpack_require__(/*! ./favorite */ "./dist/tsc/client/favorite.js");
const search_1 = __webpack_require__(/*! ./search */ "./dist/tsc/client/search.js");
exports.pokemons = [];
exports.favoriteList = [];
exports.favorites = [];
// Gets the data from the website.
async function getApi() {
    try {
        const pokemonsData = await fetch('/pokemonsData0');
        await pokemonsData.json().then(res => exports.pokemons = res);
    }
    catch (error) {
        console.error(error);
    }
}
exports.getApi = getApi;
// Render the pokemons.
async function renderIt() {
    await getApi();
    const content = document.querySelector('#content2');
    exports.pokemons.forEach(pokemon => new pokemonComp_1.pokemonComponent(pokemon, content).render());
    const divsAfterSearch = document.querySelectorAll('.img');
    for (let i = 0; i < divsAfterSearch.length; i++) {
        const divAfterSearch = divsAfterSearch[i];
        divAfterSearch.addEventListener('click', popUp_1.popup);
    }
    const favoriteButton = document.querySelectorAll('.fa.fa-star');
    for (let i = 0; i < favoriteButton.length; i++) {
        const favorite = favoriteButton[i];
        favorite.addEventListener('click', favorite_1.addToFavorite);
    }
    await getFavorite();
    for (const pokemon of exports.pokemons) {
        for (const favorite of exports.favorites) {
            if (pokemon.id == favorite.id) {
                const starImages = document.querySelectorAll('.starImage');
                for (let j = 0; j < starImages.length; j++) {
                    const starImage = starImages[j];
                    if (starImage.id == pokemon.id) {
                        starImage.style.opacity = '1';
                    }
                }
            }
        }
    }
}
exports.renderIt = renderIt;
// Search for some pokemon by name
async function pagination() {
    const paginationButtons = document.getElementsByClassName('butttonPagination');
    for (let i = 0; i < paginationButtons.length; i++) {
        const button = paginationButtons[i];
        button.style.background = '#ddd';
        button.addEventListener('click', async () => {
            const number = Number(button.innerHTML);
            try {
                const pokemonsData = await fetch(`/pokemonsData${number * 40 - 40}`);
                await pokemonsData.json().then(res => exports.pokemons = res);
            }
            catch (error) {
                console.error(error);
            }
            removeAllDivs();
            const content = document.querySelector('#content2');
            exports.pokemons.forEach(pokemon => new pokemonComp_1.pokemonComponent(pokemon, content).render());
            pagination();
            button.style.background = 'rgb(86, 207, 167)';
            const itemDivs = document.querySelectorAll('.img');
            for (let i = 0; i < itemDivs.length; i++) {
                const itemDiv = itemDivs[i];
                itemDiv.addEventListener('click', popUp_1.popup);
            }
        });
    }
    const favoriteButton = document.querySelectorAll('.fa.fa-star');
    for (let i = 0; i < favoriteButton.length; i++) {
        const favorite = favoriteButton[i];
        favorite.addEventListener('click', favorite_1.addToFavorite);
    }
    await getFavorite();
    for (const pokemon of exports.pokemons) {
        for (const favorite of exports.favorites) {
            if (pokemon.id == favorite.id) {
                const starImages = document.querySelectorAll('.starImage');
                for (let j = 0; j < starImages.length; j++) {
                    const starImage = starImages[j];
                    if (starImage.id == pokemon.id) {
                        starImage.style.opacity = '1';
                    }
                }
            }
        }
    }
}
exports.pagination = pagination;
async function getFavorite() {
    try {
        const pokemonsData = await fetch('/favoriteList');
        await pokemonsData.json().then(res => exports.favorites = res);
    }
    catch (error) {
        console.error(error);
    }
}
exports.getFavorite = getFavorite;
async function renderFavorites() {
    await getFavorite();
    removeAllDivs();
    const content = document.querySelector('#content');
    exports.favorites.forEach(pokemon => new pokemonComp_1.pokemonComponent(pokemon, content).renderAfterSearch());
    for (const favorite of exports.favorites) {
        const starImages = document.querySelectorAll('.starImage');
        for (let j = 0; j < starImages.length; j++) {
            const starImage = starImages[j];
            if (starImage.id == favorite.id) {
                starImage.style.opacity = '1';
            }
        }
    }
}
// Removes all the elements.
function removeAllDivs() {
    const message = document.querySelector('#content3');
    message.style.display = 'none';
    const pokemonsDivBeforeSearch = document.querySelectorAll('.pokemonElement');
    pokemonsDivBeforeSearch.forEach(pokemonDiv => {
        pokemonDiv.remove();
    });
    const pokemonsDivAfterSearch = document.querySelectorAll('.item');
    pokemonsDivAfterSearch.forEach(pokemonDiv => {
        pokemonDiv.remove();
    });
}
exports.removeAllDivs = removeAllDivs;
// Renders all the pokemons.
async function backToMainPage() {
    removeAllDivs();
    const content = document.querySelector('#content2');
    exports.pokemons.forEach(pokemon => new pokemonComp_1.pokemonComponent(pokemon, content).render());
    const itemDivs = document.querySelectorAll('.img');
    for (let i = 0; i < itemDivs.length; i++) {
        const itemDiv = itemDivs[i];
        itemDiv.addEventListener('click', popUp_1.popup);
    }
    getFavorite();
    for (const pokemon of exports.pokemons) {
        for (const favorite of exports.favorites) {
            if (pokemon.id == favorite.id) {
                const starImages = document.querySelectorAll('.starImage');
                for (let j = 0; j < starImages.length; j++) {
                    const starImage = starImages[j];
                    if (starImage.id == pokemon.id) {
                        starImage.style.opacity = '1';
                    }
                }
            }
        }
    }
    const favoriteButton = document.querySelectorAll('.fa.fa-star');
    for (let i = 0; i < favoriteButton.length; i++) {
        const favorite = favoriteButton[i];
        favorite.addEventListener('click', favorite_1.addToFavorite);
    }
}
window.onload = () => {
    renderIt();
    const searchButton = document.getElementsByClassName('searchButton')[0];
    searchButton.addEventListener('click', search_1.search);
    const pokemonList = document.getElementById('mainPage');
    pokemonList.addEventListener('click', backToMainPage);
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.addEventListener('click', renderFavorites);
    pagination();
    const paginationFirstButton = document.getElementsByClassName('butttonPagination')[1];
    paginationFirstButton.style.background = 'rgb(86, 207, 167)';
};


/***/ }),

/***/ "./dist/tsc/client/favorite.js":
/*!*************************************!*\
  !*** ./dist/tsc/client/favorite.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addToFavoriteAfterSearch = exports.addToFavorite = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./dist/tsc/client/app.js");
const search_1 = __webpack_require__(/*! ./search */ "./dist/tsc/client/search.js");
async function addToFavorite(event) {
    const id = event.target.id;
    for (const pokemon of app_1.pokemons) {
        if (pokemon.id == id) {
            const items = document.querySelectorAll('.backgroundImg');
            for (let i = 0; i < items.length; i++) {
                const itemDiv = items[i];
                if (itemDiv.id == id) {
                    const starImages = document.querySelectorAll('.starImage');
                    for (let j = 0; j < starImages.length; j++) {
                        const starImage = starImages[j];
                        if (starImage.id == id) {
                            if (starImage.style.opacity === '1') {
                                starImage.style.opacity = '0';
                                const index = app_1.favoriteList.indexOf(pokemon);
                                if (index === undefined)
                                    return;
                                app_1.favoriteList.splice(index, 1);
                                const options = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(pokemon)
                                };
                                fetch('deleteFavorite', options);
                            }
                            else {
                                starImage.style.opacity = '1';
                                app_1.favoriteList.push(pokemon);
                                const options = {
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
exports.addToFavorite = addToFavorite;
async function addToFavoriteAfterSearch(event) {
    const id = event.target.id;
    for (const pokemon of search_1.pokemonInArray) {
        if (pokemon.id == id) {
            const items = document.querySelectorAll('.backgroundImg');
            for (let i = 0; i < items.length; i++) {
                const itemDiv = items[i];
                if (itemDiv.id == id) {
                    const starImages = document.querySelectorAll('.starImage');
                    for (let j = 0; j < starImages.length; j++) {
                        const starImage = starImages[j];
                        if (starImage.id == id) {
                            if (starImage.style.opacity === '1') {
                                starImage.style.opacity = '0';
                                const index = app_1.favoriteList.indexOf(pokemon);
                                if (index === undefined)
                                    return;
                                app_1.favoriteList.splice(index, 1);
                                const options = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(pokemon)
                                };
                                fetch('deleteFavorite', options);
                            }
                            else {
                                starImage.style.opacity = '1';
                                app_1.favoriteList.push(pokemon);
                                const options = {
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
exports.addToFavoriteAfterSearch = addToFavoriteAfterSearch;


/***/ }),

/***/ "./dist/tsc/client/pokemonComp.js":
/*!****************************************!*\
  !*** ./dist/tsc/client/pokemonComp.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


// import { getApi,pokimons} from "./app.js";
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pokemonComponent = void 0;
class pokemonComponent {
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    // Renders the pokemons to the page.
    render() {
        const parent = this.parent;
        const pokemonElement = document.createElement('div');
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
        const item = document.createElement('div');
        parent.appendChild(item);
        const typesName = [];
        for (let i = 0; i < this.data.types.length; i++) {
            const type = this.data.types[i].type;
            const name = type.name;
            typesName.push(' ' + name);
        }
        const abilitiesName = [];
        for (let i = 0; i < this.data.abilities.length; i++) {
            const ability = this.data.abilities[i].ability;
            const name = ability.name;
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
exports.pokemonComponent = pokemonComponent;


/***/ }),

/***/ "./dist/tsc/client/popUp.js":
/*!**********************************!*\
  !*** ./dist/tsc/client/popUp.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.popupAfterSearch = exports.popup = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./dist/tsc/client/app.js");
const search_1 = __webpack_require__(/*! ./search */ "./dist/tsc/client/search.js");
// Popop information for the chosen pokemon.
function popup(event) {
    const currentPokemon = event.target.id;
    const popupContainer = document.querySelector('.popupContainer');
    popupContainer.style.display = 'block';
    for (const pokemon of app_1.pokemons) {
        if (pokemon.id == currentPokemon) {
            const typesName = [];
            for (let i = 0; i < pokemon.types.length; i++) {
                const type = pokemon.types[i].type;
                const name = type.name;
                typesName.push(' ' + name);
            }
            const abilitiesName = [];
            for (let i = 0; i < pokemon.abilities.length; i++) {
                const ability = pokemon.abilities[i].ability;
                const name = ability.name;
                abilitiesName.push(' ' + name);
            }
            const stats = [];
            for (let i = 0; i < pokemon.stats.length; i++) {
                const stat = pokemon.stats[i].stat.name;
                const statLevel = pokemon.stats[i].effort;
                stats.push(`${stat}:${statLevel}`);
            }
            const popup = document.createElement('div');
            popup.className = 'popup';
            popupContainer?.appendChild(popup);
            popup.innerHTML = `
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
                closePopup.addEventListener('click', () => {
                    popupContainer.style.display = 'none';
                    popup.remove();
                });
            }
            popupContainer?.addEventListener('click', () => {
                popupContainer.style.display = 'none';
                popup.remove();
            });
        }
    }
}
exports.popup = popup;
// Popop information for the chosen pokemon.
function popupAfterSearch(event) {
    const currentPokemon = event.target.id;
    const popupContainer = document.querySelector('.popupContainer');
    popupContainer.style.display = 'block';
    for (const pokemon of search_1.pokemonInArray) {
        if (pokemon.id == currentPokemon) {
            const typesName = [];
            for (let i = 0; i < pokemon.types.length; i++) {
                const type = pokemon.types[i].type;
                const name = type.name;
                typesName.push(' ' + name);
            }
            const abilitiesName = [];
            for (let i = 0; i < pokemon.abilities.length; i++) {
                const ability = pokemon.abilities[i].ability;
                const name = ability.name;
                abilitiesName.push(' ' + name);
            }
            const stats = [];
            for (let i = 0; i < pokemon.stats.length; i++) {
                const stat = pokemon.stats[i].stat.name;
                const statLevel = pokemon.stats[i].effort;
                stats.push(`${stat}:${statLevel}`);
            }
            const popup = document.createElement('div');
            popup.className = 'popup';
            popupContainer?.appendChild(popup);
            popup.innerHTML = `
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
                closePopup.addEventListener('click', () => {
                    popupContainer.style.display = 'none';
                    popup.remove();
                });
            }
            popupContainer?.addEventListener('click', () => {
                popupContainer.style.display = 'none';
                popup.remove();
            });
        }
    }
}
exports.popupAfterSearch = popupAfterSearch;


/***/ }),

/***/ "./dist/tsc/client/search.js":
/*!***********************************!*\
  !*** ./dist/tsc/client/search.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.search = exports.pokemonInArray = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./dist/tsc/client/app.js");
const pokemonComp_1 = __webpack_require__(/*! ./pokemonComp */ "./dist/tsc/client/pokemonComp.js");
const popUp_1 = __webpack_require__(/*! ./popUp */ "./dist/tsc/client/popUp.js");
const favorite_1 = __webpack_require__(/*! ./favorite */ "./dist/tsc/client/favorite.js");
function noPokemon() {
    const content = document.querySelector('#content3');
    content.style.display = 'block';
}
exports.pokemonInArray = [];
// Search for some pokemon by name
async function search() {
    (0, app_1.removeAllDivs)();
    const search = document.querySelector('.search');
    const value = search?.value.toLowerCase();
    if (value === '') {
        const content = document.querySelector('#content2');
        app_1.pokemons.forEach(pokemon => new pokemonComp_1.pokemonComponent(pokemon, content).render());
        exports.pokemonInArray = app_1.pokemons;
    }
    else if (Number(value)) {
        let pokemon;
        try {
            const pokemonsData = await fetch(`/pokemonId${value}`);
            await pokemonsData.json().then(res => exports.pokemonInArray = res);
            if (exports.pokemonInArray.length === 0) {
                noPokemon();
            }
            else {
                exports.pokemonInArray.forEach((pok) => pokemon = pok);
            }
        }
        catch (error) {
            console.error(error);
        }
        const content = document.querySelector('#content');
        new pokemonComp_1.pokemonComponent(pokemon, content).renderAfterSearch();
    }
    else {
        try {
            const pokemonsData = await fetch(`/pokemonName${value}`);
            await pokemonsData.json().then(res => exports.pokemonInArray = res);
            if (exports.pokemonInArray.length === 0) {
                noPokemon();
            }
        }
        catch (error) {
            console.error(error);
        }
        const content = document.querySelector('#content');
        exports.pokemonInArray.forEach((pokemon) => new pokemonComp_1.pokemonComponent(pokemon, content).renderAfterSearch());
    }
    const divsAfterSearch = document.querySelectorAll('.img');
    for (let i = 0; i < divsAfterSearch.length; i++) {
        const divAfterSearch = divsAfterSearch[i];
        divAfterSearch.addEventListener('click', popUp_1.popupAfterSearch);
    }
    const favoriteButton = document.querySelectorAll('.fa.fa-star');
    for (let i = 0; i < favoriteButton.length; i++) {
        const favorite = favoriteButton[i];
        favorite.addEventListener('click', favorite_1.addToFavoriteAfterSearch);
    }
    await (0, app_1.getFavorite)();
    for (const pokemon of exports.pokemonInArray) {
        for (const favorite of app_1.favorites) {
            if (pokemon.id == favorite.id) {
                const starImages = document.querySelectorAll('.starImage');
                for (let j = 0; j < starImages.length; j++) {
                    const starImage = starImages[j];
                    if (starImage.id == pokemon.id) {
                        starImage.style.opacity = '1';
                    }
                }
            }
        }
    }
}
exports.search = search;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/tsc/client/app.js");
/******/ 	app = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map