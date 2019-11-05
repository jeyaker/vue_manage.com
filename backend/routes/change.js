const express = require('express');


const {
    user
} = require('../db/index');
const router = express.Router();

router.put('/', async (req, res, next) => {
    const result = await user.update(req.body).then(res => res).catch(err => err);

    res.render('change', {
        data: JSON.stringify({
            status: result.status,
            info: result.info
        })
    });
});

module.exports = router;