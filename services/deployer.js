require('dotenv').config();
const ContractCompiler = require('./compiler');
const Ethers = require('ethers');

// Get compiled contract result
var ContractResult = ContractCompiler('Test', 'TST');
const UserContractABI = ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;
const UserContractBytecode = ContractResult.contracts["UserContractFlattened.sol"].UserContract.evm.bytecode.object;

// Create rinkeby connection using infura
var InfuraProvider = new Ethers.providers.InfuraProvider('rinkeby', process.env.INFURA_API_KEY);
// Assign owner wallet
var wallet = new Ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
// Connect to Rinkeby
var connectedWallet = wallet.connect(InfuraProvider);

// Async Function
(async function () {

    // Create an instance of a Contract Factory
    let factory = new Ethers.ContractFactory(UserContractABI, UserContractBytecode, connectedWallet);

    let contract = await factory.deploy();

    // The address the Contract WILL have once mined
    console.log(contract.address);

    // The transaction that was sent to the network to deploy the Contract
    // console.log(contract.deployTransaction.hash);

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()
})();