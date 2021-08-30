const express = require("express");
const os = require("os");

const app = express().set("json spaces", 2);
const port = 3000;
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

app.use(express.json({ limit: "2mb", extended: false }));
app.use(express.urlencoded({ extended: false }));

var driveObject = {
  is_operational: 1,
  drive_mode: "S",
  speed: 0,
  angle: 0,
};

app.get("/", (req, res) => {
  res.send("Home");
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
  driveObject.is_operational = req.body.is_operational + 0;
  driveObject.drive_mode = req.body.drive_mode + "";
  driveObject.speed = req.body.speed + 0;
  driveObject.angle = req.body.angle + 0;
  res.json({ driveObject });
});

app.post("/arm", (req, res) => {
  console.log("arm post!");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Computer:\thttp://localhost:3000`);
  // Line below only works for Nate's T440p Thinkpad
  console.log(
    `Network:\thttp://${networkInterfaces.wlp4s0[0].address}:${port}`
  );
});
