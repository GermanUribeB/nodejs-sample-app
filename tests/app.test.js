const request = require('supertest');
const app = require('../app'); // Make sure to export your app in app.js

describe('GET /', () => {
  it('should return 200 and welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello from Node.js Sample App!');
  });
});
