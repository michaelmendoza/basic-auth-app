const supertest = require("supertest");
const app = require("../app").createApp(true);
const db = require("../db");
const User = require("../models/user");
const { createTestUser, createTestAdmin } = require("../mock/users");

let token;
beforeAll(async () => {
    await db.initDB('test-login');
    await createTestUser();
    await createTestAdmin();
});
afterAll(async () => { 
    await User.collection.drop();
    db.getDB().close();
});

describe('Login', () => {
    it('Valid login test', async () => {
        const res = await supertest(app)
            .post("/login")
            .send({username: 'test', password: 'test'})
        const token = res.header['x-access-token'];

        expect(res.status).toBe(200);
        expect(token).toBeTruthy();
    })
})