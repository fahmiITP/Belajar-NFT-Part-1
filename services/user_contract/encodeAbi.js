const Web3 = require('web3');

module.exports = function (contractName, contractSymbol) {
    // Infura Key and Rinkeby Node URL
    const INFURA_KEY = process.env.INFURA_API_KEY
    const RINKEBY_NODE_URL = 'https://rinkeby.infura.io/v3/' + INFURA_KEY;

    // Web3 Initialization
    var web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_NODE_URL));

    // Encode the Parameters
    var encodedAbi = web3.eth.abi.encodeParameters(['string', 'string'], [contractName, contractSymbol]);

    // Remove first 2 characters (0x)
    return encodedAbi.slice(2);
}