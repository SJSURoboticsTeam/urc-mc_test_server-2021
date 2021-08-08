const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express().set("json spaces", 2);
const port = 3000;
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb", extended: false }));
app.use(express.urlencoded({ extended: false }));

var driveObject = {
  is_operational: 1,
  drive_mode: "S",
  speed: 25,
  angle: 15,
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/drive", (req, res) => {
  console.log(driveObject);
  // res.send(JSON.stringify(driveObject));
  res.jsonp(driveObject);
});

app.post("/drive", (req, res) => {
  driveObject.is_operational = req.body.is_operational;
  driveObject.drive_mode = req.body.drive_mode;
  driveObject.speed = req.body.speed;
  driveObject.angle = req.body.angle;
  res.json({ driveObject });
});

// app.post("/arm", (req, res) => {
//   console.log("arm post!");
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
