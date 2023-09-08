/**
 * @jest-environment jsdom
 */

// test('use jsdom in this test file', () => {
//     const element = document.createElement('div');
//     expect(element).not.toBeNull();
// });

//Commentaire à push stp

const { Vec, GameStatus } = require("../main");

describe(
    "batterie test de main.js", () => {
        test("test 1,2 = x:1, y:2", () => {
            expect(new Vec(1, 2)).toMatchObject({ x: 1, y: 2 })
        })
        test("test 1,2 et 3,4 = x:5, y:6", () => {
            expect(new Vec(1, 2).add(new Vec(3, 4))).toMatchObject({ x: 4, y: 6 })
        })
        test("test 1,2 * -2, -3 = x:-2, y:6", () => {
            expect(new Vec(1, 2).mul(-2, 3)).toMatchObject({ x: -2, y: 6 })
        })
        test("test 1,2 dot 2,1 = 4", () => {
            expect(new Vec(1, 2).dot(new Vec(2, 1))).toBe(4)
        })
        test("test 1,2 cross 3,4 mul -2,3 = 24", () => {
            expect(new Vec(1, 2).cross(new Vec(3, 4).mul(-2, 3))).toBe(24)
        })
        test("test trop relou = 57", () => {
            expect(new Vec(1, 2).dot(new Vec(1, 2).add(new Vec(new Vec(1, 2).dot(new Vec(2, 1)), new Vec(1, 2).cross(new Vec(3, 4).mul(-2, 3)))))).toBe(57)
        })
        test("test add(3) = x:NaN, y:NaN", () => {
            expect(new Vec(1, 2).add(3)).toMatchObject({ x: NaN, y: NaN })
        })
        test("test cross(-42,-42) = 0", () => {
            expect(new Vec(1, 1).cross(new Vec(-42, -42))).toBe(0)
        })
        test("test getTimeStr(424242) = 7:04.24", () => {
            expect(new GameStatus().getTimeStr(424242)).toBe("7:04.24")
        })
        test("test getTimeStr(-123456) = 7:04.24", () => {
            expect(new GameStatus().getTimeStr(-123456)).toBe("-3:-4.-4")
        })
    }
)
