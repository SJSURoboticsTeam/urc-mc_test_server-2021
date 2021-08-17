const express = require("express");
const path = require("path");
const bent = require("bent");
const os = require("os");

const app = express().set("json spaces", 2);
const port = 3000;
const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces.wlp4s0);

app.use(express.json({ limit: "2mb", extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

let ip = "";

var driveObject = {
  is_operational: 1,
  drive_mode: "D",
  speed: 0,
  angle: 0,
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/ip", (req, res) => {
  ip = req.body.ip_address;
  console.log(`Obtained ip address: ${ip}`);
  res.redirect("/");
});

app.get("/drive", (req, res) => {
  console.log(driveObject);
  res.jsonp(driveObject);
});

app.post("/drive", (req, res) => {
  driveObject.is_operational = req.body.is_operational;
  driveObject.drive_mode = req.body.drive_mode;
  driveObject.speed = req.body.speed;
  driveObject.angle = req.body.angle;
  console.log(driveObject);
  // res.json({ driveObject });
  res.redirect("/");
});

app.post("/arm", (req, res) => {
  console.log("arm post!");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Computer:\thttp://localhost:3000`);
  console.log(
    `Network:\thttp://${networkInterfaces.wlp4s0[0].address}:${port}`
  );
});
