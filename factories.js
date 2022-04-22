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
        if (board[i][y] != '') {
          return false;
        }
      }
      return true;
    } else {
      for (let i = y; i < length + y; i++) {
        if (board[x][i] != '') {
          return false;
        }
      }
      return true;
    }
  };

  const receiveAttack = (x, y) => {
    if (board[x][y] != '') {
      let position = board[x][y][1];
      let result = board[x][y][0].hit(position);
      if (result) {
        sunkShips++;
        if (sunkShips === ships.length) {
          //Gameover!
          console.log('End the game');
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
      board[x][y] = 'X';
      //changeColor(hit)
    } else {
      board[x][y] = 'O';
      //changeColor(miss)
    }
  };

  return { placeShip, receiveAttack };
};

module.exports = { shipFactory, gameBoard };
