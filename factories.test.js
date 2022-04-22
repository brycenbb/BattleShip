const { test, expect } = require('@jest/globals');
const factories = require('./factories');

test('Ship takes hits and sinks', () => {
  expect(factories.shipFactory(1).hit(0)).toBe(true);
});

test('Ship takes hits and does not sink', () => {
  expect(factories.shipFactory(2).hit(1)).toBe(false);
});

test('ship placement works 1', () => {
  expect(factories.gameBoard().placeShip(4, 2, 4, 'X')).toBe(true);
});

test('ship placement works 2', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 3, 'X');
  expect(board.placeShip(2, 2, 3, 'X')).toBe(false);
});

test('hit detection: hit/sink', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  board.receiveAttack(2, 2);
  expect(board.receiveAttack(3, 2)).toBe(true);
});

test('hit detection: miss', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  board.receiveAttack(2, 2);
  expect(board.receiveAttack(3, 3)).toBe(false);
});

test('hit detection: hit/no sink', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  expect(board.receiveAttack(3, 2)).toBe(false);
});
