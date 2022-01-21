const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })


// const user = mongoose.model('User',
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         age: {
//             type: Number,
//             validate(value) {
//                 if (value < 0) {
//                     throw new Error('Number must be +ve')
//                 }
//             }
//         },
//         email: {
//             type: String,
//             required: true,
//             validate(value) {
//                 if (!validator.isEmail(value)) {
//                     throw new Error('Email is invalid')
//                 }
//             }
//         },
//         password: {
//             type: String,
//             required: true,
//             trim: true,
//             minlength: 7,
//             validate(value) {
//                 if (value.toLowerCase().includes('Password')) {
//                     throw new Error('password word  is invalid')
//                 }
//             }
//         }
//     })
// const Users = new user({ name: "shameer", age: 5, email: "shamer@gmail.com", password: "     Passsword" })
// Users.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// const tasks = mongoose.model('Test',
//     {
//         description: {
//             type: String,
//             required: true,
//             trim: true,
//             validate(value) {
//                 if (value.trim()) {
//                     throw new Error('Whitespace is not required')
//                 }
//             }
//         },
//         completed: {
//             type: Boolean,
//             default: false
//         },
//         password: {
//             type: String,
//             required: true,
//             trim: true,
//             minlength: 7,
//             validate(value) {
//                 if (value.toLowerCase().includes('password')) {
//                     throw new Error('password word  is invalidsss')
//                 }
//             }
//         }
//     })
// const createTask = new tasks({ description: "     This is a mongoose library   ", completed: false, password: "phone098" });
// createTask.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })


//passwor hashing
const bcrypt = require('bcryptjs')
const a = async () => {
    const password = 'red123!';
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword)

    const decrption = await bcrypt.compare('red123!', hashedPassword);
    console.log(decrption)

}

a()

//update methods of apis

//update Task by id Better one
router.patch('/tasks/:id', async (req, res) => {
    const reqe = Object.keys(req.body);
    const keys = ['description', 'completed', 'password']
    const isValid = reqe.every((items) => keys.includes(items))
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {
        const updates = await Test.findByIdAndUpdate(req.params.id);
        req.forEach((update) => updates[update] = req.body[update]);
        updates.save();
    } catch (e) {
        res.status(400).send(e)
    }
})
//Another way of updation of apis
router.patch('/tasks/:id', async (req, res) => {
    const reqe = Object.keys(req.body);
    const keys = ['description', 'completed', 'password']
    const isValid = reqe.every((items) => keys.includes(items))
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    const id = req.params.id;
    try {
        const updates = await Test.findByIdAndUpdate(id)
        reqe.forEach((update) => updates[update] = updates[req.body])
        updates.save()
    } catch (e) {
        res.status(400).send(e)
    }
})