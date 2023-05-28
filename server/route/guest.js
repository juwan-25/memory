const express = require('express');
const router = express.Router();
const con = require('../db/index');

router.get('/', (req, res) => {
    let perPage = 14; // 한 페이지에 보여줄 게시물 수
    let page = req.query.page || 1; // 현재 페이지 번호 (쿼리스트링으로 전달)
    let sql = "SELECT COUNT(*) AS count FROM guestTbl;";
    con.query(sql, (err, result) => {
        if (err) throw err;
        else {
            let count = result[0].count;
            let totalPage = Math.ceil(count / perPage); // 총 페이지 수 계산
            let start = (page - 1) * perPage; // 시작 게시물 인덱스
            sql = "SELECT content FROM guestTbl ORDER BY guestId DESC LIMIT ?, ?;";
            let params = [start, perPage];
            con.query(sql, params, (err, result) => {
                if (err) throw err;
                else {
                    res.render('guest', {
                        data: result,
                        page: page,
                        totalPage: totalPage
                    });
                }
            });
        }
    });
});

router.post('/insert', (req, res) => {
    let sql = "INSERT INTO guestTbl (content) VALUES (?);";
    let params = [req.body.message];
    con.query(sql, params, (err, result) => {
        if (err) throw err;
        else console.log("inserted!");
        return res.redirect('/guest');
    }); 
});

module.exports = router;
