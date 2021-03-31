const fs = require('fs');
const path = require('path');

module.exports = function () {
    /// Search for User Contract
    const UserCompiledContractPath = path.resolve(__dirname, '../build/contracts', 'UserContract.json');
    /// Get the data
    let rawdata = fs.readFileSync(UserCompiledContractPath);
    /// Parse JSON
    let contract = JSON.parse(rawdata);
    /// Return only bytecode
    return contract.bytecode;
}