const db = require("../db");
const helper = require("../helper");
const config = require("../config");

/// Create a new contract to the DB
async function addTokenSaleColumn() {
  const result = await db.query(
    `ALTER TABLE token ADD COLUMN price FLOAT NULL,
    ADD COLUMN isOnSale BOOLEAN NOT NULL DEFAULT FALSE AFTER image
    `
  );

  return result;
}

module.exports = {
  addTokenSaleColumn,
};
