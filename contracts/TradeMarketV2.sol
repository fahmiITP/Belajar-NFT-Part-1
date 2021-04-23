// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./upgradable/ownable-upgreadable.sol";
import "./upgradable/address-utils-upgreadable.sol";
import "./verifier/signature-verifier.sol";

contract TradeMarketV2 is OwnableUpgradeable, SignatureVerifier {
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
     * @dev Throws error unless the token is valid, token is on sale,
     * ethers sent is more than or equal item sale price, buyer address is not ZERO,
     * seller signer is successfully recovered, trade market is already approved.
     * @param _buyer buyer address.
     * @param _seller seller address.
     * @param _token The token id.
     * @param _price Token price in wei.
     * @param _originalContractAddress Token's contract address.
     * @param _messageHash Seller message hash that prompted during sell action.
     * @param _signature Seller signature hash of the signed message.
     */
    function buyToken(
        address _buyer,
        address payable _seller,
        uint256 _token,
        uint256 _price,
        address _originalContractAddress,
        bytes32 _messageHash,
        bytes calldata _signature
    ) external payable returns (bool success) {
        // Revert if the address is 0x000000
        require(_buyer != address(0), "ZERO_ADDRESS");
        // Check the seller hash and signature
        address _actualSeller = super.recoverSigner(_messageHash, _signature);
        // Check if the seller inputted is as the same as token seller
        require(_actualSeller == _seller, "HASH_NOT_MATCH");
        // Check if the ethers sent is equals or more than price
        require(_price >= msg.value, "INSUFFICIENT_FUNDS");
        // Get the token owner
        address tokenOwner = ownerOfToken(_originalContractAddress, _token);
        require(tokenOwner == _seller, "NOT_OWNER_OR_OPERATOR");
        // Check if the Trade market is operator
        bool isOperator =
            isAlreadyApproved(_originalContractAddress, tokenOwner);
        require(isOperator, "NOT_OPERATOR");
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
            AddressUtilsUpgradeable.functionStaticCall(
                _originalContractAddress,
                data
            );
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
            AddressUtilsUpgradeable.functionStaticCall(
                _originalContractAddress,
                data
            );
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
        AddressUtilsUpgradeable.functionCall(_originalContractAddress, data);
    }
}
