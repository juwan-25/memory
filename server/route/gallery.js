const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");

router.get('/', (req, res) => {
    let sql = "SELECT boardId, title, content, mimage FROM boardTbl ORDER BY reaction DESC, title LIMIT 10;";
    con.query(sql, (err, result1) => {
        if (err) throw err;
        else {
            sql = "SELECT boardId, title, content, mimage FROM boardTbl ORDER BY boardId DESC;";
            con.query(sql, (err, result2) => {
            if (err) throw err;
            else {
                res.render('Post_Gallery', {
                    data1: result1,
                    data2:result2
                });
            }
            });
        }
    });
});

module.exports = router;
