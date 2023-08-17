const request = require('supertest');
const server = require('../../index.js');

describe('Authentication Endpoints', () => {
    describe('Register Endpoint', () => {
        it('should return status 201 for successful registration', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test', password: 'test' });
            expect(res.status).toBe(201);
        });

        it('should return the newly created user', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test2', password: 'test2' });
            expect(res.body.username).toBe('test2');
        });
    });

    describe('Login Endpoint', () => {
        it('should return status 200 for successful login', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'test' });
            expect(res.status).toBe(200);
        });

        it('should return a token on successful login', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'test' });
            expect(res.body.token).toBeDefined();
        });
    });

    describe('Jokes Endpoint', () => {
        let token;

        beforeAll(async () => {
            // Login to get a token for the protected route tests
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'test' });
            token = res.body.token;
        });

        it('should return status 200 for successful jokes retrieval', async () => {
            const res = await request(server)
                .get('/api/jokes')
                .set('Authorization', token);
            expect(res.status).toBe(200);
        });

        it('should return a list of jokes', async () => {
            const res = await request(server)
                .get('/api/jokes')
                .set('Authorization', token);
            expect(res.body).toBeInstanceOf(Array);
        });

        it('should return status 401 when no token is provided', async () => {
            const res = await request(server).get('/api/jokes');
            expect(res.status).toBe(401);
        });
    });
});

// Your existing test
test('sanity', () => {
  expect(true).toBe(false);  // This will always fail. It's likely a placeholder to check if tests are running.
});

