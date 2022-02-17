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
        .send({username: 'admin', password: 'admin'})
        token = logRes.header['x-access-token'];
});
afterAll(async () => { 
    await User.deleteMany(); 
    db.getDB().close()
});

describe('POST /mock/create_user', () => {
    it('Check get users', async () => {
        const res = await supertest(app)
            .post("/mock/create_user")
            .set('x-access-token', token)

        expect(res.status).toBe(201);
    })
});
