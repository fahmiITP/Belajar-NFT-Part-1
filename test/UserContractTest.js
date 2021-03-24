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

  it("Sale Should Return True", async () => {
    const instance = await UserContract.deployed();
    const saleItem = await instance.putItemOnSale(accounts[0], 0, 1000000);
    const isTokenOnSale = await instance.isTokenOnSale(0);

    assert.equal(isTokenOnSale, true);
  });

  it("Buy Should Return True", async () => {
    const instance = await UserContract.deployed();
    const buyItem = await instance.buyToken(accounts[2], 0, {
      value: web3.utils.toWei("1", "gwei"),
    });
    const tokenOwner = await instance.ownerOf(0);

    assert.equal(tokenOwner, accounts[2]);
  });

  it("Item Should Not Be On Sale", async () => {
    const instance = await UserContract.deployed();
    const isTokenOnSale = await instance.isTokenOnSale(0);

    assert.equal(isTokenOnSale, false);
  });

  console.log(accounts);
});
