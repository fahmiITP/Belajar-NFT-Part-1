const Web3 = require('web3');
const ContractCompiler = require('./compiler');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Compile the source code
var ContractResult = ContractCompiler();
const abi = ContractResult.contracts["UserContractFlattened.sol"].UserContract.abi;
const bytecode = ContractResult.contracts["UserContractFlattened.sol"].UserContract.evm.bytecode.object;

async function loadContract() {
    return await new web3.eth.Contract(abi, "0x17eb827b2e46B01e592E8B1BB92D9431e663696f");
}

async function mint(contract) {

    // Get total supply
    const supply = await contract.methods.totalSupply().call();

    console.log(supply);

    // New token id
    var _newTokenId = Number(supply) + Number(1);

    // Estimate minting gas
    const gas = await contract.methods.mint("0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156", _newTokenId, "https://www.google.com").estimateGas();

    // Mint an item
    return await contract.methods.mint("0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156", _newTokenId, "https://www.google.com").send({
        from: "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
        gas: gas
    });
}

async function burn(contract) {

    // Estimate burning gas
    const gas = await contract.methods.burn(1).estimateGas();

    // Mint an item
    return await contract.methods.burn(1).send({
        from: "0x28c7F4081F8dfe5bFb984CBdc410Be2Dbd9E4156",
        gas: gas
    });
}

(async function () {
    // Load contract
    const contract = await loadContract();

    // Burn Token (Unlink token from address, can be re-minted).
    const burnedItem = await burn(contract);
    console.log(burnedItem);

    // Mint token to an address.
    // const mintItem = await mint(contract);
    // console.log(mintItem);
})();
