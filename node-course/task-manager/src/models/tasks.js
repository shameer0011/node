const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            // validate(value) {
            //     if (value.trim()) {
            //         throw new Error('Whitespace is not required')
            //     }
            // }
        },
        completed: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            // required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('password word  is invalidsss')
                }
            }
        }
    }
)

userSchema.pre('save', async function (next) {
    const task = this;
    if (task.isModified('password')) {
        task.password = await bcrypt.hash(task.password, 8)
    }
    next()
})

const tasks = mongoose.model('Test', userSchema)
module.exports = tasks;