const express = require('express');

const router = express.Router();

const {
    shop
} = require('../db/index.js');

router.route('/')
    .post(async (req, res, next) => {
        const result = await shop.add(req.body);

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.data
            })
        });
    })
    .get(async (req, res, next) => {
        const result = await shop.query();

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.data
            })
        });
    })
    .put(async (req, res, next) => {

        const result = await shop.update(req.query);

        res.render('shop', {
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                result: result.data
            })
        });
    })
    .delete(
        async (req, res, next) => {
            const {
                _id
            } = req.query;

            const result = await shop.del(_id);

            res.render('shop', {
                data: JSON.stringify({
                    info: result.info,
                    status: result.status,
                    result: result.data
                })
            });
        }
    )

module.exports = router;