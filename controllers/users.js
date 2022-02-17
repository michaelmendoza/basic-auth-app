const bcrypt = require('bcrypt');
const User = require("../models/user");

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

const findOne = async (req, res) => {
    User.findOne({ ...req.body })
        .then((data) => {
            return res.status(201).json({ success: true, message: 'User found.', data })
        })
        .catch((err) => {
            return res.status(400).send({ success: false, error: err, message:'User not found.'});
        })
}

const findOneByUsername = async (req, res) => {
    User.findOne({ username: req.params.username })
        .then((data) => {
            if (data)
                return res.status(201).json({ success: true, message: 'User found.', data })
            else
                return res.status(400).send({ success: false, message:'User not found.', data:[]});
        })
        .catch((err) => {
            return res.status(500).send({ success: false, error: err, message:'User not found.'});
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

const deleteOne = async (req, res) => {
    const user = await User.findOne({ ...req.body })
    if (user) {
        try {
            const data = await User.deleteOne({username: user.username});
            return res.status(201).json({ success: true, message: 'User delete.', data })
        }
        catch (error) {
            return res.status(500).send({ success: false, error: err, message:'Unable to delete user.'});
        }
    }
    else {
        return res.status(500).send({ success: false, error: 'Error: User not found', message:'Unable to delete user.'});

    }
}

module.exports = {
    find,
    findOne,
    findOneByUsername,
    create,
    update,
    deleteOne
}