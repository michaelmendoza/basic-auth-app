const { createTestUser, createTestAdmin } = require("./users")

const initMockData = async () => {
    console.log('Initializing database ...')
    await createTestUser();
    await createTestAdmin();
    console.log('Initialization complete.')
}

module.exports = {
    initMockData
}