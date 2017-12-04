/*Everything commeted out is code that should be more compatibile with handlebars.
Basically the js code we were provided for assignment 5.*/


var allGames = [];

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
/*
    var newGameElem = createGameElement(gameTitle, boxArt, price);
    allGames.push(newPostElem);
    
    var gamesSection = document.getElementById('games');
    gamesSection.appendChild(newGameElem);
    */
    //allGames.push({
    //  gameTitle: gameTitle,
    //  boxArt: boxArt,
    //  price: price
    //});

    //clearFiltersAndReinsertGames();
    
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
	var gameTitle = document.getElementById('game-text-input').value.trim();
	var boxArt = document.getElementById('game-photo-input').value.trim();
	var price = document.getElementById('game-price-input').value.trim();

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
		hideSellGameModal();
		location.reload();
	}
}

function gamePassesFilters(gameElem, filters) {

  if (filters.text) {
    var gamesTitle = gameElem.gameTitle.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (gamesTitle.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minPrice) {
    var gamePrice = Number(gameElem.getAttribute('data-price'));
    var filterMinPrice = Number(filters.minPrice);
    if (Number(game.price) < filterMinPrice) {
      return false;
    }
  }

  if (filters.maxPrice) {
    var gamePrice = Number(gameElem.getAttribute('data-price'));
    var filterMaxPrice = Number(filters.maxPrice);
    if (Number(game.price) > filterMaxPrice) {
      return false;
    }
  }

  return true;

}

function doFilterUpdate() {

  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    minPrice: document.getElementById('filter-min-price').value,
    maxPrice: document.getElementById('filter-max-price').value
   
  }

  var gameContainer = document.getElementById('games');
  while(gameContainer.lastChild) {
    //gameContainer.removeChild(gameContainer.lastChild);
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
  
  /*
  var gameTemplateArgs = {

      gameTitle: gameTitle,
      boxArt: boxArt,
      price: price  
  
  };
  
  var gameHTML = Handlebars.templates.gameTemplate(gameTemplateArgs);
  console.log("== gameHTML:", gameHTML);
  
  return gameHTML;

*/
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

  var gameElems = document.getElementsByClassName('game');
  for (var i = 0; i < gameElems.length; i++) {
    allGames.push(parseGameElem(gameElems[i]));
  }

  var sellGameButton = document.getElementById('sell-game-button');
  sellGameButton.addEventListener('click', showSellGameModal);
  //if (sellGameButton) {
  //  sellGameButton.addEventListener('click', showSellGameModal);
  //}

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  //if (modalAcceptButton) {
  //  modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  //}
  
  var addButton = document.getElementById('library-add-button');
  addButton.addEventListener('click', handleLibraryAddClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideSellGameModal);
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
  filterUpdateButton.addEventListener('click', doFilterUpdate);
  //if (filterUpdateButton) {
  //  filterUpdateButton.addEventListener('click', doFilterUpdate)
  //}

});
