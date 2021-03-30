const TradeMarket = artifacts.require("../contracts/TradeMarket.sol");
const UserContract = artifacts.require("../contracts/UserContract.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(TradeMarket);

  //   let market = await TradeMarket.deployed();
  //   let contract = await UserContract.deployed();

  //   await contract.setApprovalForAll(market.address, true, { from: accounts[0] });
  //   await contract.setApprovalForAll(market.address, true, { from: accounts[1] });
};
