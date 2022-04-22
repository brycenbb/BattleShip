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
  let board = new Array(10).fill(new Array(10).fill(''));
  let ships = [];
  let counter = 0;

  const placeShip = (x, y, length, direction) => {
    // console.log(counter);
    // counter++;
    console.log(board);
    if (!validPlacement()) {
      //Need to throw an error here in some way, but will return false for now.
      return false;
    }
    ships.push(shipFactory(length));
    console.log('length:', length);
    console.log('size:', length, '+', x);
    if (direction === 'X') {
      for (let i = x; i < length + x; i++) {
        // board[i][y] = ships[ships.length - 1];
        board[i][y] = 'X';
      }
    } else {
      for (let i = y; i < length + y; i++) {
        // board[x][i] = ships[ships.length - 1];
        board[x][i] = 'X';
      }
    }
    console.log(board);

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

  return { placeShip };
};

module.exports = { shipFactory, gameBoard };
