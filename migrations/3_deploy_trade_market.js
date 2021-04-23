const TradeMarket = artifacts.require("../contracts/TradeMarket.sol");
const TradeMarketV2 = artifacts.require("../contracts/TradeMarketV2.sol");
const UserContract = artifacts.require("../contracts/UserContract.sol");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer, network, accounts) {
  /// Normal Deploy
  // await deployer.deploy(TradeMarket);
  //   let market = await TradeMarket.deployed();
  //   let contract = await UserContract.deployed();
  //   await contract.setApprovalForAll(market.address, true, { from: accounts[0] });
  //   await contract.setApprovalForAll(market.address, true, { from: accounts[1] });

  /// Proxy / Upgrade Mode Deploy
  const instance = await deployProxy(TradeMarketV2, { deployer });
  // const upgraded = await upgradeProxy(instance.address, TradeMarketV2, {
  //   deployer,
  // });
  /// Actual Address
  console.log("Actual Address : " + instance.address);
  // /// Upgrade
  // console.log("Upgraded Address : " + upgraded.address);
};
