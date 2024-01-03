const { createMockMessage } = require("./messages");
const { createTestUser, createTestUserTwo, createTestAdmin } = require("./users")

const initMockData = async () => {
    console.log('Initializing database ...')
    const test = await createTestUser();
    const test2 = await createTestUserTwo();
    const admin = await createTestAdmin();
    await createMockMessage({ sender: test, receiver: test2 });
    console.log('Initialization complete.')
}

module.exports = {
    initMockData
}