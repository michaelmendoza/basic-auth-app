const bcrypt = require('bcrypt');
const User = require("../models/user");
const MockUser = require("../mock/users");

const find = async (req, res) => {
    const options = { limit: 10 };   
    User.find({}, null, options)
        .then((data) => {
            return res.status(201).json({ success: true, message: 'Users found.', data });
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'Users not found.'});
        })
}

const findOne = (req, res) => {
    User.findById(req.body.id)
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User found.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not found.'});
        })
}

const findOneByUsername = (req, res) => {
    User.find({ username: req.body.username })
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User found.', data });
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not found.'});
        })
}

const create = async (req, res) => {
    
    if(!req.body) return res.status(400).json({ success: false, error: 'Invalid request.' });
    
    // Enforce a unique username for users 
    const userFound = await User.findOne({username: req.body.username});
    if(userFound) res.status(400).json({ success: false, error: 'Invalid request. Username already exists.' });

    // Generate password hash and store hash in db
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password:hash });

    if(!user) return res.status(400).json({ success: false, error: err, message: 'Invalid user data.' });

    user.save()
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User created.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not created.'});
        })
}

const createMock = async (req, res) => {

    const mockUser = MockUser.createUser();

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

const update = async (req, res) => {

    if(!req.body) return res.status(400).json({ success: false, error: 'Invalid request.' });
    
    const query = { username: req.body.username };
    const update = { ...req.body };

    if(update.password) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(mockUser.password, saltRounds);
        update.password = hash;
    }

    User.findOneAndUpdate(query, update)
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User updated.', data })

        })
        .catch(() => {
            return res.status(400).send({ success: false, error: err, message:'User not updated.'});

        })
}

module.exports = {
    find,
    findOne,
    findOneByUsername,
    create,
    update,
    createMock
}