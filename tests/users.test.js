const supertest = require("supertest");
const app = require("../app").createApp(true);
const db = require("../db");
const User = require("../models/user");
const { createTestUser, createTestAdmin } = require("../mock/users");

let token;
beforeAll(async () => {
    await db.initDB('test');
    await createTestUser();
    await createTestAdmin();

    const logRes = await supertest(app)
        .post("/login")
        .send({username: 'test', password: 'test'})
        token = logRes.header['x-access-token'];
});
afterAll(async () => { 
    await User.deleteMany(); 
    db.getDB().close()
});

describe('GET /user/', () => {
    it('Check get users', async () => {
        const res = await supertest(app)
            .get("/users")
            .set('x-access-token', token)

        expect(res.status).toBe(201);
        expect(res.body.data.length).toBe(2);
    })
});

describe('GET /user/:username', () => {
    it('Check valid username', async () => {
        const res = await supertest(app)
            .get("/users/test")
            .set('x-access-token', token)
    
        expect(res.status).toBe(201);
        expect(res.body.data.username).toBe('test');
    })
    
    it('Check invalid username', async () => {
        const res = await supertest(app)
            .get("/users/nottest")
            .set('x-access-token', token)
    
        expect(res.status).toBe(400);
    })
})

describe('POST  /user/create', () => {
    it('Check create test user', async () => {

        const resCreate = await supertest(app)
            .post("/users/create")
            .send({
                username: 'test2', 
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'test@gmail.com',
                password: 'test'
            })
            .set('x-access-token', token)

        expect(resCreate.status).toBe(201);
    })
});

describe('DELETE  /user/', () => {
    it('Check create/deleting test user', async () => {

        const resDelete = await supertest(app)
            .delete("/users/delete")
            .send({ username: 'test2' })
            .set('x-access-token', token)

        const resCheck = await supertest(app)
            .get("/users/test2")
            .set('x-access-token', token)

        expect(resDelete.status).toBe(201);
        expect(resCheck.status).toBe(400);
    })
});