const db = require('../db');
const helper = require('../helper');
const config = require('../config');

/// Get contract data based on contract address
async function getContract(contract) {
    const rows = await db.query(
        `SELECT id, contract_owner, contract_address, contract_abi FROM contracts WHERE contract_address = "${contract.contract_address}"`,
    );

    return { rows }
}

/// Get user contract data based
async function getUserContracts(contract) {
    const rows = await db.query(
        `SELECT id, contract_owner, contract_address, contract_abi FROM contracts WHERE contract_owner LIKE "${contract.owner_address}"`,
    );
    return { rows }
}

/// Create a new contract to the DB
async function create(contract) {
    const result = await db.query(
        `INSERT INTO contracts (contract_owner, contract_address, contract_abi) VALUES (?,?,?)`,
        [
            contract.contract_owner,
            contract.contract_address,
            contract.contract_abi
        ]
    );

    let message = 'Error in creating contract';

    if (result.affectedRows) {
        message = 'Contract created successfully';
    }

    return { message };
}

module.exports = {
    getContract,
    getUserContracts,
    create
}