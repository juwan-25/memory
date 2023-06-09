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
const detailsRouter = require('./server/route/detail');

app.get('/', (req, res) => {
  res.render('index', {});

});

app.use('/guest', guestRouter);

app.use('/details', detailsRouter);

app.use('/gallery', galleryRouter);

app.use('/write', writeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//test11
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));