const express = require('express');
const router = express.Router();
const contract = require('../../db/contracts/contracts');

/* GET Contract. */
router.post('/', async function (req, res, next) {
    try {
        res.json(await contract.getContract(req.body));
    } catch (err) {
        console.error(`Error while getting contract `, err.message);
        next(err);
    }
});

/* POST Contract */
router.post('/add', async function (req, res, next) {
    try {
        res.json(await contract.create(req.body));
    } catch (err) {
        console.error(`Error while creating contract`, err.message);
        next(err);
    }
});

module.exports = router;