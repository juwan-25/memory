//index.js
const express = require('express');
const app = express();
const port = 5000;
const path = require("path");


//ejs 사용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static('views'));


app.get('/', (req, res) => { 
    res.render('index', {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

//test