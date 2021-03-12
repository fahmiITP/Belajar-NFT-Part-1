const express = require('express');
const router = express.Router();
const token = require('../../db/tokens/tokens');

/* 
    GET User Token. 
    Body should be 
    {
        contract_address = "",
        owner_address = ""
    }
*/
router.post('/', async function (req, res, next) {
    try {
        res.json(await token.getUserTokens(req.body));
    } catch (err) {
        console.error(`Error while getting contract `, err.message);
        next(err);
    }
});

/* POST Contract */
router.post('/add', async function (req, res, next) {
    try {
        res.json(await token.create(req.body));
    } catch (err) {
        console.error(`Error while creating token`, err.message);
        next(err);
    }
});

module.exports = router;