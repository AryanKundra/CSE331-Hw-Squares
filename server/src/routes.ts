import express, { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

/** 
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  res.send({greeting: `Hi, ${name}`});
};

/**
 * A map storing the contents of a file with its respective name
 */
export const fileContentsMap: Map<string, unknown> = new Map<string, unknown>();

/** 
 * Saves the contents of a file with a given name 
 * @param req request to respond to
 * @param res object to send response with
 */
export const saveFile = (req: SafeRequest, res: SafeResponse): void => {
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

  fileContentsMap.set(fileName, fileContents);
  res.send({ confirmation: `File "${fileName}" saved successfully` });
};

/** 
 * Loads the last-saved contents of a file with a given name 
 * @param req request to respond to
 * @param res object to send response with
 */
export const loadFile = (req: SafeRequest, res: SafeResponse): void => {
  const fileName = first(req.query.name);

  if (fileName === undefined) {
    res.status(400).send('Missing "name" parameter');
    return;
  }

  const fileContents = fileContentsMap.get(fileName);

  if (fileContents === undefined) {
    res.status(404).send('File not found');
    return;
  }

  res.send({ content: fileContents });
};

/** 
 * Lists the names of all files currently saved 
 * @param req request to respond to
 * @param res object to send response with
 */
export const listFiles = (_req: SafeRequest, res: SafeResponse): void => {
  const fileNames = Array.from(fileContentsMap.keys());
  res.send({ fileNames });
};

// Helper to return the (first) value of the parameter if any was given.
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/** 
 * Resets the fileContentsMap for testing purposes 
 */
export const resetForTesting = (): void => {
  fileContentsMap.clear();
};

// Set up the Express server and routes
const app: express.Application = express();
app.use(express.json());
app.post('/save', saveFile);
app.get('/load', loadFile);
app.get('/names', listFiles);

