const randomAsteroidShape = require('../src/asteroids.js');

describe('test suite asteroid.js', () => {
  test('test 0', () => {
    expect(randomAsteroidShape(0))
        .toMatchObject([[0, 0], [0, 0], [-0, 0], [-0, -0]]);
  });
  test('test 4', () => {
    expect(randomAsteroidShape(4)).toHaveLength(12);
  });
});
