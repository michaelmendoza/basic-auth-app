const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/user");

const jwtsecret = "make liberty run dynamic stately";

const isAuthorized = async(req, res, next) => {
    //console.log('auth check');

    try {
        const token = req.headers['x-access-token'];
        const decoded = jsonwebtoken.verify(token, jwtsecret);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ success:false, error: 'Invalid token. Token doesn\'t have valid user id. Please login with valid Username and Password.'});

        // Refresh Tokens
        const refreshedToken = jsonwebtoken.sign({ id: decoded.id }, jwtsecret, { expiresIn: 1800 });
        res.header('x-access-token', refreshedToken);
        next();
    }
    catch(error) {
        return res.status(401).json({ success:false, error, message: 'Invalid token. Please login with valid Username and Password.'});
    }
}

const isAdmin = async (req, res, next) => {
    //console.log('admin check');

    try {
        const token = req.headers['x-access-token'];
        const decoded = jsonwebtoken.verify(token, jwtsecret);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ success:false, error: 'Access Denined. User not found.'});

        if (user.role == 'admin')
            next();
        else 
            return res.status(401).json({ success:false, error: 'Access Denined. Must have admin access.'});
    }
    catch(error) {
        return res.status(401).json({ success:false, error, message: 'Invalid token. Please login with valid Username and Password.'});
    }   
}

module.exports = {
    jwtsecret,
    isAuthorized,
    isAdmin
}