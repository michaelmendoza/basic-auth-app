const bcrypt = require('bcrypt');
const User = require("../models/user");
const MockUser = require("../mock/users");

const createMockUser = async (req, res) => {

    const mockUser = MockUser.generateUserData();

    // Enforce a unique username for users 
    const userFound = await User.findOne({username: mockUser.username});
    if(userFound) res.status(400).json({ success: false, error: 'Invalid request. Username already exists.' });

    // Generate password hash and store hash in db
    const saltRounds = 10;
    const hash = await bcrypt.hash(mockUser.password, saltRounds);
    const user = new User({ ...mockUser, password:hash });

    if(!user) return res.status(400).json({ success: false, error: err, message: 'Invalid user data.' });

    user.save()
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User created.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not created.'});
        })
}

module.exports = {
    createMockUser
}