import supertest from 'supertest';
import app from '../index';

// create a request object
const request = supertest(app);

describe('Test main endpoint', () => {
  it('server running correctly', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
