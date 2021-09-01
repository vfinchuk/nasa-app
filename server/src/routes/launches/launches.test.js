const request = require('supertest');
const app = require('../../app');

 describe('Test GET/launches', () => {
   test('It should response with 200 success', async () => {
     await request(app)
       .get('/launches')
       .expect('Content-Type', /json/)
       .expect(200)
   })
 });

describe('Test POST/launch', () => {
  const launchDataWithoutDate = {
    mission: 'Kepler experimental IS1',
    rocket: 'Explorer IS-21',
    target: 'Kepler-66 s',
  };

  const completeLaunchData = {
    ...launchDataWithoutDate,
    launchDate: 'October 12, 2024',
  };

  const launchDataWithInvalidDate = {
   ...launchDataWithoutDate,
    launchDate: 'foo'
  };

  test('It should response with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201)

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test('It should catch missing launch properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Missing required launch properties',
    });
  });

  test('It should catch invalid launch date', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
});