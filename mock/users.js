const { randomInt, randomHexString } = require('../utils/random');

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

const createUser = () => {
    const name = generateName();

    return {
        username: name.firstName + name.lastName,
        firstName: name.firstName,
        lastName: name.lastName,
        email: 'test@gmail.com',
        password: 'test'
    }
}

const createTestUser = () => {
    return {
        username: test, 
        firstName: John,
        lastNames: Doe,
        email: 'test@gmail.com',
        password: 'test'
    }
}

module.exports = {
    createUser,
    createTestUser
}