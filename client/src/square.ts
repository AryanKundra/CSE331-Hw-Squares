import { List,nil,cons } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/** 
 * Converts a string to a color (or throws an exception if not a color). 
 * @param s string to convert to color
 */
export const toColor = (s: string): Color => {
  switch (s) {
    case "white": case "red": case "orange": case "yellow":
    case "green": case "blue": case "purple":
      return s;

    default:
      throw new Error(`unknown color "${s}"`);
  }
};

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

/** 
 * Returns a solid square of the given color. 
 * @param color of square to return
 * @returns square of given color
 */
export const solid = (color: Color): Square => {
  return {kind: "solid", color: color};
};

/** 
 * Returns a square that splits into the four given parts. 
 * @param nw square in nw corner of returned square
 * @param ne square in ne corner of returned square
 * @param sw square in sw corner of returned square
 * @param se square in se corner of returned square
 * @returns new square composed of given squares
 */
export const split =
    (nw: Square, ne: Square, sw: Square, se: Square): Square => {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
};

export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;


/** 
 * Creats a JSON representation of given Square. 
 * @param sq to convert to JSON
 * @returns JSON describing the given square
 */
export const toJson = (sq: Square): unknown => {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
};

/** 
 * Converts a JSON description to the Square it describes. 
 * @param data in JSON form to try to parse as Square
 * @returns a Square parsed from given data
 */
export const fromJson = (data: unknown): Square => {
  if (typeof data === 'string') {
    return solid(toColor(data))
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}
/**
 * Given a square and a path, retrieves the root of the subtree at that location.
 * @param square The square to search within
 * @param path The path to follow
 * @returns The root of the subtree at the given path
 * @throws Error if the path does not exist
 */
export const getSubtreeRoot = (square: Square, path: Path): Square => {
  
  if (path.kind === "nil") {
    return square;
  }
  
  if (square.kind === "solid") {
    throw new Error("Path does not exist in a solid square");
  }

   const dir = path.hd;
  const remainingPath = path.tl;

  switch (dir) {
    case "NW":
      return getSubtreeRoot(square.nw, remainingPath);
    case "NE":
      return getSubtreeRoot(square.ne, remainingPath);
    case "SW":
      return getSubtreeRoot(square.sw, remainingPath);
    case "SE":
      return getSubtreeRoot(square.se, remainingPath);
    default:
      throw new Error("Invalid direction");
  }
};

/**
 * Given a square, a path, and a second square, returns a new square that is the same as the first one 
 * except that the subtree whose root is at the given path is replaced by the second square.
 * @param square The original square
 * @param path The path to the subtree to replace
 * @param newSquare The new square to insert
 * @returns A new square with the subtree replaced
 * @throws Error if the path does not exist
 */
export const replaceSubtree = (square: Square, path: Path, newSquare: Square): Square => {
  if (path.kind === "nil") {
    return newSquare;
  }

  if (square.kind === "solid") {
    throw new Error("Path does not exist in a solid square");
  }

  const dir = path.hd;
  const remainingPath = path.tl;
  
  switch (dir) {
    case "NW":
      return split(replaceSubtree(square.nw, remainingPath, newSquare), square.ne, square.sw, square.se);
    case "NE":
      return split(square.nw, replaceSubtree(square.ne, remainingPath, newSquare), square.sw, square.se);
    case "SW":
      return split(square.nw, square.ne, replaceSubtree(square.sw, remainingPath, newSquare), square.se);
    case "SE":
      return split(square.nw, square.ne, square.sw, replaceSubtree(square.se, remainingPath, newSquare));
    default:
      throw new Error("Invalid direction");
  }
};

/**
 * Returns a new Path that excludes the last element of the given Path.
 * @param path The original Path
 * @returns A new Path without the last element
 */
export const dropLast = (path: Path): Path => {
  if (path.kind === "nil") {
    throw new Error("Cannot drop last element from an empty path");
  }

  const hd = path.hd;
  const tl = path.tl;
  if (tl.kind === "nil") {
    return nil;
  }

  return cons(hd, dropLast(tl));
};