// create CRUD operation.
//.........................

const { ObjectId, MongoClient } = require('mongodb');
const id = ObjectId();
console.log(id, "idd")
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = "task-managers";
MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect")
    }
    const db = client.db(databaseName)


    // updated FIELD IN COLLECTIONS
    // const updateData = db.collection('tasks').updateOne({ _id: new ObjectId("6195fb16acfed17b3a8e13c4") },
    //     { $set: { name: "Shamewer un improved courage and confidence" } }
    // )
    // updateData.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // DON'T USE FUNCTION LIKE UPDATE
    // db.collection('tasks').updateOne({ _id: new ObjectId("6195fb16acfed17b3a8e13c4") },
    //     { $set: { name: "Shamewer IS improved courage and confidence" } }
    // )
    //     .then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })


    // db.collection('tasks').updateMany({ completed: true }, { $set: { completed: false } }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    db.collection('users').deleteMany({ work: "unemployed" }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error)
    })


})