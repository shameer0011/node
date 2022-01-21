const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const routerForUser = require('./routers/user');
const routerForTask = require('./routers/task')
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));


app.use(express.json());


app.use(routerForUser);
app.use(routerForTask);

app.listen(port, () => {
    console.log("running" + port)
})

// const jwt = require('jsonwebtoken');
// const myFn = async () => {
//     const token = jwt.sign({ "id": "1234" }, "thisismytoken", { expiresIn: "2 week" })
//     console.log(token)
//     const data = jwt.verify(token, "thisismytoken")
//     console.log(data)
// }
// myFn()

// app.use((req, res) => {
//     console.log(req.method, req.path)
// })
// app.use((req, res) => {
//     if (req.method === 'GET') {
//         res.send("GEt method blocked")
//     }
// })
// app.use((req,res)=>{
//     req.status(503).send('Site down')
// })