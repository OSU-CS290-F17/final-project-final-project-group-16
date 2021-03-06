
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

function showLibraryGameModal() {

  var showGameModal = document.getElementById('library-game-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showGameModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}

function clearLibraryGameModalInputs() {

  var gameTextInputElements = [
    document.getElementById('library-text-input'),
    document.getElementById('library-photo-input'),
    document.getElementById('library-price-input')
  ];

  gameTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

}

function hideLibraryGameModal() {

  var showGameModal = document.getElementById('library-game-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showGameModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearLibraryGameModalInputs();

}
/*
function createGameElement(gameTitle, boxArt, price) {

 
  var gameDiv = document.createElement('div');
  gameDiv.classList.add('game');
  gameDiv.setAttribute('data-price', price);

  
  var gameContentsDiv = document.createElement('div');
  gameContentsDiv.classList.add('game-contents');
  gameDiv.appendChild(gameContentsDiv);

 
  var gameImageContainerDiv = document.createElement('div');
  gameImageContainerDiv.classList.add('game-image-container');
  gameContentsDiv.appendChild(gameImageContainerDiv);
  

  var gameImg = document.createElement('img');
  gameImg.src = boxArt;
  gameImg.alt = gameTitle;
  gameImageContainerDiv.appendChild(gameImg);

 
  var gameInfoContainerDiv = document.createElement('div');
  gameInfoContainerDiv.classList.add('game-info-container');
  gameContentsDiv.appendChild(gameInfoContainerDiv);
  

  var gameLink = document.createElement('a');
  gameLink.classList.add('game-title');
  gameLink.href = '#';
  gameLink.textContent = gameTitle;
  gameInfoContainerDiv.appendChild(gameLink);
  

  var spaceText1 = document.createTextNode(' ');
  gameInfoContainerDiv.appendChild(spaceText1);

  
  var gamePriceSpan = document.createElement('span');
  gamePriceSpan.classList.add('game-price');
  gamePriceSpan.textContent = '$' + price;
  gameInfoContainerDiv.appendChild(gamePriceSpan);

  return gameDiv;

}
*/
function handleModalAcceptClick() {

  var gameTitle = document.getElementById('game-text-input').value.trim();
  var boxArt = document.getElementById('game-photo-input').value.trim();
  var price = document.getElementById('game-price-input').value.trim();

  if (!gameTitle || !boxArt || !price) {
    alert("You must fill in all of the fields!");
  } else {
    
    // create POST request
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST", "/sell")
    
    // create newGame object containing the newly-added game
    var newGame = {
        gameTitle: gameTitle,
        boxArt: boxArt,
        price: price
    }
    
    // make a JSON copy of newGame
    var newGameJSON = JSON.stringify(newGame)
    postRequest.setRequestHeader('Content-Type', 'application/json')
    
    // send newGame JSON to server
    postRequest.send(newGameJSON)
    hideSellGameModal();
	location.reload();
  }

}

function handleLibraryAddClick(){
	var gameTitle = document.getElementById('library-text-input').value.trim();
	var boxArt = document.getElementById('library-photo-input').value.trim();
	var price = document.getElementById('library-price-input').value.trim();

	if (!gameTitle || !boxArt || !price) {
		alert("You must fill in all of the fields!");
	} else {
    
		// create POST request
		var postRequest = new XMLHttpRequest()
		postRequest.open("POST", "/addToLibrary")
		
		// create newGame object containing the newly-added game
		var newGame = {
			gameTitle: gameTitle,
			boxArt: boxArt,
			price: price
		}
		
		// make a JSON copy of newGame
		var newGameJSON = JSON.stringify(newGame)
		postRequest.setRequestHeader('Content-Type', 'application/json')
		
		// send newGame JSON to server
		postRequest.send(newGameJSON)
		hideLibraryGameModal();
		location.reload();
	}
}

function handleLibraryRemoveClick(){
	var gameTitle = document.getElementById('library-text-input').value.trim();
	var boxArt = document.getElementById('library-photo-input').value.trim();
	var price = document.getElementById('library-price-input').value.trim();

	if (!gameTitle) {
		alert("You must fill in the Title field!");
	} else {
    
		// create POST request
		var postRequest = new XMLHttpRequest()
		postRequest.open("POST", "/removeFromLibrary")
		
		// create newGame object containing the game to remove
		var deleteGame = {
			gameTitle: gameTitle,
			boxArt: boxArt,
			price: price
		}
		
		// make a JSON copy of newGame
		var deleteGameJSON = JSON.stringify(deleteGame)
		postRequest.setRequestHeader('Content-Type', 'application/json')
		
		// send newGame JSON to server
		postRequest.send(deleteGameJSON)
		hideLibraryGameModal();
		location.reload();
	}
}

function handleLibraryUpdateClick(){
	var gameTitle = document.getElementById('library-text-input').value.trim();
	var boxArt = document.getElementById('library-photo-input').value.trim();
	var price = document.getElementById('library-price-input').value.trim();

	if (!gameTitle || !price) {
		alert("You must fill in the Title and Price fields!");
	} else {
    
		// create POST request
		var postRequest = new XMLHttpRequest()
		postRequest.open("POST", "/updateLibrary")
		
		// create newGame object containing the game to update
		var updateGame = {
			gameTitle: gameTitle,
			boxArt: boxArt,
			price: price
		}
		
		// make a JSON copy of newGame
		var updateGameJSON = JSON.stringify(updateGame)
		postRequest.setRequestHeader('Content-Type', 'application/json')
		
		// send newGame JSON to server
		postRequest.send(updateGameJSON)
		hideLibraryGameModal();
		location.reload();
	}
}


function doFilterUpdate() {
	var filter = document.getElementById('filter-text');
	var minFilter = document.getElementById('filter-min-price');
	var maxFilter = document.getElementById('filter-max-price');
	var games = document.getElementById('games');

	for (var i = 0; i < games.children.length; i++){
		if(games.children[i].textContent != ""){
			if(!games.children[i].textContent.toUpperCase().includes(filter.value.toUpperCase())){
				games.children[i].parentNode.removeChild(games.children[i]);
				i--;
			}
		}
		
		if(minFilter.value != ""){
			if(!(parseInt(games.children[i].getAttribute('data-price')) >= minFilter.valueAsNumber)){
				games.children[i].parentNode.removeChild(games.children[i]);
				i--;
			}
		}
		
		if(maxFilter.value != ""){
			if(!(parseInt(games.children[i].getAttribute('data-price')) <= maxFilter.valueAsNumber)){
				games.children[i].parentNode.removeChild(games.children[i]);
				i--;
			}
		}
	}
}


function insertNewGame(gameTitle, boxArt, price) {

  // create POST request
    var postRequest = new XMLHttpRequest()
    postRequest.open("POST", "/sell")
    
    // create newGame object containing the newly-added game
    var newGame = {
        gameTitle: gameTitle,
        boxArt: boxArt,
        price: price
    }
    
    // make a JSON copy of newGame
    var newGameJSON = JSON.stringify(newGame)
    postRequest.setRequestHeader('Content-Type', 'application/json')
    
    // update client page on successful POST request
    postRequest.addEventListener('load', function (event) {
        if (event.target.status == 200) {
            var newGameHTML = Handlebars.templates.gameTemplate(newGame)
            var gamesSection = document.getElementById("games")
            gamesSection.insertAdjacentHTML("beforeend", newGameHTML)
            allGames = JSON.parse(event.target.response)
            //console.log(allGames)
        }
      
    });
    
    // send newGame JSON to server
    postRequest.send(newGameJSON)
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



window.addEventListener('DOMContentLoaded', function () {

  var sellGameButton = document.getElementById('sell-game-button');
  if (sellGameButton) {
    sellGameButton.addEventListener('click', showSellGameModal);
  }

  var modalAcceptButton = document.getElementById('modal-accept');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }
  
  var filterUpdateButton = document.getElementById('filter-update-button');
  if (filterUpdateButton) {
    filterUpdateButton.addEventListener('click', doFilterUpdate)
  }
  
  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  if(modalHideButtons){
	  for (var i = 0; i < modalHideButtons.length; i++) {
		modalHideButtons[i].addEventListener('click', hideSellGameModal);
	  }
  }
  
  var libraryHideButtons = document.getElementsByClassName('library-hide-button');
  if(libraryHideButtons){
	  for (var i = 0; i < libraryHideButtons.length; i++) {
		libraryHideButtons[i].addEventListener('click', hideLibraryGameModal);
	  }
  }
  
  var libraryGameButton = document.getElementById('library-game-button');
  if(libraryGameButton){
    libraryGameButton.addEventListener('click', showLibraryGameModal);
  }
  
  var addButton = document.getElementById('library-add-button');
  if(addButton){
    addButton.addEventListener('click', handleLibraryAddClick);
  }
  
  var removeButton = document.getElementById('library-remove-button');
  if(removeButton){
    removeButton.addEventListener('click', handleLibraryRemoveClick);
  }
  
  var updateButton = document.getElementById('library-update-button');
  if(updateButton){
    updateButton.addEventListener('click', handleLibraryUpdateClick);
  }
});
