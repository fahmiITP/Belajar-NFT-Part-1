const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports = function (contractName, contractSymbol) {
    // Find the path of UserContract.sol inside the folder 'contract' in the project
    const UserContractPath = path.resolve(__dirname, '../contracts', 'UserContractFlattened.sol');
    const UserContract = fs.readFileSync(UserContractPath, 'utf8');

    // Replace Contract name and symbol
    UserContract.replace("CONTRACT_NAME", contractName);
    UserContract.replace("CONTRACT_SYMBOL", contractSymbol);

    // Create Solc input
    var input = {
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
    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    return output;
}