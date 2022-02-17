const supertest = require("supertest");
const app = require("../app").createApp(true);

describe('API root', () => {
  it('API test template', async () => {
      const res = await supertest(app)
      .get("/api")

      expect(res.body[0]).toBe('Welcome to API')
  })
})