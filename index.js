const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express().set("json spaces", 2);
const port = 3000;
const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces.wlp4s0);

// app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb", extended: false }));
// app.use(express.urlencoded({ extended: false }));

var driveObject = {
  is_operational: 1,
  drive_mode: "S",
  speed: 10,
  angle: 5,
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
  console.log(`Computer:\thttp://localhost:3000`);
  console.log(
    `Network:\thttp://${networkInterfaces.wlp4s0[0].address}:${port}`
  );
});
