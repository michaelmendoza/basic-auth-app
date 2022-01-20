const test = require('ava');
const bcrypt = require('bcrypt');

test('bcrypt test', async t => {
    const saltRounds = 10;
    const password = 'test';
    const hash = await bcrypt.hash(password, saltRounds);

    t.truthy(await bcrypt.compare(password, hash));
    t.falsy(await bcrypt.compare('other', hash));
    t.truthy(await bcrypt.compare('test', '$2b$10$kJbcl26JqZYJzTg9f6xeP.iiVea/AW7G.yO23GoDcY3tnis1I6NAu'));
})
