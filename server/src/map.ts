

// a) Copy over your mutable map interface from HW7

export interface MutableMap<V> {
  /**
   * Checks if a key exists in the map
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  containsKey: (key: string) => boolean;

  /**
   * Gets the value associated with a key.
   * @param key The key to get the value for.
   * @returns The value associated with the key, or throws an error if the key doesn't exist.
   * @throws Error if the key doesn't exist in the map.
   */
  getVal: (key: string) => V;

  /**
   * Sets a key-value pair in the map, replacing the existing value if the key already exists.
   * @param key The key to set.
   * @param value The value to associate with the key.
   * @returns True if the value was replaced, false otherwise.
   */
  set: (key: string, value: V) => boolean;

  /**
   * Clears all key-value pairs from the map.
   */
  clear: () => void;

  /**
   * Gets all the keys from the map.
   * @returns An array of all keys in the map.
   */
  getKeys: () => string[];
}

// b) Add a function that gets all the keys from the map

class MutableMapImpl<V> implements MutableMap<V> {
  private data: Map<string, V> = new Map<string, V>();

  /**
   * Checks if a key exists in the map.
   * @param key The key to check.
   * @returns True if the key exists, false otherwise.
   */
  containsKey = (key: string): boolean => {
    return this.data.has(key);
  };

   /**
     * Gets the value associated with a key.
     * @param key The key to get the value for.
     * @returns The value associated with the key, or throws an error if the key doesn't exist.
     * @throws Error if the key doesn't exist in the map.
     */
   getVal = (key: string): V => {
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
  set = (key: string, value: V): boolean => {
    const replaced = this.data.has(key);
    this.data.set(key, value);
    return replaced;
  };

  /**
   * Clears all key-value pairs from the map.
   */
  clear = (): void => {
    this.data.clear();
  };

  /**
   * Gets all the keys from the map.
   * @returns An array of all keys in the map.
   */
  getKeys = (): string[] => {
    return Array.from(this.data.keys());
  };
}

// d) Implement a factory function that creates a new instance of the class

/**
 * A factory function that creates a new instance of the MutableMapImpl class.
 * @returns A new instance of the MutableMapImpl class.
 */
export const createMutableMap = <V>(): MutableMap<V> => {
  return new MutableMapImpl<V>();
};