const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");

router.get('/:idx', (req, res) => {
    let sql = "SELECT boardId, title, content, mimage, simage FROM boardTbl WHERE boardId = ?";
    let params = [req.params.idx];
    con.query(sql, params, (err, result1) => {
        if (err) throw err;
        else {
            sql = "SELECT commentId, writer, content FROM commentTbl WHERE boardId = ?  ORDER BY 1 DESC";
            params = [req.params.idx];
            con.query(sql, params, (err, result2) => {
                if (err) throw err;
                else {
                    res.render('Post_Details', {
                        data1: result1,
                        data2: result2
                    });
                }
            });
        }
    });
});

router.post('/:idx/insert', (req, res) => {
    let sql = "INSERT INTO commentTbl (boardId, writer, content) VALUES (?, ?, ?);";
    let params = [req.params.idx, req.body.name, req.body.content];
    con.query(sql, params, (err, result) => {
        if (err) throw err;
        else console.log("inserted!");
        return res.redirect(`/details/${req.params.idx}`);
    }); 
});

module.exports = router;
