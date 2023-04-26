const express = require('express');
const router = express.Router();
const con = require('../db/index');

router.get('/', (req, res) => {
    let sql = "SELECT content FROM guestTbl ORDER BY guestId DESC;";
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else {
            res.render('guest', {
                data : result
            });
        }
    }); 
});

router.post('/insert', (req, res) => {
    let sql = "INSERT INTO guestTbl (content) VALUES (?);";
    let params = [req.body.message];
    con.query(sql, params, (err, result, fields)=>{
        if(err) throw err;
        else console.log("inserted!");
    }); 
    return res.redirect('/guest');
});

module.exports = router;
