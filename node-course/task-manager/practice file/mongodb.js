// create CRUD operation.
//.........................

const { ObjectId, MongoClient } = require('mongodb');
const id = ObjectId();
console.log(id, "idd")
console.log(id.id.length)
console.log(id.toHexString().length, "idd")
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = "task-managers";
MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect")
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: "Shameer",
    //     work: "unemployed"
    // }, (error, result) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(result, "insert one")
    //     console.log("connected correctly")
    // })

    db.collection('tasks').insertMany([
        {
            id: id,
            name: "Shameer",
            work: "unemployed",
            completed: true
        }
    ], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result, "insert manyy")
    })

    // findOne
    db.collection('tasks').findOne({ _id: new ObjectId("6195ea6727a87d1956972a7d") }, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result, "insert manyy")
    })
    //same id 
    db.collection('tasks').insertOne({
        _id: id,
        name: 'smr'
    }, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result, "insert manyy")
    })

    // find must be array

    db.collection('tasks').find({ name: "Shameer" }).toArray((error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result, "insert manyy")
    })


    //do not array of findOne
    db.collection('tasks').find({ name: "Shameer" }, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result, "insert manyy")
    })

    // updated FIELD IN COLLECTIONS
    const updateData = db.collection('tasks').updateOne({ _id: new ObjectId("6195fb16acfed17b3a8e13c4") },
        { $set: { name: "Shamewer un improved courage and confidence" } }
    )
    updateData.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    //updateMany
    db.collection('tasks').updateMany({ completed: true }, { $set: { completed: false } }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // delete many
    db.collection('users').deleteMany({ work: "unemployed" }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error)
    })

    //delete one
    db.collection('tasks').deleteOne({ _id: new ObjectId("6195fb0010ba183b1d32566b") }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //delete one
    db.collection('tasks').deleteOne({ _id: new ObjectId("6195fb0010ba183b1d32566b") }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    //delete one
    db.collection('tasks').deleteOne({ work: "unemployed" }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



})