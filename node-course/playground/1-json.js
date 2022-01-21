const fs = require('fs');
const detail = {
    name: "shameer",
    suffer: "i can't"
}
const string = JSON.stringify(detail)
fs.writeFileSync('1-json.json', string)

const databuffer = fs.readFileSync('1-json.json');
const last = JSON.parse(databuffer);
last.name = "smr",
    last.suffer = "easy to handle"
console.log(last, "hhhh")
const user = JSON.stringify(last)
fs.writeFileSync('1-json.json', user)


