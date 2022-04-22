export function onload() {
  // console.log('hi');
  window.addEventListener('DOMContentLoaded', function () {
    // document.querySelector('.startModal').classList.add('show');
  });
}

export function gameBuild() {
  let player = document.querySelector('.playerBoard');
  let computer = document.querySelector('.computerBoard');
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
        //this is just to show the ships
        space.classList.add('hit');
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
