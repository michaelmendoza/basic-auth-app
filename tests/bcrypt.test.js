const bcrypt = require('bcrypt');

describe('bcrypt', () => {
    it('password hash test', async () => {
        const saltRounds = 10;
        const password = 'test';
        const hash = await bcrypt.hash(password, saltRounds);

        expect(await bcrypt.compare(password, hash)).toBe(true);
        expect(await bcrypt.compare('other', hash)).toBe(false);
        expect(await bcrypt.compare('test', '$2b$10$kJbcl26JqZYJzTg9f6xeP.iiVea/AW7G.yO23GoDcY3tnis1I6NAu'));
    })
})