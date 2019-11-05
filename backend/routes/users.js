const express = require('express');
const router = express.Router();

const {
  user
} = require('../db/index');

/* GET users listing. */
router.route('/')
  .post(async (req, res, next) => {
    const result = await user.query().then(res => res).catch(err => err);

    res.render('users', {
      data: JSON.stringify({
        info: result.info,
        status: result.status,
        result: result.data,
      })
    });
  })
  .delete(async (req, res, next) => {
    const {
      _id
    } = req.query;

    const result = await user.del(_id);

    res.render('users', {
      data: JSON.stringify({
        info: result.info,
        status: result.status,
        result: result.data
      })
    });
  })

module.exports = router;