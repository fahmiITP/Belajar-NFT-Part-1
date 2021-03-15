const db = require('../db');
const helper = require('../helper');
const config = require('../config');

/// Get all tokens on a contract
async function getUserTokens(token) {
    const rows = await db.query(
        `SELECT id, token_id, token_owner, contract_address, name, description, image 
        FROM token WHERE contract_address = "${token.contract_address}" AND token_owner = "${token.owner_address}"`,
    );

    return { rows }
}

/// Get one token on a contract
async function getOneTokenFromContract(contract_address, token_id) {
    const rows = await db.query(
        `SELECT name, description, image, token_id 
        FROM token WHERE contract_address LIKE "${contract_address}" AND token_id = ${token_id}`,
    );

    if (rows.length == 0) {
        return { "message": "No Token Found" };
    } else {
        return rows[0];
    }
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

/// update token to the DB
async function burn(token) {
    const result = await db.query(
        `UPDATE token SET token_owner = "0x0000000000000000000000000000000000000000" WHERE token_id = ${token.token_id} AND contract_address LIKE "${token.contract_address}"`,
    );

    let message = 'Error in burning token';

    if (result.affectedRows) {
        message = 'Token burnt successfully';
    }

    return { message };
}

/// update token to the DB
async function transfer(token) {
    const result = await db.query(
        `UPDATE token SET token_owner = ${token.new_owner} WHERE token_id = ${token.token_id} AND contract_address LIKE "${token.contract_address}")`,
    );

    let message = 'Error in transfering token';

    if (result.affectedRows) {
        message = 'Token transfered successfully';
    }

    return { message };
}

module.exports = {
    getUserTokens,
    getOneTokenFromContract,
    create,
    burn,
    transfer
}