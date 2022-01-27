const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { 
            type: String,
            enum : ['user', 'admin'],
            default: 'user'
        }
    }
)

const User = mongoose.model('user', UserSchema);

module.exports = User;