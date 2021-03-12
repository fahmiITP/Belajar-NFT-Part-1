const db = require('../db');
const helper = require('../helper');
const config = require('../config');

/// Get all users
async function getMultiple(page = 1) {
    /// Get page
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, eth_address FROM users LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return { data, meta }
}

/// Create Users
async function create(users) {
    const result = await db.query(
        `INSERT INTO users (eth_address) VALUES (?)`,
        [
            users.eth_address
        ]
    );

    let message = 'Error in creating user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create
}