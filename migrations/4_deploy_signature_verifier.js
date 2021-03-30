const SignatureVerifier = artifacts.require(
  "../contracts/verifier/SignatureVerifier.sol"
);

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SignatureVerifier);

  //   let market = await TradeMarket.deployed();
  //   let contract = await UserContract.deployed();

  //   await contract.setApprovalForAll(market.address, true, { from: accounts[0] });
  //   await contract.setApprovalForAll(market.address, true, { from: accounts[1] });
};
