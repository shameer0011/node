const request = require('request')

const geocode = (place, callback) => {
    const GoeographicUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}json?access_token=pk.eyJ1Ijoic2hhbWVlcnNtciIsImEiOiJja3ZycGN6MHIyZHJvMnFrbHM4Nmh0OXZpIn0.1M8o1xcUodGkCHbBycQrfQ`;
    request({ url: GoeographicUrl, json: true }, (error, { response }) => {
        if (error) {
            callback("Network error", undefined)
        }
        const data = response;
        if (data.body.features.length === 0) {
            callback("Un Available location", undefined)
        } else {

            console.log(data.body.features[0].center[0])
            const latitude = data.body.features[0].center[0];
            const longitude = data.body.features[0].center[1]
            const total = { "long": longitude, "lat": latitude }
            callback(undefined, total)
        }


    })

}
module.exports = geocode;

const wheatherStack = (place, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2f886027f0f5fac2ef9b2c2f73d8c055&query=${place}&units=f`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("This is not avaiulable path", undefined)
        }
        const data = response;
        if (!data) {
            callback("Disconnected network connection")
        }
        if (data.body.error) {
            callback("cannot find location", undefined)
        } else {
            callback(undefined, data.body.current.temperature)
        }
    })

}
module.exports = wheatherStack;