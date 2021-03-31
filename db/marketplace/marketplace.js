const db = require("../db");
const helper = require("../helper");
const config = require("../config");

/// Get contract data based on contract address
async function getAllOnSaleToken() {
  const rows = await db.query(
    `SELECT id, token_id, token_owner, contract_address, name, description, image, isOnSale, price
    FROM token WHERE isOnSale = 1`
  );

  return { rows };
}

module.exports = {
  getAllOnSaleToken,
};
