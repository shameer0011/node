const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/user');
const Test = require('./models/tasks');
const { findOneAndDelete, findByIdAndDelete } = require('./models/user');
app.use(express.json());

app.listen(port, () => {
    console.log("running" + port)
})

//create table 'Users'
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    //Another way
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.send(e)
    // })
})


//read user table
app.get('/user/total_user', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.status(201).send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//for one user by id 
app.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    console.log(_id)
    try {
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)

    } catch (e) {
        res.status(500).send(e)
    }

    // User.findById({ _id }).then((user) => {
    //     if (!user) {
    //         res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//update user by id 
app.patch('/users/:id', async (req, res) => {
    const keysOfReqBody = Object.keys(req.body);
    const values = ['name', 'age', 'email', 'password'];
    const isValid = keysOfReqBody.every((items) => values.includes(items));
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user by id 
app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id, "dd")
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log(user)
        if (!user) {
            return res.status(400).send({ error: "This user not valid" })
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// create table '`````'
app.post('/tasks', async (req, res) => {
    const tasks = new Test(req.body);
    try {
        await tasks.save();
        res.status(201).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // tasks.save().then(() => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

// create all task from table 'Test'

app.get('/task/all_tasks', async (req, res) => {
    try {
        const allTask = await Test.find({});
        res.status(200).send(allTask)
    } catch (e) {
        res.status(500).send(e)
    }

    // Test.find({}).then((allTasks) => {
    //     res.send(allTasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//get one task by id
app.get('/task/all_tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const ids = await Test.findById({ _id });
        if (!ids) {
            res.status(400).send()
        }
        res.status(200).send(ids)
    } catch (e) {
        res.status(500).send(e)
    }
    // Test.findById({ _id }).then((result) => {
    //     if (!result) {
    //         res.status(404).send()
    //     }
    //     res.send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//update Task by id 
app.patch('/tasks/:id', async (req, res) => {
    const reqe = Object.keys(req.body);
    const keys = ['description', 'completed', 'password']
    const isValid = reqe.every((items) => keys.includes(items))
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    const id = req.params.id;
    try {
        const update = await Test.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).send(update)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Delete task by id 
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id, "dd")
    try {
        const task = await Test.findByIdAndDelete(req.params.id);
        console.log(task)
        if (!task) {
            return res.status(400).send({ error: "This user not valid" })
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


//JWT Tokens

const jwt = require('jsonwebtoken');
const myFn = async () => {
    const token = jwt.sign({ "id": "1234" }, "thisismytoken", { expiresIn: "2 week" })
    console.log(token)
    const data = jwt.verify(token, "thisismytoken")
    console.log(data)
}
myFn()
