require('dotenv').config();
const ContractCompiler = require('./compiler');
const Web3 = require('web3');

// Infura Key and Rinkeby Node URL
const INFURA_KEY = process.env.INFURA_API_KEY
const RINKEBY_NODE_URL = 'https://rinkeby.infura.io/v3/' + INFURA_KEY;

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Connect to Rinkeby Ethereum node
// const web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_NODE_URL));

// Compile the source code
var ContractResult = ContractCompiler();
const abi = ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;
const bytecode = ContractResult.contracts["UserContractFlattened.sol"].UserContract.evm.bytecode.object;

// Deploy contract
(async function () {
    const accounts = await web3.eth.getAccounts();

    // Contract object
    var contract = new web3.eth.Contract(abi, {
        from: accounts[0], // default from address
        gas: '4700000',
        data: bytecode // Contract bytecode
    });

    // Gas estimation (Arguments is Contract's Constructor parameters)
    const gas = await contract.deploy({ arguments: ['Test', 'TST'] }).estimateGas();

    console.log("Gas : " + gas);

    // Contract Deployment (Arguments is Contract's Constructor parameters)
    const deployedContract = await contract.deploy({
        arguments: ['Test', 'TST']
    })
        .send({
            from: accounts[0],
            gas: gas,
        });

    // Log the Deployed Contract Address
    console.log(deployedContract._address);
})();