const imjustken = require('../src/lib/math');
describe('test suite : math.js', () => {
  test('Test etrange calcul function normAngle', () => {
    expect(imjustken.normAngle(-3*Math.PI/4)).toEqual(-2.356194490192345);
  });
  test('test function smoothstep', () => {
    expect(imjustken.smoothstep(1, 2, 3)).toBe(1);
  });
  test('test function scoreTxt', () => {
    expect(imjustken.scoreTxt(7)).toBe('07');
  });
  test('test function dist 1', () => {
    expect(imjustken.dist([1, 2], [3, 4])).toBe(2.8284271247461903);
  });
  test('test function dist 2', () => {
    expect(imjustken.dist([-3, -7], [123, 42])).toBe(135.19245541079576);
  });
  test('test function length', () => {
    expect(imjustken.length([-3, -7], [123, 42])).toBe(7.615773105863909);
  });
  test('test function circleCollide 1', () => {
    expect(imjustken.circleCollides([1, 2], [3, 4], 5)).toBe(true);
  });
  test('test function circleCollide 2', () => {
    expect(imjustken.circleCollides([5, 4], [3, 2], 1)).toBe(false);
  });
});
