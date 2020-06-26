const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic29ueTExMDMiLCJhIjoiY2tibTlyemU4MWdsazJ5cHZ1d2E2aGEyZyJ9.wcVl_8lha0_FSI00t5PqhA&limit=1";

  request({ url: geoUrl, json: true }, (err, response) => {
    if (err) {
      callback("unable to connect..!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        logitute: response.body.features[0].center[0],
        Place: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
