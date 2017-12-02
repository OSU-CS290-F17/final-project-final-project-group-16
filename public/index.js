var allGames = [];

function insertNewGame(gameTitle, boxArt, price) {

  var gameTemplateArgs = {

      gameTitle: gameTitle,
      boxArt: boxArt,
      price: price  
  
  };
  
  var gameHTML = Handlebars.templates.gameTemplate(gameTemplateArgs);
  console.log("== gameHTML:", gameHTML);
  
  return gameHTML;



function handleModalAcceptClick() {

  var gameTitle = document.getElementById('game-text-input').value.trim();
  var boxArt = document.getElementById('game-photo-input').value.trim();
  var price = document.getElementById('game-price-input').value.trim();

  if (!gameTitle || !boxArt || !price) {
    alert("You must fill in all of the fields!");
  } else {

    allGames.push({
      gameTitle: gameTitle,
      boxArt: boxArt,
      price: price
    });

    clearFiltersAndReinsertGames();

    hideSellSomethingModal();

  }

}

function parseGameElem(gameElem) {

  var game = {
    price: gameElem.getAttribute('data-price'),
  
  };

  var gameImageElem = gameElem.querySelector('.game-image-container img');
  game.boxArt = gameImageElem.src;
  game.gameTitle = gameImageElem.alt;

  return game;

}
  
function clearFiltersAndReinsertGames() {

  document.getElementById('filter-text').value = "";
  document.getElementById('filter-min-price').value = "";
  document.getElementById('filter-max-price').value = "";

  doFilterUpdate();

}

function doFilterUpdate() {

  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    minPrice: document.getElementById('filter-min-price').value,
    maxPrice: document.getElementById('filter-max-price').value
   
  }

  var gameContainer = document.getElementById('games');
  while(gameContainer.lastChild) {
    gameContainer.removeChild(gameContainer.lastChild);
  }

  allGames.forEach(function (game) {
    if (gamePassesFilters(game, filters)) {
      insertNewGame(game.gameTitle, game.boxArt, game.price);
    }
  });

}
  
function gamePassesFilters(game, filters) {

  if (filters.text) {
    var postDescription = post.description.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postDescription.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minPrice) {
    var filterMinPrice = Number(filters.minPrice);
    if (Number(post.price) < filterMinPrice) {
      return false;
    }
  }

  if (filters.maxPrice) {
    var filterMaxPrice = Number(filters.maxPrice);
    if (Number(post.price) > filterMaxPrice) {
      return false;
    }
  }

  return true;

}

function showSellGameModal() {

  var showGameModal = document.getElementById('sell-game-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showGameModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}

function clearSellGameModalInputs() {

  var gameTextInputElements = [
    document.getElementById('game-text-input'),
    document.getElementById('game-photo-input'),
    document.getElementById('game-price-input')
  ];

  gameTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

}

function hideSellGameModal() {

  var showGameModal = document.getElementById('sell-game-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showGameModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearSellGameModalInputs();

}

window.addEventListener('DOMContentLoaded', function () {

  var gameElems = document.getElementsByClassName('game');
  for (var i = 0; i < gameElems.length; i++) {
    allGames.push(parseGameElem(gameElems[i]));
  }

  var sellGameButton = document.getElementById('sell-game-button');
  if (sellGameButton) {
    sellGameButton.addEventListener('click', showSellGameModal);
  }

  var modalAcceptButton = document.getElementById('modal-accept');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideSellSomethingModal);
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
  if (filterUpdateButton) {
    filterUpdateButton.addEventListener('click', doFilterUpdate)
  }

});
