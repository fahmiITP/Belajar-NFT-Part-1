require("dotenv").config();
const Web3 = require("web3");
const ContractCompiler = require("./compiler");

// Infura Key and Rinkeby Node URL
const INFURA_KEY = process.env.INFURA_API_KEY;
const RINKEBY_NODE_URL = "https://rinkeby.infura.io/v3/" + INFURA_KEY;
const web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_NODE_URL));

// Compile the source code
var ContractResult = ContractCompiler();
const abi =
  ContractResult.contracts["TradeMarketV2Flattened.sol"].TradeMarketV2.abi;

async function loadContract() {
  return await new web3.eth.Contract(
    abi,
    "0xf365d0408A79C5BF4F14a5e8Da56CdC7d2afaC4C"
  );
}

(async function () {
  // Load contract
  const contract = await loadContract();

  console.log(contract.methods);
  const owner = await contract.methods.owner().call();
  console.log(owner);
})();
