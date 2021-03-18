const express = require("express");
const router = express.Router();
const contract = require("../../db/contracts/contracts");

/* Get One Contract. */
router.post("/", async function (req, res, next) {
  try {
    res.json(await contract.getContract(req.body));
  } catch (err) {
    console.error(`Error while getting contract `, err.message);
    next(err);
  }
});

/* Get User Contract. */
router.post("/userContracts", async function (req, res, next) {
  try {
    res.json(await contract.getUserContracts(req.body));
  } catch (err) {
    console.error(`Error while getting contract `, err.message);
    next(err);
  }
});

/* Get All User Contracts (Even if the user isn't the owner) 
   body: {owner_address: 0x00000}
*/

router.post("/getAllContract", async function (req, res, next) {
  try {
    res.json(await contract.getAllUserContract(req.body));
  } catch (err) {
    console.error(`Error while getting contract `, err.message);
    next(err);
  }
});

/* POST Contract */
router.post("/add", async function (req, res, next) {
  try {
    res.json(await contract.create(req.body));
  } catch (err) {
    console.error(`Error while creating contract`, err.message);
    next(err);
  }
});

module.exports = router;
