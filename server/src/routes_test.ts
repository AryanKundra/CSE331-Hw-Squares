import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { listFiles, resetForTesting, saveFile, loadFile, fileContentsMap } from './routes';





  // TODO: add tests for your routes
   // Tests for saveFile route
   it('saveFile', function() {
    // no name
    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/api/save',
      body: { value: 'testData' }
    });
    const res1 = httpMocks.createResponse();
    saveFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepEqual(res1._getData(), 'Missing "name" parameter');
    fileContentsMap.clear();

    // no contents
    const req2 = httpMocks.createRequest({
      method: 'POST',
      url: '/api/save',
      body: { name: 'testName' }
    });
    const res2 = httpMocks.createResponse();
    saveFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepEqual(res2._getData(), 'Missing file contents in the request body');
    fileContentsMap.clear();

    // fileContentMap set
    const req3 = httpMocks.createRequest({
      method: 'POST',
      url: '/api/save',
      body: { name: 'testName', value: 'testData' }
    });
    const res3 = httpMocks.createResponse();
    saveFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), { confirmation: 'File "testName" saved successfully' });
  });

  // Tests for loadFile route
  it('loadFile', function() {
    // file name doesn't exist
    const req1 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/dummy',
      query: {}
    });
    const res1 = httpMocks.createResponse();
    loadFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepEqual(res1._getData(), 'Missing "name" parameter');

    // file contents doesn't exist
    const req2 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/dummy',
      query: { name: 'Kevin' }
    });
    const res2 = httpMocks.createResponse();
    loadFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 404);
    assert.deepEqual(res2._getData(), 'File not found');

    // valid file contents exist
    fileContentsMap.set('Kevin', ['CSE 331', 'Instructor']);
    const req3 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/dummy',
      query: { name: 'Kevin' }
    });
    const res3 = httpMocks.createResponse();
    loadFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), { content: ['CSE 331', 'Instructor'] });
  });

  // Tests for listFiles route
  it('listFiles', function() {
    fileContentsMap.set('file1', 'Data 1');
    fileContentsMap.set('file2', 'Data 2');
    const req1 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/list'
    });
    const res1 = httpMocks.createResponse();
    listFiles(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), { fileNames: ['file1', 'file2'] });
    
  });
  afterEach(function() {
    resetForTesting();
  });

 
