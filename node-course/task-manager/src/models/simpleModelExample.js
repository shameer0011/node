const mongoose = require('mongoose');
const tasks = mongoose.model('Test',
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
    })
module.exports = tasks;

