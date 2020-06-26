const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3d01b321b750bf60405286d4de9074d9&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("unable to connect..!", undefined);
    } else if (res.body.err) {
      callback("unable to find location..!", undefined);
    } else {
      callback(undefined, {
        Temperature:
          "Temperature is " +
          res.body.current.temperature +
          ", but it feels like " +
          res.body.current.feelslike,
        Description:
          "It is " +
          res.body.current.weather_descriptions[0] +
          " with wind speed of " +
          res.body.current.wind_speed +
          " and humidity of " +
          res.body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
