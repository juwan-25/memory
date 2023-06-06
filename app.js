//index.js
const express = require('express');
const app = express();
const port = 5000;
const path = require("path");
const mysql = require('mysql');
const con = require('./server/db/index');


//ejs 사용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static('views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//router 사용
const guestRouter = require('./server/route/guest');
const writeRouter = require('./server/route/write');
const galleryRouter = require('./server/route/gallery');

app.get('/', (req, res) => {
    res.render('index', {});

});

app.use('/guest', guestRouter);


app.get('/details', (req, res) => {
  res.render('Post_Details', {});

});

app.use('/gallery', galleryRouter);

app.use('/write', writeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//test11


