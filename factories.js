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

const gameBoard = () => {};

module.exports = shipFactory;
