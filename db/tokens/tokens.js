const db = require('../db');
const helper = require('../helper');
const config = require('../config');

/// Get all tokens on a contract
async function getUserTokens(token) {
    const rows = await db.query(
        `SELECT id, token_id, token_owner, contract_address, name, description, image 
        FROM token WHERE contract_address = ${token.contract_address} AND token_owner = ${token.owner_address}`,
    );

    return { rows }
}

/// Create a new token to the DB
async function create(token) {
    const result = await db.query(
        `INSERT INTO token (token_id, token_owner, contract_address, name, description, image) VALUES (?,?,?,?,?,?)`,
        [
            token.token_id,
            token.owner_address,
            token.contract_address,
            token.name,
            token.description,
            token.image
        ]
    );

    let message = 'Error in creating token';

    if (result.affectedRows) {
        message = 'Token created successfully';
    }

    return { message };
}

module.exports = {
    getUserTokens,
    create
}