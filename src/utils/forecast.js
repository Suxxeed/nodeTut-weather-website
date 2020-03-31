const request = require('request');


const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/d5d8ab9ef4345efecaf4a0e4e7c6650f/${lat},${long}?units=si`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            calback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find latitude and lontitude. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of ${body.currently.precipType} and the speed of the wind is ${body.currently.windSpeed} km/h.`);
        }
    })
}

module.exports = forecast;