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

const createTestUser = async () => {

    const testUser = {
        username: 'test', 
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@gmail.com',
        password: 'test'
    };

    const userFound = await User.findOne({username: testUser.username});
    if(userFound) return;

    const saltRounds = 10;
    const hash = await bcrypt.hash(testUser.password, saltRounds);
    const user = new User({ ...testUser, password:hash });

    user.save()
        .then(() => {
            console.log('Test User created: ', user._doc);
        })
        .catch((err) => {
            console.log('Test User not created: ', err );
        })
}

module.exports = {
    createUser,
    createTestUser
}