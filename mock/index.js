const { createTestUser } = require("./users")

const initMockData = async () => {
    console.log('Initializing database ...')
    await createTestUser();
    console.log('Initialization complete.')
}

module.exports = {
    initMockData
}