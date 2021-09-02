const request = require('supertest');
const app = require('../../app');

describe('Test GET/planets', () => {
  test('It should response with 200 success', async () => {
    await request(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200);
  })
})