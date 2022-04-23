let direction = 'X';

export function onload() {
  // console.log('hi');
  window.addEventListener('DOMContentLoaded', function () {
    let modal = document.querySelector('.startModal');
    modal.classList.add('show');
    modal.style.padding = '100px 200px';
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
}

export async function gameBuild(player, computer) {
  shipPlace(4, player, 3);
  // shipPlace(3, player, 2);
  // shipPlace(2, player, 1);
  // shipPlace(2, player, 0);
  // shipPlaceComputer();
}
function shipPlace(size, player, loopCount) {
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
      mouseOverEvent(space, size);
      row.appendChild(space);
    }
    container.appendChild(row);
  }
}

function mouseOverEvent(element, size) {
  element.addEventListener('mouseenter', function () {
    // console.log('hi');
    highlightElement(element, size);
  });
  element.addEventListener('mouseleave', function () {
    // console.log('bye');
    let highlighted = document.querySelectorAll('.potential');
    highlighted.forEach((box) => {
      box.classList.remove('potential');
    });
    //get rid of the .potential class on all elemenets. (done!)
  });
}

function highlightElement(element, size) {
  //deliminate element location to get coordinates (done)
  //calculate how many more spaces need to be highlighted based on size and direction
  //add .potential class to all relevant elements.
  let delimitedString = element.id.split(' ');
  let startingLocationX = Number(delimitedString[0]);
  let startingLocationY = Number(delimitedString[1]);
  element.classList.add('potential');
  for (let i = 1; i < size; i++) {
    if (direction === 'X') {
      if (startingLocationX + i <= 10) {
        let nextBox = document.getElementById(
          String(startingLocationX + i) + ' ' + String(startingLocationY)
        );
        nextBox.classList.add('potential');
      }
    } else {
      if (startingLocationY + i <= 10) {
        let nextBox = document.getElementById(
          String(startingLocationX) + ' ' + String(startingLocationY + i)
        );
        nextBox.classList.add('potential');
      }
    }
  }
}

function shipPlaceComputer() {
  //need to place  4,3,2,2 length ships randomly
}

export function boardBuild(players) {
  // console.log('qiwjeiqowje');
  let pBoard = players[0].getBoard().boardStatus();
  let cBoard = players[1].getBoard().boardStatus();
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

  //comp second
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j++) {
      let space = document.createElement('div');
      space.classList.add('cbox');
      space.id = String(i) + ' ' + String(j) + ' ' + 'cbox';
      events(players, space, i, j);

      if (cBoard[i][j] != '') {
        //this class add is just to show the ships
        // space.classList.add('hit');
      }
      row.appendChild(space);
    }
    computer.appendChild(row);
  }
}

function events(players, box, x, y) {
  box.addEventListener('click', function () {
    players[0].nextTurnReal(x, y, players[1]);
  });
}
