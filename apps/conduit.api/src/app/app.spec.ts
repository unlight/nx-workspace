import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createApp } from '../main';

let app: INestApplication;
let server: any;

beforeAll(async () => {
  app = await createApp({ logger: true });
  server = app.getHttpServer();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('welcome', () => {
  it('welcome message from api', async () => {
    const response = await request(server)
      .get('/api')
      .then(r => r.body);
    expect(response.message).toEqual('Welcome to conduit.api!');
  });
});

describe('user', () => {
  it('registration invalid values empty', async () => {
    const response = await request(server)
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send({ user: { email: '', username: '', password: '' } })
      .then(r => r);
    expect(response.body).toBeTruthy();
    expect(response.status).toEqual(400);
  });

  it('registration create user', async () => {
    const response = await request(server)
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send({
        user: {
          email: 'dado@vinification.org',
          username: 'Pansy',
          password: 'password',
        },
      })
      .then(r => r);
    expect(response).toEqual(
      expect.objectContaining({
        status: 201,
      }),
    );
  });
});
