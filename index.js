const express = require('express');
const path = require('path');
const bent = require('bent');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

let ip = ""

let driveObject = {
    is_operational: "1",
    drive_mode: "D",
    speed: "10.0",
    angle: "10.0"
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.post('/ip', (req, res) => {
    ip = req.body;
    res.redirect('/');
});

app.post('/drive', (req, res) => {
    console.log("drive post!");
    res.redirect('/');
});

app.post('/arm', (req, res) => {
    console.log("arm post!");
    res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});