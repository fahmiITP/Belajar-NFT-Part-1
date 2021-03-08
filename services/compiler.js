const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports = function () {
    // Find the path of UserContract.sol inside the folder 'contract' in the project
    const UserContractPath = path.resolve(__dirname, '../contracts', 'UserContractFlattened.sol');
    const UserContract = fs.readFileSync(UserContractPath, 'utf8');

    // Create Solc input
    let input = {
        language: 'Solidity',
        sources: {
            'UserContractFlattened.sol': {
                content: UserContract
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    // Compile the contracts
    let output = JSON.parse(solc.compile(JSON.stringify(input)));
    return output;
}