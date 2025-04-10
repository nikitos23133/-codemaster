// tests/auth.test.js
const request = require('supertest');
const app = require('../server/app');
const User = require('../server/models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await User.deleteMany();
  });

  test('Регистрация пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'securePass123'
      });
    expect(res.statusCode).toEqual(201);
  });
});
