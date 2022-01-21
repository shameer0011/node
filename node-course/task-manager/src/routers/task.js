const express = require('express');
const Test = require('../models/tasks')
const router = new express.Router();


// routerForTask.get('/test', (req, res) => {
//     res.send('this is task')
// })

// create table 'Test'
router.post('/tasks', async (req, res) => {
    const tasks = new Test(req.body);
    try {
        await tasks.save();
        res.status(201).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// create all task from table 'Test'

router.get('/task/all_tasks', async (req, res) => {
    try {
        const allTask = await Test.find({});
        res.status(200).send(allTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get one task by id
router.get('/task/all_tasks/:id', async (req, res) => {
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
})

//update Task by id 
router.patch('/tasks/:id', async (req, res) => {
    const reqe = Object.keys(req.body);
    const keys = ['description', 'completed', 'password']
    const isValid = reqe.every((items) => keys.includes(items))
    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }
    try {
        const _id = req.params.id;
        const task = await Test.findById(_id);
        reqe.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        if (!task) {
            return res.status(404).send({ error: 'invalid id' });
        }
        res.send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})


// Delete task by id 
router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router;
