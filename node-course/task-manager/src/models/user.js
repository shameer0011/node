const validator = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('../db/mongoose')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            validate(value) {
                if (value < 0) {
                    throw new Error('Number must be +ve')
                }
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('Password')) {
                    throw new Error('password word  is invalid')
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    }
)

// userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
    const users = this;
    const userObject = users.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
userSchema.methods.generateAuthToken = async function () {
    const users = this;
    const token = jwt.sign({ _id: users._id.toString() }, "thisisnewcourse");
    // console.log(token)
    users.tokens = users.tokens.concat({ token: token });
    // console.log(users.tokens)
    await users.save();
    return token

}

userSchema.statics.findByCredentials = async (email, password) => {
    const users = await user.findOne({ email: email })
    if (!users) {
        throw new Error("Unable to Login!")
    }

    const isMatch = await bcrypt.compare(password, users.password)
    if (!isMatch) {
        throw new Error("Invalid to Login!!")
    }

    return users
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const user = mongoose.model('User', userSchema)
module.exports = user;