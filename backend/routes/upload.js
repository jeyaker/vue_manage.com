const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();

let url = '';

// 关于图片的磁盘处理
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(__dirname);
        cb(null, path.join(__dirname, '../public/upload'));
    },
    filename: function (req, file, cb) {
        const name = 'upload-' + Date.now() + file.originalname.slice(file.originalname.indexOf('.')); // 获取图片类型
        cb(null, name);

        url = 'http://localhost:3000/upload/' + name;
        // console.log(url);
    }
})

var upload = multer({ storage: storage })


router.post('/', upload.any(), (req, res, next) => {
    // console.log(req);

    res.render('upload', {
        data: JSON.stringify({
            info: '上传成功',
            status: 2,
            url: url
        })
    });
});

module.exports = router;