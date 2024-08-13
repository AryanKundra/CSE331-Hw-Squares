"use strict";
// import * as assert from 'assert';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO (5e): copy over your mutable map tests from HW7
//            add tests for the function that gets all the keys in the map
const assert = __importStar(require("assert"));
const map_1 = require("./map");
describe('MutableMap', function () {
    it('containsKey', function () {
        const map = (0, map_1.createMutableMap)();
        // 0-1-many: base case, 0 recursive calls (only 1 possible input)
        assert.deepStrictEqual(map.containsKey('a'), false);
        // 0-1-many: 1 recursive call
        map.set('a', 1);
        assert.deepStrictEqual(map.containsKey('a'), true);
        assert.deepStrictEqual(map.containsKey('b'), false);
        // 0-1-many: 2+ recursive calls
        map.set('b', 2);
        assert.deepStrictEqual(map.containsKey('a'), true);
        assert.deepStrictEqual(map.containsKey('b'), true);
        assert.deepStrictEqual(map.containsKey('c'), false);
    });
    it('getVal', function () {
        const map = (0, map_1.createMutableMap)();
        // 0-1-many: 0 recursive calls - throws error
        assert.throws(() => map.getVal('a'), Error);
        // 0-1-many: 1 recursive call
        map.set('a', 1);
        assert.deepStrictEqual(map.getVal('a'), 1);
        assert.throws(() => map.getVal('b'), Error);
        // 0-1-many: 2+ recursive calls
        map.set('b', 2);
        assert.deepStrictEqual(map.getVal('a'), 1);
        assert.deepStrictEqual(map.getVal('b'), 2);
        assert.throws(() => map.getVal('c'), Error);
    });
    it('set', function () {
        const map = (0, map_1.createMutableMap)();
        // 0-1-many: base case, 0 recursive calls (only 1 possible input)
        assert.deepStrictEqual(map.set('a', 1), false);
        assert.deepStrictEqual(map.getVal('a'), 1);
        // 0-1-many: 1 recursive call
        assert.deepStrictEqual(map.set('a', 2), true);
        assert.deepStrictEqual(map.getVal('a'), 2);
        assert.deepStrictEqual(map.set('b', 3), false);
        assert.deepStrictEqual(map.getVal('b'), 3);
        // 0-1-many: 2+ recursive calls
        assert.deepStrictEqual(map.set('c', 4), false);
        assert.deepStrictEqual(map.getVal('a'), 2);
        assert.deepStrictEqual(map.getVal('b'), 3);
        assert.deepStrictEqual(map.getVal('c'), 4);
    });
    it('clear', function () {
        const map = (0, map_1.createMutableMap)();
        // 0-1-many: base case, 0 recursive calls (only 1 possible input)
        map.clear();
        assert.deepStrictEqual(map.containsKey('a'), false);
        // 0-1-many: 1 recursive call
        map.set('a', 1);
        map.clear();
        assert.deepStrictEqual(map.containsKey('a'), false);
        // 0-1-many: 2+ recursive calls
        map.set('a', 1);
        map.set('b', 2);
        map.set('c', 3);
        map.clear();
        assert.deepStrictEqual(map.containsKey('a'), false);
        assert.deepStrictEqual(map.containsKey('b'), false);
        assert.deepStrictEqual(map.containsKey('c'), false);
    });
    it('getKeys', function () {
        const map = (0, map_1.createMutableMap)();
        // Empty map should return empty array
        assert.deepStrictEqual(map.getKeys(), []);
        // Single entry
        map.set('a', 1);
        assert.deepStrictEqual(map.getKeys(), ['a']);
        // Multiple entries
        map.set('b', 2);
        map.set('c', 3);
        assert.deepStrictEqual(map.getKeys().sort(), ['a', 'b', 'c']);
        // Updating an existing key shouldn't add duplicates
        map.set('a', 4);
        assert.deepStrictEqual(map.getKeys().sort(), ['a', 'b', 'c']);
        // Clearing the map should result in an empty array
        map.clear();
        assert.deepStrictEqual(map.getKeys(), []);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9DQUFvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVwQyx1REFBdUQ7QUFDdkQsMEVBQTBFO0FBQzFFLCtDQUFpQztBQUNqQywrQkFBeUM7QUFFekMsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNyQixFQUFFLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUEsc0JBQWdCLEdBQVUsQ0FBQztRQUV2QyxpRUFBaUU7UUFDakUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBELDZCQUE2QjtRQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBELCtCQUErQjtRQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDLENB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