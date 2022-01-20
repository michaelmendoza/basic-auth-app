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

const create = async (req, res) => {
    
    if(!req.body) {
        return res.status(400).json({ success: false, error: 'Invalid request.' })
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password:hash });

    if(!user) {
        return res.status(400).json({ success: false, error: err, message: 'Invalid user data.' })
    }

    user.save()
        .then(() => {
            return res.status(201).json({ success: true, message: 'User created.', data: { user }  })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not created.'});
        })
}

const createMock = async (req, res) => {

    const mockUser = MockUser.createUser();
    const saltRounds = 10;
    const hash = await bcrypt.hash(mockUser.password, saltRounds);
    const user = new User({ ...mockUser, password:hash });

    if(!user) {
        return res.status(400).json({ success: false, error: err, message: 'Invalid user data.' })
    }

    user.save()
        .then(() => {
            return res.status(201).json({ success: true, message: 'User created.', data: { user }  })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not created.'});
        })
}

const update = (req, res) => {

}

module.exports = {
    find,
    findOne,
    create,
    update,
    createMock
}