require('../db/mongoose');
const user = require('../models/user');
const task = require('../models/tasks')


//Using promise

// task.findByIdAndDelete('61967cf6af4a09327cf2cd76').then((data) => {
//     console.log(data, "2");
//     return task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result, "3")
// })

//By using Async/wait
const findbyIdandDelete = async (id, boolean) => {
    console.log(id)
    const deleteContent = await task.findByIdAndDelete(id);
    const countDocuments = await task.countDocuments({ completed: boolean })
    console.log(countDocuments, "2")
    return countDocuments
}
//OR other wise Async/wait
const findbyIdandDelete = async (id) => {
    console.log(id)
    const deleteContent = await task.findByIdAndDelete(id);
    const countDocuments = await task.countDocuments({ completed: true })
    console.log(countDocuments, "2")
    return countDocuments
}

findbyIdandDelete('61967d20dde6f60e5e48fd62').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})