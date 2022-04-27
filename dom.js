// import { gameLoopReal } from './factories';

let direction = 'X';
let loops = 4;
let initial = true;

export function onload() {
  // console.log('onload running');
  loops = 4;
  updateTextShip(loops);

  window.addEventListener('DOMContentLoaded', function () {
    let modal = document.querySelector('.startModal');
    modal.classList.add('show');
    modal.style.padding = '50px 100px';
    let dirBtn = document.createElement('button');
    dirBtn.type = 'button';
    dirBtn.textContent = 'Change Direction';
    dirBtn.addEventListener('click', function () {
      if (direction == 'X') {
        direction = 'Y';
      } else {
        direction = 'X';
      }
    });
    modal.appendChild(dirBtn);
  });
  // gameLoopReal();
  if (initial) {
    newGame();
    initial = false;
  }
}

function newGame() {
  document.getElementById('new').addEventListener('click', function () {
    onload();
  });
}

export function gameBuild(player, computer) {
  // console.log('gamebuild running');
  // shipPlaceComputer();
  shipPlace(4, player, 3, computer);
  shipPlaceComputer(computer);
}

function shipPlace(size, player, loopCount, computer) {
  let container = document.querySelector('.startModal');
  //make a fake board and let players place somewhere on it:
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    row.id = String(i);
    for (let j = 0; j < 10; j++) {
      let space = document.createElement('div');
      space.classList.add('box');
      space.id = String(j);
      space.id = String(i) + ' ' + String(j);
      if (player.getBoard().boardStatus()[i][j] != '') {
        //this is just to show the ships to the player
        space.classList.add('showPlayer');
      }
      mouseOverEvent(space, size);
      space.addEventListener('click', function () {
        placementEvent(player, size, space, computer);
      });
      row.appendChild(space);
    }
    container.appendChild(row);
  }
}

function updateTextShip(counter) {
  document.getElementById('messages').textContent =
    'Place your ship of length ' + String(counter);
}
export function updateTextHit(boolean, sunk) {
  if (sunk) {
    if (boolean) {
      console.log('ship sunk, changing text');

      document.getElementById('messages').innerHTML =
        "You've sunk a ship!!!" + '<br />';
    } else {
      document.getElementById('messages').innerHTML +=
        'The enemy has sunk a ship!!!';
      console.log('text should be changed');
    }
  } else {
    if (boolean) {
      document.getElementById('messages').innerHTML =
        "You've hit a ship!" + '<br />';
    } else {
      document.getElementById('messages').innerHTML +=
        'The enemy has hit a ship!';
    }
  }
}
function updateTextPlay() {
  document.getElementById('messages').textContent = 'Choose an area to attack!';
  document.getElementById('messages').style.paddingTop = '1.6rem';
  document.querySelector('#player').textContent = 'Player';
  document.querySelector('#computer').textContent = 'Opponent';
}
function placementEvent(player, size, element, computer) {
  let elements = document.querySelectorAll('.potential');
  let gameBoard = player.getBoard();
  let delimitedString = element.id.split(' ');
  let x = Number(delimitedString[0]);
  let y = Number(delimitedString[1]);
  let oppDir = 'X';

  if (direction === 'X') {
    oppDir = 'Y';
  }

  // console.log('start of placementEvent: ');
  // console.log(gameBoard.boardStatus());
  if (gameBoard.placeShip(x, y, loops, direction)) {
    //TODO:write a function that takes in loops and displays a msg to the modal based on the loops count (ie: place your Xth ship!)
    // console.log('ship placed: ');
    loops--;
    updateTextShip(loops);

    // console.log('loops', loops);
    if (loops === 0) {
      let modal = document.querySelector('.startModal');
      modal.classList.remove('show');
      boardBuild([player, computer]);
      updateTextPlay();
      return;
    }
    // console.log(gameBoard.boardStatus());

    elements.forEach((element) => {
      element.classList.add('showPlayer');
    });

    //maybe remove click event here? or go to the next shipplace call? maybe need to refactor how the board is made?

    //this doesnt work at all lol
    // element.removeEventListener('click', function () {});
    // shipPlace(3, player, 2);
  }

  // console.log(elements);
}
function mouseOverEvent(element, size) {
  element.addEventListener('mouseenter', function () {
    highlightElement(element, size);
  });
  element.addEventListener('mouseleave', function () {
    let highlighted = document.querySelectorAll('.potential');
    highlighted.forEach((box) => {
      box.classList.remove('potential');
    });
    //get rid of the .potential class on all elemenets. (done!)
  });
}

