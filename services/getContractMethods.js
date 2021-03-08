const Web3 = require('web3');
const ContractCompiler = require('./compiler');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Compile the source code
var ContractResult = ContractCompiler();
const abi = ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;

async function loadContract() {
    return await new web3.eth.Contract(abi, "0x17eb827b2e46B01e592E8B1BB92D9431e663696f");
}

(async function () {
    // Load contract
    const contract = await loadContract();

    console.log(contract.methods);
})();