import { boardBuild, gameBuild } from './dom.js';
let turnTracker = true;
let gameOver = false;
let winner = undefined;
const shipFactory = (number) => {
  let shipLength = number;
  let hitStatus = Array(shipLength).fill('');

  const hit = (position) => {
    // console.log('omg ive been hit at posititon: ', position);
    hitStatus[position] = 'X';
    return isSunk();
  };
  const positionStatus = (position) => {
    if (hitStatus[position] === 'X') {
      // console.log('this has already been hit, position: ', position);
      return true;
    } else {
      // console.log('this has not been hit till now, posititon: ', position);
      return false;
    }
  };
  const isSunk = () => {
    if (hitStatus.filter((index) => index === 'X').length === shipLength) {
      return true;
    }
    // console.log('ship status:', hitStatus);
    return false;
  };
  return { hit, positionStatus };
};

const Player = () => {
  let board = gameBoard();
  //default adding in ships for simplicity
  // board.placeShip(2, 2, 5, 'X');
  // board.placeShip(4, 4, 3, 'X');
  // board.placeShip(6, 6, 3, 'X');

  const nextTurn = (x, y, computer) => {
    computer.getBoard().receiveAttack(x, y);
  };

  const nextTurnReal = (x, y, computer) => {
    if (computer.validAttack(x, y)) {
      computer.getBoard().receiveAttack(x, y);
      computer.nextTurn(Player());
    } else {
      console.log('invalid attack location');
    }
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
  board.placeShip(8, 1, 5, 'Y');
  // console.log(board.boardStatus());

  console.log('added in computer default ships, these are not random');

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

  const validAttack = (x, y) => {
    let position = board.boardStatus()[x][y][1];
    if (board.boardStatus()[x][y] != '') {
      if (typeof board.boardStatus()[x][y][0] === 'object') {
        if (board.boardStatus()[x][y][0].positionStatus(position)) {
          return false;
        }
        return true;
      }
      return false;
    }
    return true;
  };

  return { nextTurn, getBoard, validAttack };
};

const gameBoard = () => {
  //board is a 10x10 space. Divide by 10 and floor it to get the row, mod by 10 to get the column
  // let board = new Array(10).fill(new Array(10).fill(''));
  let board = Array.from(Array(10), () => new Array(10).fill(''));
  let ships = [];
  let sunkShips = 0;

  const placeShip = (x, y, length, direction) => {
    if (!validPlacement(x, y, length, direction)) {
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
    console.log(board);
    return true;
  };

  //I believe this needs to be rewritten...
  // const validPlacement = (x, y, length, direction) => {
  //   try {
  //     console.log(
  //       'trying to place ship at: ',
  //       x,
  //       y,
  //       'with size: ',
  //       length,
  //       ',',
  //       direction
  //     );
  //     if (direction === 'X') {
  //       for (let i = x; i < length + x; i++) {
  //         if (
  //           board[i][y] != '' ||
  //           board[i][y + 1] != '' ||
  //           board[i][y - 1] != ''
  //         ) {
  //           return false;
  //         }
  //       }
  //       if (board[x - 1][y] != '') {
  //         return false;
  //       }
  //       if (x + length + 1 < 10) {
  //         if (board[x + length + 1][y] != '') {
  //           return false;
  //         }
  //       }

  //       return true;
  //     } else {
  //       for (let i = y; i < length + y; i++) {
  //         if (
  //           board[x][i] != '' ||
  //           board[x + 1][y] != '' ||
  //           board[x - 1][i] != ''
  //         ) {
  //           return false;
  //         }
  //       }
  //       if (board[x][y - 1] != '') {
  //         return false;
  //       }
  //       if (y + length + 1 < 10) {
  //         if (board[x][y + length + 1] != '') {
  //           return false;
  //         }
  //       }

  //       return true;
  //     }
  //   } catch (err) {
  //     console.log('valid placement threw error');
  //     return false;
  //   }
  // };

  const validPlacement = (x, y, length, direction) => {
    console.log(
      'trying to place ship at: ',
      x,
      y,
      'with size: ',
      length,
      ',',
      direction
    );
    console.log(board);
    try {
      if (direction === 'X') {
        for (let i = x; i < length + x; i++) {
          if (board[i][y] != '') {
            console.log('failed placement x, location:', i, ', ', y);
            return false;
          }
        }
        return true;
      } else {
        for (let i = y; i < length + y; i++) {
          if (board[x][i] != '') {
            console.log('failed placement y');

            return false;
          }
        }
        return true;
      }
    } catch (err) {
      console.log('valid placement threw error');
      return false;
    }
  };

  const receiveAttack = (x, y) => {
    if (typeof board[x][y] === 'object') {
      let position = board[x][y][1];
      let result = board[x][y][0].hit(position);
      // console.log('ship hit!');
      if (result) {
        console.log('ship down');
        sunkShips++;
        if (sunkShips === ships.length) {
          //Gameover!
          gameOver = true;
          if (!turnTracker) {
            winner = 'Computer';
          } else {
            winner = 'Player';
          }

          console.log('End the game, all ships down! Winner is: ', winner);
          //Implement some way to shut down the game
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
      // console.log('a hit!');
      if (turnTracker) {
        document
          .getElementById(String(x) + ' ' + String(y) + ' ' + 'cbox')
          .classList.add('hit');
        turnTracker = false;
      } else {
        document
          .getElementById(String(x) + ' ' + String(y) + ' ' + 'box')
          .classList.add('hit');
        turnTracker = true;
      }
    } else {
      // console.log('a miss!');
      board[x][y] = 'O';
      if (turnTracker) {
        document
          .getElementById(String(x) + ' ' + String(y) + ' ' + 'cbox')
          .classList.add('miss');
        turnTracker = false;
      } else {
        document
          .getElementById(String(x) + ' ' + String(y) + ' ' + 'box')
          .classList.add('miss');
        turnTracker = true;
      }
    }
  };

  const boardStatus = () => {
    return board;
  };
  return { placeShip, receiveAttack, boardStatus };
};

// function gameLooptest1() {
//   const player = Player();
//   const computer = Computer();
//   player.nextTurn(2, 2, computer);
//   // computer.nextTurn(player);
//   // console.log(computer.getBoard().boardStatus());
//   return true;
// }
// function gameLooptest2() {
//   const player = Player();
//   const computer = Computer();
//   // player.nextTurn(2, 2, computer);
//   computer.nextTurn(player);
//   // console.log(player.getBoard().boardStatus());
//   return true;
// }

// function gameLooptest3() {
//   const player = Player();
//   const computer = Computer();
//   // player.nextTurn(2, 2, computer);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);
//   computer.nextTurn(player);

//   // console.log(player.getBoard().boardStatus());
//   return true;
// }

// module.exports = {
//   shipFactory,
//   gameBoard,
//   gameLooptest1,
//   gameLooptest2,
//   gameLooptest3,
//   gameLoopReal
// };

export function gameLoopReal() {
  console.log('game loop running');
  const player = Player();
  console.log('player created, starting computer');
  const computer = Computer();
  console.log('computer created');

  gameBuild(player, computer);
  boardBuild([player, computer]);
}
