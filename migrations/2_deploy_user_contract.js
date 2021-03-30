const UserContract = artifacts.require("../contracts/UserContract.sol");

module.exports = function (deployer) {
    deployer.deploy(UserContract, "Test", "TST");
};
