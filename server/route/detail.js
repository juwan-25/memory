const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");

router.get('/:idx', (req, res) => {
    let sql = "SELECT boardId, title, content, mimage, simage FROM boardTbl WHERE boardId = ?";
    let params = [req.params.idx];
    con.query(sql, params, (err, result) => {
        if (err) throw err;
        else {
            res.render('Post_Details', {
                data: result
            });
        }
    });
});

module.exports = router;
