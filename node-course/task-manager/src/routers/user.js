const express = require('express');
const User = require('../models/user')
const auth = require('../middileware/auth')
const router = new express.Router();

// router.get('/test', (req, res) => {
//     res.send("This is the first page")
// })



//create table 'Users'
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, "token": token })
    } catch (e) {
        res.status(500).send(e)
    }

})


//read user table
router.get('/user/total_user', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }

})
//for requester profile
router.get('/user/profile', auth, async (req, res) => {
    res.send(req.user)
})
router.delete('/user/profile', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//for one user by id 
router.get('/user/:id', auth, async (req, res) => {
    const _id = req.params.id;
    // console.log(_id)
    try {
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)

    } catch (e) {
        res.status(500).send(e)
    }

})

//update user by id 
router.patch('/users/:id', async (req, res) => {
    const keysOfReqBody = Object.keys(req.body);
    const values = ['name', 'age', 'email', 'password'];
    const isValid = keysOfReqBody.every((items) => values.includes(items));
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {

        const user = await User.findByIdAndUpdate(req.params.id)
        keysOfReqBody.forEach((update) => user[update] = req.body[update]);
        await user.save()
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//update user profile by auth
router.patch('/user/profile', auth, async (req, res) => {
    console.log(req.user, "user update")
    const keysOfReqBody = Object.keys(req.body);
    const values = ['name', 'age', 'email', 'password'];
    const isValid = keysOfReqBody.every((items) => values.includes(items));
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {

        // const user = await User.findByIdAndUpdate(req.params.id)
        keysOfReqBody.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save()
        if (!req.user) {
            return res.status(404).send();
        }
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/user/logout', auth, async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    try {
        if (authHeader.startsWith("Bearer ")) {
            tokens = authHeader.substring(7, authHeader.length);
            req.user.tokens = req.user.tokens.filter((token) => {
                return tokens !== token.token;
            })
            await req.user.save('You are logouted')
            res.send()
        }
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send("You are logout")
    } catch (e) {
        res.send(e)
    }
})

// Delete user by id 
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id, "dd")
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        // console.log(user)
        if (!user) {
            return res.status(400).send({ error: "This user not valid" })
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Login for User 
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // res.send({ user: user.getPublicProfile(), token })
        res.send({ user: user, token })

    } catch (err) {
        res.status(400).send(err)
    }
})








module.exports = router;