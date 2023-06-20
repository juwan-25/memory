const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cors({
    origin: true,
    credentials: true
}));
router.use(cookieParser());
router.use(
    session({
        secret: 'my-secret-key', 
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 60 * 60
        },
    })
);

router.get('/:idx', (req, res) => {
    let s = 'heart'+req.params.idx;

    var begin, end;
    var cook = req.headers.cookie + ";";
    var sidx = cook.indexOf(s, 0);

    cook = cook.substring(sidx, cook.length);     // 문자열 “키2=값2; 키3=값3;” 을 추출한다.
    begin = cook.indexOf('=', 0) + 1;     // 첫번째 “=” 의 위치값 + 1 함으로써                                                                                    //얻고자 하는 값의 시작위치를 가져온다.
    end = cook.indexOf(';', begin);

    let sql = `SELECT boardTbl.boardId, title, boardTbl.content, mimage, simage, reaction, COUNT(commentId) cnt
                FROM boardTbl 
                    JOIN commentTbl
                    ON boardTbl.boardId = commentTbl.boardId
                WHERE boardTbl.boardId = ?`;
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
                        data2: result2,
                        hearted: cook.substring(begin, end),
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

router.post('/:idx/heart', (req, res) => {
    let params = [req.params.idx];
    let s = 'heart'+req.params.idx;

    var begin, end;
    var cook = req.headers.cookie + ";";
    var sidx = cook.indexOf(s, 0);

    cook = cook.substring(sidx, cook.length);     // 문자열 “키2=값2; 키3=값3;” 을 추출한다.
    begin = cook.indexOf('=', 0) + 1;     // 첫번째 “=” 의 위치값 + 1 함으로써                                                                                    //얻고자 하는 값의 시작위치를 가져온다.
    end = cook.indexOf(';', begin);

    console.log(cook.substring(begin, end));
    
    if(cook.substring(begin, end)=='true'){ //쿠키 존재 > 이미 좋아요를 누름 > 좋아요 취소 
        let sql = "UPDATE boardTbl SET reaction = reaction - 1 WHERE boardId = ? ";
        con.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log("updated!");
            res.cookie(s, false);
            return res.redirect(`/details/${req.params.idx}`);
        }); 
    } else {
        let sql = "UPDATE boardTbl SET reaction = reaction + 1 WHERE boardId = ? ";
        con.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log("updated!");
            res.cookie(s, true); 
            
            return res.redirect(`/details/${req.params.idx}`);
        });
    }

        
});


module.exports = router;
