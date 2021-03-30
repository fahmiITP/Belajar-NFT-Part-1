const ethers = require("ethers");

module.exports = function (
  sellerAddress,
  originalContractAddress,
  price,
  tradeMarketAddress,
  tokenId
) {
  /// Encode using default abi coder
  let payload = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "uint256", "address", "uint256"],
    [sellerAddress, originalContractAddress, price, tradeMarketAddress, tokenId]
  );

  /// Encode to keccak256
  let payloadHash = ethers.utils.keccak256(payload);
  return payloadHash;
};
