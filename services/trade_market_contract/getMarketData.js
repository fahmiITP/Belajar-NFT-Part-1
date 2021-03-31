module.exports = function () {
  const marketData = {
    marketAddress: "0xdd4172043a665303d5eFFA6D8795bD6b3Baf9baC",
    abi: [
      "function buyToken(address _buyer,address payable _seller,uint256 _token,uint256 _price,address _originalContractAddress,bytes32 _messageHash,bytes calldata _signature) external payable returns (bool success)",
    ],
  };

  return marketData;
};
