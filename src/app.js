const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const startpath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebar engines and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(startpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sonali",
  });
});
app.get("/index/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Sonali",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Sonali",
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Sonali",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Sonali",
  });
});
app.get("/about/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Sonali",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address to get weather details",
    });
  }
  geocode(req.query.address, (err, { latitude, logitute, Place } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(latitude, logitute, (error, { Temperature, Description }) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        place: req.query.address,
        location: Place,
        forecast: Temperature,
        description: Description,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Sonali",
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
