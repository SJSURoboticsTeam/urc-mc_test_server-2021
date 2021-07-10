const express = require("express");
const path = require("path");
const bent = require("bent");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/views'));

app.set("views", "./views");
app.set("view engine", "ejs");

let ip = "";

var driveObject = {
  is_operational: 1,
  drive_mode: "D",
  speed: 10.0,
  angle: 10.0,
};

app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.render("index");
});

app.post("/ip", (req, res) => {
  ip = req.body.ip_address;
  console.log(`Obtained ip address: ${ip}`);
  res.redirect("/");
});

app.get("/drive", (req, res) => {
  console.log("/drive GET!");
  res.json(driveObject);
});

app.post("/drive", (req, res) => {
  driveObject.is_operational = req.body.is_operational;
  driveObject.drive_mode = req.body.drive_mode;
  driveObject.speed = req.body.speed;
  driveObject.angle = req.body.angle;
  res.json({ driveObject });
});

app.post("/arm", (req, res) => {
  console.log("arm post!");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
