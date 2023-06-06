const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");

router.get('/', (req, res) => {
    let sql = "SELECT title, content, mimage FROM boardTbl ORDER BY reaction DESC, title LIMIT 10;";
    con.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.render('Post_Gallery', {
                data: result
            });
        }
    });
});

module.exports = router;
