const shipFactory = (number) => {
  let shipLength = number;
  let hitStatus = Array(shipLength).fill('');

  const hit = (position) => {
    hitStatus[position] = 'X';
    return isSunk();
  };

  const isSunk = () => {
    if (hitStatus.filter((index) => index === 'X').length === shipLength) {
      return true;
    }
    // console.log('ship status:', hitStatus);
    return false;
  };
  return { hit };
};

const Player = () => {
  let board = gameBoard();
  //default adding in ships
  board.placeShip(2, 2, 5, 'X');
  board.placeShip(4, 4, 3, 'X');
  board.placeShip(6, 6, 3, 'X');

  const nextTurn = (x, y, computer) => {
    computer.getBoard().receiveAttack(x, y);
  };

  const nextTurnReal = (x, y, computer) => {
    computer.getBoard().receiveAttack(x, y);
    computer.nextTurn(this);
  };
  const getBoard = () => {
    return board;
  };
  return { nextTurn, getBoard, nextTurnReal };
};

const Computer = () => {
  let board = gameBoard();
  //default adding in ships
  board.placeShip(2, 2, 3, 'X');
  board.placeShip(4, 4, 3, 'X');
  board.placeShip(6, 1, 5, 'Y');

  let boardTracker = Array.from(Array(10), () => new Array(10).fill(false));

  const nextTurn = (player) => {
    // Returns a random integer from 0 to 9:
    let xCord = Math.floor(Math.random() * 10);
    let yCord = Math.floor(Math.random() * 10);
    while (boardTracker[xCord][yCord] === true) {
      xCord = Math.floor(Math.random() * 10);
      yCord = Math.floor(Math.random() * 10);
    }
    boardTracker[xCord][yCord] = true;
    player.getBoard().receiveAttack(xCord, yCord);
  };

  const getBoard = () => {
    return board;
  };

  return { nextTurn, getBoard };
};
const gameBoard = () => {
  //board is a 10x10 space. Divide by 10 and floor it to get the row, mod by 10 to get the column
  // let board = new Array(10).fill(new Array(10).fill(''));
  let board = Array.from(Array(10), () => new Array(10).fill(''));
  let ships = [];
  let sunkShips = 0;

  const placeShip = (x, y, length, direction) => {
    if (!validPlacement(x, y, length, direction)) {
      //Need to throw an error here in some way, but will return false for now.
      return false;
    }
    ships.push(shipFactory(length));
    if (direction === 'X') {
      for (let i = x; i < length + x; i++) {
        board[i][y] = [ships[ships.length - 1], i - x];
      }
    } else {
      for (let i = y; i < length + y; i++) {
        board[x][i] = [ships[ships.length - 1], i - y];
      }
    }
    // console.log(board);
    return true;
  };

  const validPlacement = (x, y, length, direction) => {
    if (direction === 'X') {
      for (let i = x; i < length + x; i++) {
        if (
          board[i][y] != '' ||
          board[i][y + 1] != '' ||
          board[i][y - 1] != ''
        ) {
          return false;
        }
      }
      if (board[x - 1][y] != '') {
        return false;
      }
      if (x + length + 1 < 10) {
        if (board[x + length + 1][y] != '') {
          return false;
        }
      }

      return true;
    } else {
      for (let i = y; i < length + y; i++) {
        if (
          board[x][i] != '' ||
          board[x + 1][y] != '' ||
          board[x - 1][i] != ''
        ) {
          return false;
        }
      }
      if (board[x][y - 1] != '') {
        return false;
      }
      if (y + length + 1 < 10) {
        if (board[x][y + length + 1] != '') {
          return false;
        }
      }

      return true;
    }
  };

  const receiveAttack = (x, y) => {
    // console.log(typeof board[x][y][0]);
    // console.log(typeof [1, 2]);
    if (typeof board[x][y] === 'object') {
      let position = board[x][y][1];
      let result = board[x][y][0].hit(position);
      // console.log('ship hit!');
      if (result) {
        console.log('ship down');
        sunkShips++;
        if (sunkShips === ships.length) {
          //Gameover!
          console.log('End the game, all ships down');
        }
      }

      recordAttack(x, y, 'hit');
      return result;
    } else {
      recordAttack(x, y, 'miss');
      return false;
    }
  };

  const recordAttack = (x, y, result) => {
    if (result === 'hit') {
      //changeColor(hit)
    } else {
      board[x][y] = 'O';
      //changeColor(miss)
    }
  };

  const boardStatus = () => {
    return board;
  };
  return { placeShip, receiveAttack, boardStatus };
};

function gameLooptest1() {
  const player = Player();
  const computer = Computer();
  player.nextTurn(2, 2, computer);
  // computer.nextTurn(player);
  // console.log(computer.getBoard().boardStatus());
  return true;
}
function gameLooptest2() {
  const player = Player();
  const computer = Computer();
  // player.nextTurn(2, 2, computer);
  computer.nextTurn(player);
  // console.log(player.getBoard().boardStatus());
  return true;
}
function gameLooptest3() {
  const player = Player();
  const computer = Computer();
  // player.nextTurn(2, 2, computer);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);
  computer.nextTurn(player);

  // console.log(player.getBoard().boardStatus());
  return true;
}

function gameLoopReal() {
  const player = Player();
  const computer = Computer();
}
module.exports = {
  shipFactory,
  gameBoard,
  gameLooptest1,
  gameLooptest2,
  gameLooptest3,
};
