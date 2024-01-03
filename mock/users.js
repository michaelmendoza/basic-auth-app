const { randomInt, randomHexString } = require('../utils/random');
const bcrypt = require('bcrypt');
const User = require("../models/user");

// source: https://www.ssa.gov/oact/babynames/decades/century.html
const maleNames = ['James', 'Robert', 'John', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'];
const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
const names = [maleNames, femaleNames];

// source: https://forebears.io/united-states/surnames
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis', 'Miler', 'Anderson', 'Wilson', 'Garcia'];

const generateName = () => {
    const firstName = names[randomInt(0, 1)][randomInt(0, 9)];
    const lastName = lastNames[randomInt(0, 9)];
    return { firstName, lastName }
}

const generateUserData = () => {
    const name = generateName();

    return {
        username: name.firstName + name.lastName,
        firstName: name.firstName,
        lastName: name.lastName,
        email: 'test@gmail.com',
        password: 'test'
    }
}

const createMockUser = async (_user) => {

    try {
        const mockUser = _user || generateUserData();

        // Enforce a unique username for users 
        const userFound = await User.findOne({username: mockUser.username});
        if(userFound) return;
    
        // Generate password hash and store hash in db
        const saltRounds = 10;
        const hash = await bcrypt.hash(mockUser.password, saltRounds);
        const user = new User({ ...mockUser, password:hash });
        await user.save();
        return user;
    }
    catch(error) {
        console.log('User not created: ', err );
    }
}

const createTestUser = async () => {
    const testUser = {
        username: 'johndoe', 
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'test'
    };

    return await createMockUser(testUser);
}

const createTestUserTwo = async () => {
    const testUser = {
        username: 'janedoe', 
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'test'
    };

    return await createMockUser(testUser);
}

const createTestAdmin = async () => {
    const adminUser = {
        username: 'admin', 
        firstName: 'Adam',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin'
    };

    return await createMockUser(adminUser);
}

module.exports = {
    generateUserData,
    createMockUser,
    createTestUser,
    createTestUserTwo,
    createTestAdmin
}