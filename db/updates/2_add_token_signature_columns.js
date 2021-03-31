const db = require("../db");
const helper = require("../helper");
const config = require("../config");

/// Create a new contract to the DB
async function addSignatureColumns() {
  const result = await db.query(
    `ALTER TABLE token ADD COLUMN signature LONGTEXT NULL,
    ADD COLUMN msgHash LONGTEXT NULL AFTER price,
    MODIFY COLUMN price DOUBLE NULL
    `
  );

  return result;
}

module.exports = {
  addSignatureColumns,
};
