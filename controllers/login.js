const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { jwtsecret } = require('../middleware/auth');

const loginWithPassword = async (req, res) => {
    //console.log('login');

    try {
        const user = await User.findOne({ 'username': req.body.username }).exec();
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            var token = jsonwebtoken.sign({ id: user._id }, jwtsecret, { expiresIn: 1800 });
            res.append('Access-Control-Allow-Headers', 'x-access-token');
            res.append('x-access-token', token);
            return res.status(200).json({ success: true, message: 'User Authenticated.', data:{ username:user.username } });
        }
        else {
            return res.status(401).send({ success: false, error: "Invalid Password." });

        }
    }
    catch(err) {
        return res.status(401).send({ success: false, error: err, message: "Invalid Username and/or Password." });
    }
}

module.exports = {
    loginWithPassword
}