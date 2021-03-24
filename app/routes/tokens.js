const express = require("express");
const router = express.Router();
const token = require("../../db/tokens/tokens");
const addTokenSaleColumn = require("../../db/updates/1_add_token_sale_columns");

/* 
    GET User Token. 
    Body should be 
    {
        contract_address = "",
        owner_address = ""
    }
*/
router.post("/", async function (req, res, next) {
  try {
    res.json(await token.getUserTokens(req.body));
  } catch (err) {
    console.error(`Error while getting contract `, err.message);
    next(err);
  }
});

/* 
    GET User Token. 
    Body should be 
    {
        owner_address = ""
    }
*/
router.post("/getAllUserTokens", async function (req, res, next) {
  try {
    res.json(await token.getAllUserTokens(req.body));
  } catch (err) {
    console.error(`Error while getting contract `, err.message);
    next(err);
  }
});

/* 
    GET User Token Metadata. 
    Params should be 
    {
        contract_address = "" & token_id = <number>
    }
*/
router.get(
  "/metadata/:contract_address/:token_id",
  async function (req, res, next) {
    try {
      let contract_address = req.params.contract_address;
      let token_id = req.params.token_id;
      res.json(await token.getOneTokenFromContract(contract_address, token_id));
    } catch (err) {
      console.error(`Error while getting contract `, err.message);
      next(err);
    }
  }
);

/* POST Add Token */
router.post("/add", async function (req, res, next) {
  try {
    res.json(await token.create(req.body));
  } catch (err) {
    console.error(`Error while creating token`, err.message);
    next(err);
  }
});

/* POST Burn Token */
router.post("/burn", async function (req, res, next) {
  try {
    res.json(await token.burn(req.body));
  } catch (err) {
    console.error(`Error while burning token`, err.message);
    next(err);
  }
});

/* POST Transfer Token */
router.post("/transfer", async function (req, res, next) {
  try {
    res.json(await token.transfer(req.body));
  } catch (err) {
    console.error(`Error while transfering token`, err.message);
    next(err);
  }
});

/* POST Update Token Sale State */
router.post("/updateTokenSaleState", async function (req, res, next) {
  try {
    res.json(await token.updateTokenSaleState(req.body));
  } catch (err) {
    if (err.message.includes("Unknown column 'isOnSale'")) {
      /// Create a new columns that is "isOnSale" and "price"
      try {
        /// Add token sale columns
        await addTokenSaleColumn.addTokenSaleColumn();

        /// Retry the process
        res.json(await token.updateTokenSaleState(req.body));
      } catch (error) {
        next(error);
      }
    } else {
      next(err);
    }
  }
});

module.exports = router;
