const request = require('supertest');
const { app, server } = require('../index');

describe('GET /', () => {
    it('should return 200 OK and a welcome message', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hi, Welcome to the user service');
    });
});

describe('GET /health', () => {
    it('should return 200 OK and a health message with request data', async () => {
        const payload = {
            testField1: 'testValue',
            testField2: 123,
        };

        const response = await request(app).get('/health').send(payload);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User Service is properly running');
        expect(response.body.data.requestData).toEqual(payload);
    });
});

describe('GET /dashboard/admin', () => {
    it('should return 401 Unauthorized if the user is not logged in', async () => {
        const response = await request(app).get('/dashboard/admin');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    // in the db the user@gmail.com has BASIC_USER role
    it('should return 401 Unauthorized if the user is not an admin', async () => {
        // login as a user with BASIC_USER role
        const loginResponse = await request(app).post('/auth/login').send({
            email: 'user@gmail.com',
            password: '12345678',
        });

        // get the cookie from the login response
        const cookie = loginResponse.headers['set-cookie'];

        const response = await request(app)
            .get('/dashboard/admin')
            .set('Cookie', cookie);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('should return 200 OK and a welcome message if the user is an admin', async () => {
        // login as a user with ADMIN role
        const loginResponse = await request(app).post('/auth/login').send({
            email: 'admin@gmail.com',
            password: 'admin@1234',
        });

        // get the cookie from the login response
        const cookie = loginResponse.headers['set-cookie'];

        const response = await request(app)
            .get('/dashboard/admin')
            .set('Cookie', cookie);

        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Welcome to the admin dashboard');
    });
});

afterAll(async () => {
    server.close();
});
