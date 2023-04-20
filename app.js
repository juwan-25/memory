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


app.get('/', (req, res) => {
  con.connect((err)=>{
    if(err) throw err;
    console.log('Connected!!');
  }); 
    res.render('index', {});

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//test11