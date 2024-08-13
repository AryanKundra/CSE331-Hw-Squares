"use strict";
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
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
// TODO: add tests for your routes
// Tests for saveFile route
it('saveFile', function () {
    // no name
    const req1 = httpMocks.createRequest({
        method: 'POST',
        url: '/api/save',
        body: { value: 'testData' }
    });
    const res1 = httpMocks.createResponse();
    (0, routes_1.saveFile)(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepEqual(res1._getData(), 'Missing "name" parameter');
    routes_1.fileContentsMap.clear();
    // no contents
    const req2 = httpMocks.createRequest({
        method: 'POST',
        url: '/api/save',
        body: { name: 'testName' }
    });
    const res2 = httpMocks.createResponse();
    (0, routes_1.saveFile)(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepEqual(res2._getData(), 'Missing file contents in the request body');
    routes_1.fileContentsMap.clear();
    // fileContentMap set
    const req3 = httpMocks.createRequest({
        method: 'POST',
        url: '/api/save',
        body: { name: 'testName', value: 'testData' }
    });
    const res3 = httpMocks.createResponse();
    (0, routes_1.saveFile)(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), { confirmation: 'File "testName" saved successfully' });
});
// Tests for loadFile route
it('loadFile', function () {
    // file name doesn't exist
    const req1 = httpMocks.createRequest({
        method: 'GET',
        url: '/api/dummy',
        query: {}
    });
    const res1 = httpMocks.createResponse();
    (0, routes_1.loadFile)(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepEqual(res1._getData(), 'Missing "name" parameter');
    // file contents doesn't exist
    const req2 = httpMocks.createRequest({
        method: 'GET',
        url: '/api/dummy',
        query: { name: 'Kevin' }
    });
    const res2 = httpMocks.createResponse();
    (0, routes_1.loadFile)(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 404);
    assert.deepEqual(res2._getData(), 'File not found');
    // valid file contents exist
    routes_1.fileContentsMap.set('Kevin', ['CSE 331', 'Instructor']);
    const req3 = httpMocks.createRequest({
        method: 'GET',
        url: '/api/dummy',
        query: { name: 'Kevin' }
    });
    const res3 = httpMocks.createResponse();
    (0, routes_1.loadFile)(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), { content: ['CSE 331', 'Instructor'] });
});
// Tests for listFiles route
it('listFiles', function () {
    routes_1.fileContentsMap.set('file1', 'Data 1');
    routes_1.fileContentsMap.set('file2', 'Data 2');
    const req1 = httpMocks.createRequest({
        method: 'GET',
        url: '/api/list'
    });
    const res1 = httpMocks.createResponse();
    (0, routes_1.listFiles)(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), { fileNames: ['file1', 'file2'] });
});
afterEach(function () {
    (0, routes_1.resetForTesting)();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQTRGO0FBTTFGLGtDQUFrQztBQUNqQywyQkFBMkI7QUFDM0IsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUNkLFVBQVU7SUFDVixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ25DLE1BQU0sRUFBRSxNQUFNO1FBQ2QsR0FBRyxFQUFFLFdBQVc7UUFDaEIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtLQUM1QixDQUFDLENBQUM7SUFDSCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQzlELHdCQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFeEIsY0FBYztJQUNkLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDbkMsTUFBTSxFQUFFLE1BQU07UUFDZCxHQUFHLEVBQUUsV0FBVztRQUNoQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQzNCLENBQUMsQ0FBQztJQUNILE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMs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