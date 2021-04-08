import request from 'supertest';
import { inspect } from 'util';

import { createApp } from '../src/main';

const d = (o: any) =>
  console.log(inspect(o, { colors: true, depth: null, compact: true }));

describe('app', () => {
  let app: any;
  let server: any;
  beforeAll(async () => {
    app = await createApp({ logger: false });
    server = app.getHttpServer();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('smoke', async () => {
    const result = await request(server)
      .get('/api')
      .expect(200)
      .then(response => response.body);

    expect(result).toBeTruthy();
    expect(result).toEqual({ message: 'Welcome to api!' });
  });
});
