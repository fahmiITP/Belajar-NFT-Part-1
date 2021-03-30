const Web3 = require("web3");
const ContractCompiler = require("./compiler");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Compile the source code
var ContractResult = ContractCompiler();
const abi =
  ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;
const bytecode =
  ContractResult.contracts["UserContractFlattened.sol"].UserContract.evm
    .bytecode.object;

async function loadContract() {
  return await new web3.eth.Contract(
    abi,
    "0x1Eb51d5478b22118C8B177cCA85c4912870C8ca6"
  );
}

async function safeTransfer(contract) {
  // Estimate transfer gas
  const gas = await contract.methods
    .safeTransferFrom(
      "0x166487622EC4103416faC4d85CC6402B1265cCE4",
      "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
      2
    )
    .estimateGas({ from: "0x166487622EC4103416faC4d85CC6402B1265cCE4" });

  console.log(gas);

  // Mint an item
  return await contract.methods
    .safeTransferFrom(
      "0x166487622EC4103416faC4d85CC6402B1265cCE4",
      "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
      2
    )
    .send({
      from: "0x166487622EC4103416faC4d85CC6402B1265cCE4",
      gas: gas,
    });
}

(async function () {
  // Load contract
  const contract = await loadContract();

  // Burn Token (Unlink token from address, can be re-minted).
  const transferItem = await safeTransfer(contract);
  console.log(transferItem);
})();
