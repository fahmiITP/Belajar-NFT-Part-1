const db = require("../db");
const helper = require("../helper");
const config = require("../config");

/// Get contract data based on contract address
async function getContract(contract) {
  const rows = await db.query(
    `SELECT id, contract_owner, contract_address, contract_abi FROM contracts WHERE contract_address = "${contract.contract_address}"`
  );

  return { rows };
}

/// Get user contract data based on user's address
async function getUserContracts(contract) {
  const rows = await db.query(
    `SELECT id, contract_owner, contract_address, contract_abi FROM contracts WHERE contract_owner LIKE "${contract.owner_address}"`
  );
  return { rows };
}

/// Get all user contract even if the owner isn't that user. (Probably has a token that was transfered there).
async function getAllUserContract(address) {
  const rows = await db.query(
    `SELECT DISTINCT contracts.contract_owner, contracts.contract_address FROM contracts 
    LEFT JOIN token ON contracts.contract_address = token.contract_address 
    WHERE token.token_owner = "${address.owner_address}" OR contracts.contract_owner = "${address.owner_address}"`
  );
  return { rows };
}

/// Create a new contract to the DB
async function create(contract) {
  const result = await db.query(
    `INSERT INTO contracts (contract_owner, contract_address, contract_abi) VALUES (?,?,?)`,
    [contract.contract_owner, contract.contract_address, contract.contract_abi]
  );

  let message = "Error in creating contract";

  if (result.affectedRows) {
    message = "Contract created successfully";
  }

  return { message };
}

module.exports = {
  getContract,
  getUserContracts,
  getAllUserContract,
  create,
};
