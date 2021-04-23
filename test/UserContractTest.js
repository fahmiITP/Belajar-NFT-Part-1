const UserContract = artifacts.require("UserContract");

contract("UserContract", (accounts) => {
  it("Should return the name", async () => {
    const instance = await UserContract.deployed();
    const value = await instance.name();

    assert.equal(value, "Test");
  });

  it("Mint Item", async () => {
    const instance = await UserContract.deployed();
    const mint = await instance.mint(accounts[0], 0, "https://www.twitter.com");
    const mintedItem = await instance.ownerOf(0);

    assert.equal(mintedItem, accounts[0]);
  });

  console.log(accounts);
});
