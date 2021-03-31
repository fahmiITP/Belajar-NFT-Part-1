const express = require("express");
const router = express.Router();
const marketplace = require("../../db/marketplace/marketplace");

/* 
    GET all on-sale token
*/
router.post("/", async function (req, res, next) {
  try {
    res.json(await marketplace.getAllOnSaleToken());
  } catch (err) {
    console.error(`Error while getting tokens `, err.message);
    next(err);
  }
});

module.exports = router;
