const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('Authentication Endpoints', () => {

    async function registerUser(username, password) {
        return request(server).post('/api/auth/register').send({ username, password });
    }


    async function loginUser(username, password) {
        return request(server).post('/api/auth/login').send({ username, password });
    }

    beforeAll(async () => {
        await db.migrate.latest();
    });
    
    afterEach(async () => {
        await db('users').truncate();
    });
    

    describe('Register Endpoint', () => {

        it('should return status 201 for successful registration', async () => {
            const res = await registerUser('test', 'test');
            expect(res.status).toBe(201);
        });

        it('should return the newly created user', async () => {
            const res = await registerUser('test2', 'test2');
            expect(res.body.username).toBe('test2');
        });

    });

    describe('Login Endpoint', () => {

        beforeEach(async () => {

            await registerUser('test', 'test');
        });

        it('should return status 200 for successful login', async () => {
            const res = await loginUser('test', 'test');
            expect(res.status).toBe(200);
        });

        it('should return a token on successful login', async () => {
            const res = await loginUser('test', 'test');
            expect(res.body.token).toBeDefined();
        });

    });

    describe('Jokes Endpoint', () => {
        let token;
    
        beforeAll(async () => {
            await request(server)
                .post('/api/auth/register')
                .send({ username: 'test', password: 'test' });
            const res = await loginUser('test', 'test');
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

    afterAll(async () => {
        await db.destroy();
    });

});

test('sanity', () => {
    expect(true).toBe(true);
});

