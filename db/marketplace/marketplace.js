const db = require("../db");
const helper = require("../helper");
const config = require("../config");
const hashGenerator = require("../../services/encryption/hashGenerator");

/// Get all on sale token
async function getAllOnSaleToken() {
  const rows = await db.query(
    `SELECT id, token_id, token_owner, contract_address, name, description, image, isOnSale, price
    FROM token WHERE isOnSale = 1`
  );

  return { rows };
}

/// Get user msg hash and signature
async function getTokenHash(body) {
  const rows = await db.query(
    `SELECT msgHash, signature
    FROM token WHERE isOnSale = 1 
    AND contract_address LIKE "${body.contract_address}" AND token_id = ${body.token_id}`
  );

  /// Get the raw hashes
  const rawMsgHash = rows[0].msgHash;
  const rawSignature = rows[0].signature;

  /// Encrypt the raw hashes using AES encryption
  const encMsgHash = hashGenerator(rawMsgHash);
  const encSignature = hashGenerator(rawSignature);

  return { msg_hash: encMsgHash, signature: encSignature };
}

module.exports = {
  getAllOnSaleToken,
  getTokenHash,
};
