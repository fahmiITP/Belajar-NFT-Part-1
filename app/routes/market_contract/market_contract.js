const express = require("express");
const router = express.Router();
const getContractAbi = require("../../../services/trade_market_contract/getMarketData");
const token = require("../../../db/tokens/tokens");
const addTokenSaleColumn = require("../../../db/updates/1_add_token_sale_columns");
const addSignatureColumns = require("../../../db/updates/2_add_token_signature_columns");

/* 
    GET all on-sale token
*/
router.post("/", async function (req, res, next) {
  try {
    res.json(await getContractAbi());
  } catch (err) {
    console.error(`Error while getting tokens `, err.message);
    next(err);
  }
});

/* POST Update Token Sale State */
router.post("/updateTokenSaleState", async function (req, res, next) {
  try {
    res.json(await token.updateTokenSaleState(req.body));
  } catch (err) {
    if (err.message.includes("Unknown column")) {
      /// Create a new columns that is "isOnSale" and "price"
      try {
        /// Add token sale columns
        await addTokenSaleColumn.addTokenSaleColumn();

        /// Retry the process
        res.json(await token.updateTokenSaleState(req.body));
      } catch (error) {
        if (error.message.includes("Duplicate column name 'isOnSale'")) {
          /// Create a new columns that is "isOnSale" and "price"
          try {
            /// Add token sale columns
            await addSignatureColumns.addSignatureColumns();

            /// Retry the process
            res.json(await token.updateTokenSaleState(req.body));
          } catch (error2) {
            next(error2);
          }
        }
      }
    } else {
      next(err);
    }
  }
});

/* POST Update Token Sale State */
router.post("/cancelTokenSale", async function (req, res, next) {
  try {
    res.json(await token.cancelTokenSale(req.body));
  } catch (err) {
    if (err.message.includes("Unknown column")) {
      /// Create a new columns that is "isOnSale" and "price"
      try {
        /// Add token sale columns
        await addTokenSaleColumn.addTokenSaleColumn();

        /// Retry the process
        res.json(await token.cancelTokenSale(req.body));
      } catch (error) {
        if (error.message.includes("Duplicate column name 'isOnSale'")) {
          /// Create a new columns that is "isOnSale" and "price"
          try {
            /// Add token sale columns
            await addSignatureColumns.addSignatureColumns();

            /// Retry the process
            res.json(await token.cancelTokenSale(req.body));
          } catch (error2) {
            next(error2);
          }
        }
      }
    } else {
      next(err);
    }
  }
});

module.exports = router;
