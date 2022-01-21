const request = require('request');
const geoCode = require('./utils');
const wheatherStack = require('./utils')

geoCode('india', (error, data) => {
    console.log(error, "25 1")
    console.log(data, "25 2")

});
wheatherStack('india', (error, data) => {
    console.log(error, "error section1");
    console.log(data, "error section2")
})