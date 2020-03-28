const request = require('request');

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1Ijoic3V4eGVlZCIsImEiOiJjazg2YnAydGowYXFzM25tbTI3NWtleTltIn0.UKUIbMxfr72fshPsj1VJaA&limit=1`;

    request({ url, json: true}, (error, { body}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find loaction. Try another search.', undefined);
        } else {
            const lat = body.features[0].center[1];
            const long = body.features[0].center[0];
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;