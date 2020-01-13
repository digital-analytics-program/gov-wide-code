const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('BAD TEST: adds 2 + 3 to equal 4', () => {
  expect(sum(2, 3)).toBe(4);
});
