const bcrypt = require('bcrypt');
const User = require("../models/user");

const find = async (req, res) => {
    const options = { limit: 10 };   
    User.find({}, null, options)
        .then((data) => {
            return res.status(200).json({ success: true, message: 'Users found.', data });
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'Users not found.'});
        })
}

const findOne = async (req, res) => {
    User.findOne({ ...req.body })
        .then((data) => {
            return res.status(200).json({ success: true, message: 'User search complete.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not found.'});
        })
}

const findOneByUsername = async (req, res) => {
    try {
        const user = User.findOne({ username: req.params.username }).exec();
        return res.status(200).json({ success: true, message: 'User search complete.', user })
    }
    catch(err) {
        return res.status(400).send({ success: false, error: err, message:'User not found.'});
    }
}

const create = async (req, res) => {
    
    if(!req.body) return res.status(400).json({ success: false, message: 'Error: Invalid request.' });
    
    // Enforce a unique username for users 
    const userFound = await User.findOne({username: req.body.username});
    if(userFound) return res.status(400).json({ success: false, message: 'Error: Username already exists.' });

    // Generate password hash and store hash in db
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password:hash });

    if(!user) return res.status(400).json({ success: false, message: 'Error: Invalid user data.' });

    user.save()
        .then((data) => {
            return res.status(201).json({ success: true, message: 'Success: User created.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'Error: User not created.'});
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
            return res.status(200).json({ success: true, message: 'User updated.', data })

        })
        .catch(() => {
            return res.status(400).send({ success: false, error: err, message:'User not updated.'});
        })
}

const deleteOneByUsername = async (req, res) => {
    try {
        const data = await User.findOneAndDelete({ username:req.body.username });
        return res.status(200).json({ success: true, message: 'User deleted.', data })
    }
    catch (error) {
        return res.status(400).send({ success: false, error: 'Error: User not found', message:'Unable to delete user.'});
    }
}

module.exports = {
    find,
    findOne,
    findOneByUsername,
    create,
    update,
    deleteOne: deleteOneByUsername
}