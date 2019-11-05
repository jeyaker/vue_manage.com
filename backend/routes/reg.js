const express = require('express');

const router = express.Router(); // 路由对象
const {
    user
} = require('../db/index');

router.post('/', async (req, res, next) => {
    // console.log(req.body);

    const result = await user.add(req.body).then(res => res).catch(err => err);

    res.render('reg', {
        data: JSON.stringify({
            status: result.status,
            info: result.info
        })
    });
});

module.exports = router;