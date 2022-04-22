const { test, expect } = require('@jest/globals');
const shipFactory = require('./factories');

test('Ship takes hits and sinks', () => {
  expect(shipFactory(1).hit(0)).toBe(true);
});

test('Ship takes hits and does not sink', () => {
  expect(shipFactory(2).hit(1)).toBe(false);
});
