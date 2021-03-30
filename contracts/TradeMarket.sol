// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownership/ownable.sol";
import "./utils/address-utils.sol";

contract TradeMarket is Ownable {
    /** @notice Log for a user that buys a token.
     * @param buyer token buyer
     * @param owner token owner
     * @param token The token id.
     * @param price The token price.
     */
    event LogBuyToken(
        address buyer,
        address owner,
        uint256 token,
        uint256 price
    );

    /** @notice Buy a token from marketplace.
     * @dev Throws error unless the token is valid, token is on sale, and
     * ethers sent is more than or equal item sale price.
     * @param _buyer buyer address.
     * @param _token The token id.
     */
    function buyToken(
        address _buyer,
        address payable _seller,
        uint256 _token,
        uint256 _price,
        address _originalContractAddress
    ) external payable returns (bool success) {
        // Revert if the address is 0x000000
        require(_buyer != address(0), "ZERO ADDRESS");
        // Check if the ethers sent is equals or more than price
        require(_price >= msg.value, "Insufficient Funds");
        // Get the token owner
        address tokenOwner = ownerOfToken(_originalContractAddress, _token);
        require(
            tokenOwner == _seller,
            "Token is not valid, or not on sale by the seller"
        );
        // Check if the Trade market is operator
        bool isOperator =
            isAlreadyApproved(_originalContractAddress, tokenOwner);
        require(isOperator, "Not Operator, Cannot Operate");
        // Transfer Money or Ethers to Seller
        _seller.transfer(_price);
        // Transfer Token to the buyer
        transferToken(_originalContractAddress, tokenOwner, _token, _buyer);
        // Emit the transaction to log
        emit LogBuyToken(_buyer, tokenOwner, _token, _price);
        // Returns true
        return true;
    }

    // Check if trade market is already approved to operate all user tokens.
    function isAlreadyApproved(
        address _originalContractAddress,
        address _ownerAddess
    ) internal view returns (bool status) {
        bytes memory data =
            abi.encodeWithSignature(
                "isApprovedForAll(address,address)",
                _ownerAddess,
                address(this)
            );
        // Delegate Call and get the result
        bytes memory result =
            AddressUtils.functionStaticCall(_originalContractAddress, data);
        bool decoded = abi.decode(result, (bool));
        return decoded;
    }

    // Check the owner of the token
    function ownerOfToken(address _originalContractAddress, uint256 _tokenId)
        internal
        view
        returns (address owner)
    {
        bytes memory data =
            abi.encodeWithSignature("ownerOf(uint256)", _tokenId);
        // Delegate Call and get the result
        bytes memory result =
            AddressUtils.functionStaticCall(_originalContractAddress, data);
        address decoded = abi.decode(result, (address));
        return decoded;
    }

    // Safe transfer from
    function transferToken(
        address _originalContractAddress,
        address seller,
        uint256 _tokenId,
        address receiver
    ) internal {
        bytes memory data =
            abi.encodeWithSignature(
                "safeTransferFrom(address,address,uint256)",
                seller,
                receiver,
                _tokenId
            );
        // Delegate Call and get the result
        AddressUtils.functionCall(_originalContractAddress, data);
    }
}