function highlightElement(element, size) {
  //deliminate element location to get coordinates (done)
  //calculate how many more spaces need to be highlighted based on size and direction(done)
  //add .potential class to all relevant elements.(done)
  let delimitedString = element.id.split(' ');
  let startingLocationX = Number(delimitedString[0]);
  let startingLocationY = Number(delimitedString[1]);
  try {
    for (let i = loops - 1; i > 0; i--) {
      if (direction === 'X') {
        let nextBox = document.getElementById(
          String(startingLocationX + i) + ' ' + String(startingLocationY)
        );
        nextBox.classList.add('potential');
      } else {
        let nextBox = document.getElementById(
          String(startingLocationX) + ' ' + String(startingLocationY + i)
        );
        nextBox.classList.add('potential');
      }
    }
    element.classList.add('potential');
  } catch (err) {
    return;
  }
}

function shipPlaceComputer(computer) {
  //need to place  4,3,2,2 length ships randomly
  let compGameboard = computer.getBoard();
  let successfullyPlaced = false;
  let xCord = Math.floor(Math.random() * 10);
  let yCord = Math.floor(Math.random() * 10);
  let directions = ['X', 'Y'];
  let randIndex = Math.floor(Math.random() * 2);
  // compGameboard.placeShip(xCord, yCord, 4, directions[randIndex]);

  while (successfullyPlaced === false) {
    xCord = Math.floor(Math.random() * 10);
    yCord = Math.floor(Math.random() * 10);
    randIndex = Math.floor(Math.random() * 2);

    if (compGameboard.placeShip(xCord, yCord, 4, directions[randIndex])) {
      successfullyPlaced = true;
    }
  }
  successfullyPlaced = false;

  while (successfullyPlaced === false) {
    xCord = Math.floor(Math.random() * 10);
    yCord = Math.floor(Math.random() * 10);
    randIndex = Math.floor(Math.random() * 2);

    if (compGameboard.placeShip(xCord, yCord, 3, directions[randIndex])) {
      successfullyPlaced = true;
    }
  }
  successfullyPlaced = false;
  while (successfullyPlaced === false) {
    xCord = Math.floor(Math.random() * 10);
    yCord = Math.floor(Math.random() * 10);
    randIndex = Math.floor(Math.random() * 2);
    if (compGameboard.placeShip(xCord, yCord, 2, directions[randIndex])) {
      successfullyPlaced = true;
    }
  }
  successfullyPlaced = false;
  while (successfullyPlaced === false) {
    xCord = Math.floor(Math.random() * 10);
    yCord = Math.floor(Math.random() * 10);
    randIndex = Math.floor(Math.random() * 2);
    if (compGameboard.placeShip(xCord, yCord, 1, directions[randIndex])) {
      return;
    }
  }
}

export function boardBuild(players) {
  // console.log('qiwjeiqowje');
  // console.log('board building! Player board:');

  let pBoard = players[0].getBoard().boardStatus();
  // console.log(pBoard);
  let cBoard = players[1].getBoard().boardStatus();
  // console.log('computer board: ');
  // console.log(cBoard);
  let player = document.querySelector('.playerBoard');
  let computer = document.querySelector('.computerBoard');

  //player first
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j++) {
      let space = document.createElement('div');
      space.classList.add('box');
      space.id = String(i) + ' ' + String(j) + ' ' + 'box';

      if (pBoard[i][j] != '') {
        //this is just to show the ships to the player
        space.classList.add('showPlayer');
      }
      row.appendChild(space);
    }
    player.appendChild(row);
  }

  //computer second
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j++) {
      let space = document.createElement('div');
      space.classList.add('cbox');
      space.id = String(i) + ' ' + String(j) + ' ' + 'cbox';
      events(players, space, i, j);

      if (cBoard[i][j] != '') {
        // this class add is just to show the ships
        // space.classList.add('hit');
      }
      row.appendChild(space);
    }
    computer.appendChild(row);
  }
}

function events(players, box, x, y) {
  // console.log(
  //   'this is one of the last thing that runs in the construction of the page!!!!!!!'
  // );
  // console.log('board building! Player board:');

  let pBoard = players[0].getBoard().boardStatus();
  // console.log(pBoard);
  let cBoard = players[1].getBoard().boardStatus();
  // console.log('computer board: ');
  // console.log(cBoard);
  box.addEventListener('click', function () {
    if (players[1].validAttack(x, y)) {
      players[0].nextTurn(x, y, players[1]);
      players[1].nextTurn(players[0]);
    } else {
      console.log('invalid attack location');
    }
  });
}
