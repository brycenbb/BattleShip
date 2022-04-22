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
  expect(board.receiveAttack(3, 3)).toBe(false);
});

test('hit detection: hit/no sink', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  expect(board.receiveAttack(3, 2)).toBe(false);
});

test('misses are recorded correctly', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  board.receiveAttack(5, 5);
  expect(board.boardStatus()[5][5]).toBe('O');
});

test('validation works outside bounds generally', () => {
  expect(factories.gameBoard().placeShip(1, 11, 3, 'X')).toBe(false);
});
test('validation works outside bounds on edge case', () => {
  expect(factories.gameBoard().placeShip(7, 2, 3, 'X')).toBe(true);
});

test('ships cannot be placed next to each other', () => {
  let board = factories.gameBoard();
  board.placeShip(2, 2, 2, 'X');
  expect(board.placeShip(2, 1, 3, 'X')).toBe(false);
});

test('player turn registers', () => {
  expect(factories.gameLooptest1()).toBe(true);
});
test('computer turn registers', () => {
  expect(factories.gameLooptest2()).toBe(true);
});

test('computer turn does not allow repeats', () => {
  expect(factories.gameLooptest3()).toBe(true);
});
