const express = require('express');
const router = express.Router();
const con = require('../db/index');
const multer = require('multer');
const path = require("path");

router.get('/', (req, res) => {
    res.render('Post_Write', {});

});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'views/uploads/')
    },
    //파일이름 설정
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) +"-"+ Date.now()+ext);
    }

});

//파일 업로드 모듈
var upload = multer({ storage: storage });

//파일 업로드 및 디비에 위치 저장
router.post('/insert', upload.array('img', 2), (req, res) => {
    let images = req.files;
    let image1 = `/uploads/${images[0].filename}`;

    if(images.length == 1){
        let params = [req.body.title, req.body.content, image1];
        let sql = "INSERT INTO boardTbl (title, content, mimage) VALUES (?, ?, ?);";
        con.query(sql, params, (err, result) => {
            if (err) throw err;
            else console.log("inserted!");
            return res.redirect('/gallery');
        });
    } else {
        let image2 = `/uploads/${images[1].filename}`;
        let params = [req.body.title, req.body.content, image1, image2];
        let sql = "INSERT INTO boardTbl (title, content, mimage, simage) VALUES (?, ?, ?, ?);";
        con.query(sql, params, (err, result) => {
            if (err) throw err;
            else console.log("inserted!");
            return res.redirect('/gallery');
        });
    }
    //파일 위치를 mysql 서버에 저장
 
});

module.exports = router;
