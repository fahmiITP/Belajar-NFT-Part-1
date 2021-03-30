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

async function mint(contract) {
  // Get total supply
  const supply = await contract.methods.totalToken().call();

  console.log(supply);

  // New token id
  var _newTokenId = Number(supply) + Number(1);

  // Estimate minting gas
  const gas = await contract.methods
    .mint(
      "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
      _newTokenId,
      "https://firebasestorage.googleapis.com/v0/b/itp-nft-demo.appspot.com/o/nft-image-upload%2F0x3611ec2e037e8057f45617c89676EE0329A79E96%2F4.jpeg?alt=media&token=57cead22-d897-4c3f-a576-477bf3cf711f"
    )
    .estimateGas();

  console.log(gas);

  // Mint an item
  return await contract.methods
    .mint(
      "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
      _newTokenId,
      "https://www.google.com"
    )
    .send({
      from: "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
      gas: gas,
    });
}

async function burn(contract) {
  // Estimate burning gas
  const gas = await contract.methods.burn(1).estimateGas();

  console.log(gas);

  // Mint an item
  return await contract.methods.burn(1).send({
    from: "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
    gas: gas,
  });
}

(async function () {
  // Load contract
  const contract = await loadContract();

  // Burn Token (Unlink token from address, can be re-minted).
  const burnedItem = await burn(contract);
  console.log(burnedItem);

  // Mint token to an address.
  //   const mintItem = await mint(contract);
  //   console.log(mintItem);
})();
