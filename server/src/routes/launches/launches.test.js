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

describe('Test DELETE/launch', () => {

  const abortedLaunchDataWithoutDate = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: false,
    success: false,
  }

  const abortedLaunchData = {
    ...abortedLaunchDataWithoutDate,
    launchDate: 'December 27, 2030',
  }

  test('Is should response with 200 success', async () => {
    const response = await request(app)
      .delete(`/launches/${abortedLaunchData.flightNumber}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const responseDate = new Date(response.body.launchDate).valueOf();
    const requestDate = new Date(abortedLaunchData.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(abortedLaunchDataWithoutDate);
  });

  test('It should catch launch not found', async () => {
    const response = await request(app)
      .delete('/launches/:id')
      .expect(404);

    expect(response.body).toStrictEqual({
      error: 'Launch not found'
    })
  });
})