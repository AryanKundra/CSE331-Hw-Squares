"use strict";
// a) Copy over your mutable map interface from HW7
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutableMap = void 0;
// b) Add a function that gets all the keys from the map
class MutableMapImpl {
    constructor() {
        this.data = new Map();
        /**
         * Checks if a key exists in the map.
         * @param key The key to check.
         * @returns True if the key exists, false otherwise.
         */
        this.containsKey = (key) => {
            return this.data.has(key);
        };
        /**
          * Gets the value associated with a key.
          * @param key The key to get the value for.
          * @returns The value associated with the key, or throws an error if the key doesn't exist.
          * @throws Error if the key doesn't exist in the map.
          */
        this.getVal = (key) => {
            const value = this.data.get(key);
            if (value === undefined) {
                throw new Error(`Key ${key} not found`);
            }
            return value;
        };
        /**
         * Sets a key-value pair in the map, replacing the existing value if the key already exists.
         * @param key The key to set.
         * @param value The value to associate with the key.
         * @returns True if the value was replaced, false otherwise.
         */
        this.set = (key, value) => {
            const replaced = this.data.has(key);
            this.data.set(key, value);
            return replaced;
        };
        /**
         * Clears all key-value pairs from the map.
         */
        this.clear = () => {
            this.data.clear();
        };
        /**
         * Gets all the keys from the map.
         * @returns An array of all keys in the map.
         */
        this.getKeys = () => {
            return Array.from(this.data.keys());
        };
    }
}
// d) Implement a factory function that creates a new instance of the class
/**
 * A factory function that creates a new instance of the MutableMapImpl class.
 * @returns A new instance of the MutableMapImpl class.
 */
const createMutableMap = () => {
    return new MutableMapImpl();
};
exports.createMutableMap = createMutableMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsbURBQW1EOzs7QUFzQ25ELHdEQUF3RDtBQUV4RCxNQUFNLGNBQWM7SUFBcEI7UUFDVSxTQUFJLEdBQW1CLElBQUksR0FBRyxFQUFhLENBQUM7UUFFcEQ7Ozs7V0FJRztRQUNILGdCQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQztRQUVEOzs7OztZQUtJO1FBQ0osV0FBTSxHQUFHLENBQUMsR0FBVyxFQUFLLEVBQUU7WUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQzthQUN6QztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBQ0Y7Ozs7O1dBS0c7UUFDSCxRQUFHLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBUSxFQUFXLEVBQUU7WUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUVGOztXQUVHO1FBQ0gsVUFBSyxHQUFHLEdBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNILFlBQU8sR0FBRyxHQUFhLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQUE7QUFFRCwyRUFBMkU7QUFFM0U7OztHQUdHO0FBQ0ksTUFBTSxnQkFBZ0IsR0FBRyxHQUFxQixFQUFFO0lBQ3JELE9BQU8sSUFBSSxjQUFjLEVBQUssQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFGVyxRQUFBLGdCQUFnQixvQkFFM0IifQ==