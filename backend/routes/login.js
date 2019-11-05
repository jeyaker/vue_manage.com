const express = require('express');

const {
    user
} = require('../db/index');
const router = express.Router();

router.post('/', async (req, res, next) => {
    // console.log(req.body);
    const result = await user.query(req.body).then(res => res).catch(err => err);
    // console.log(result);

    res.render('login', {
        data: JSON.stringify({
            status: result.status,
            info: result.info,
            result: result.data
        })
    });
});


module.exports = router;