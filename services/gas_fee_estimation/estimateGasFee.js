require("dotenv").config();
const Web3 = require("web3");
const ContractCompiler = require("../compiler");

// Infura Key and Rinkeby Node URL
const INFURA_KEY = process.env.INFURA_API_KEY;
const RINKEBY_NODE_URL = "https://rinkeby.infura.io/v3/" + INFURA_KEY;

// Connect to local Ethereum node
// const web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_NODE_URL));
const web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_NODE_URL));

// Compile the source code
var ContractResult = ContractCompiler();
const abi =
  ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;
const bytecode =
  ContractResult.contracts["UserContractFlattened.sol"].UserContract.evm
    .bytecode.object;

// Deploy contract
(async function () {
  const accounts = await web3.eth.getAccounts();
  // Gas estimation (Arguments is Contract's Constructor parameters)
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  // Contract object
  var contract = new web3.eth.Contract(abi, {
    from: accounts[0], // default from address
    gas: gasPrice,
    data: bytecode, // Contract bytecode
  });
  // Gas estimation (Arguments is Contract's Constructor parameters)
  const gasEstimation = await contract
    .deploy({ arguments: ["Moon Studio", "MST"] })
    .estimateGas();
  console.log("Gas Estimation: " + gasEstimation);

  var gasInGwei = gasPrice * gasEstimation;

  console.log("Gas in Wei : " + gasInGwei);

  // Contract Deployment (Arguments is Contract's Constructor parameters)
  // const deployedContract = await contract
  //   .deploy({
  //     arguments: ["Test", "TST"],
  //   })
  //   .send({
  //     from: accounts[0],
  //     gas: gas,
  //   });
})();
