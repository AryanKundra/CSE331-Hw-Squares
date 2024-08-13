"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetForTesting = exports.listFiles = exports.loadFile = exports.saveFile = exports.fileContentsMap = exports.dummy = void 0;
const express_1 = __importDefault(require("express"));
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const dummy = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing "name" parameter');
        return;
    }
    res.send({ greeting: `Hi, ${name}` });
};
exports.dummy = dummy;
/**
 * A map storing the contents of a file with its respective name
 */
exports.fileContentsMap = new Map();
/**
 * Saves the contents of a file with a given name
 * @param req request to respond to
 * @param res object to send response with
 */
const saveFile = (req, res) => {
    const fileName = first(req.body.name);
    const fileContents = req.body.content;
    if (!fileName) {
        res.status(400).send('Missing "name" parameter');
        return;
    }
    if (fileContents === undefined) {
        res.status(400).send('Missing file contents in the request body');
        return;
    }
    exports.fileContentsMap.set(fileName, fileContents);
    res.send({ confirmation: `File "${fileName}" saved successfully` });
};
exports.saveFile = saveFile;
/**
 * Loads the last-saved contents of a file with a given name
 * @param req request to respond to
 * @param res object to send response with
 */
const loadFile = (req, res) => {
    const fileName = first(req.query.name);
    if (fileName === undefined) {
        res.status(400).send('Missing "name" parameter');
        return;
    }
    const fileContents = exports.fileContentsMap.get(fileName);
    if (fileContents === undefined) {
        res.status(404).send('File not found');
        return;
    }
    res.send({ content: fileContents });
};
exports.loadFile = loadFile;
/**
 * Lists the names of all files currently saved
 * @param req request to respond to
 * @param res object to send response with
 */
const listFiles = (_req, res) => {
    const fileNames = Array.from(exports.fileContentsMap.keys());
    res.send({ fileNames });
};
exports.listFiles = listFiles;
// Helper to return the (first) value of the parameter if any was given.
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/**
 * Resets the fileContentsMap for testing purposes
 */
const resetForTesting = () => {
    exports.fileContentsMap.clear();
};
exports.resetForTesting = resetForTesting;
// Set up the Express server and routes
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/save', exports.saveFile);
app.get('/load', exports.loadFile);
app.get('/names', exports.listFiles);
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBcUQ7QUFRckQ7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDakUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDakQsT0FBTztLQUNSO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUM7QUFSVyxRQUFBLEtBQUssU0FRaEI7QUFFRjs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQztBQUVoRjs7OztHQUlHO0FBQ0ksTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNwRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUV0QyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7SUFFRCxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMs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