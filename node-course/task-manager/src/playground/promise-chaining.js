require('../db/mongoose');
const user = require('../models/user');
const task = require('../models/tasks')

// require('../models/user');
// user.findByIdAndUpdate('61967884fd86381f79489eda', { age: 40 }).then((result) => {
//     console.log(result);
//     return user.countDocuments({ age: 5 })
// }).then((total) => {
//     console.log(total)
// })

// task.findByIdAndDelete('61967cf6af4a09327cf2cd76').then((data) => {
//     console.log(data, "2");
//     return task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result, "3")
// })


//using async /wait

const findByIdandDelete = async (id, age) => {
    const findDelete = await user.findByIdAndUpdate(id, { age: age });
    const count = await user.countDocuments({ age: age });
    return count
}
findByIdandDelete('61967884fd86381f79489eda', 900).then((result) => {
    console.log(result, "4")
}).catch((e) => {
    console.log(e)
})

//using async /wait
const deleteDoc = async (id, boolean) => {
    const deleteItem = await task.findByIdAndDelete(id);
    return await task.countDocuments({ completed: boolean })

}
deleteDoc('61967e11a2b65686c36ba038', true).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})