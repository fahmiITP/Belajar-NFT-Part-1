// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../escrow/escrow.sol";
import "../tokens/nf-token-metadata.sol";

contract Store is Escrow, NFTokenMetadata {
    // Error Price should not be 0
    string constant ZERO_PRICE = "003010";

    // Error item is not on sale
    string constant ITEM_IS_NOT_ON_SALE = "003011";

    // Error Money is not as same as price
    string constant INSUFFICIENT_FUNDS = "003012";

    // Items on sale. (tokenId: isOnSale)
    mapping(uint256 => bool) internal itemOnSale;

    // Items Price
    mapping(uint256 => uint256) internal itemOnSalePrice;

    // Item Seller
    mapping(uint256 => address) internal itemSeller;

    /** @notice Log for a user that put a token on sale.
     * @param owner token owner
     * @param token The token id.
     * @param price The token price.
     */
    event LogPutItemOnSale(address owner, uint256 token, uint256 price);

    /** @notice Log for a user that put a token out from sale.
     * @param owner token owner
     * @param token The token id.
     */
    event LogTakeOutTokenFromSale(address owner, uint256 token);

    /** @notice Put a token on sale.
     * @dev Throws error unless sender is the owner of the token or operator, the token is valid,
     * and price is not 0 ethers
     * @param owner token owner
     * @param token The token id.
     * @param price The token price in wei.
     */
    function putItemOnSale(
        address owner,
        uint256 token,
        uint256 price
    ) external validNFToken(token) canOperate(token) returns (bool success) {
        require(owner != address(0), ZERO_ADDRESS);
        require(price > 0, ZERO_PRICE);

        uint256 priceInWei = price * (1 wei);

        // Set token on sale to true
        itemOnSale[token] = true;
        // Set token price
        itemOnSalePrice[token] = priceInWei;
        // Set token seller address
        itemSeller[token] = owner;
        // Emit an event
        emit LogPutItemOnSale(owner, token, priceInWei);
        return true;
    }

    /** @notice Check if token is on sale.
     * @dev Throws error unless the token is valid.
     * @param _tokenId token id
     */
    function isTokenOnSale(uint256 _tokenId)
        external
        view
        validNFToken(_tokenId)
        returns (bool status)
    {
        return itemOnSale[_tokenId];
    }

    /** @notice Take out a token from sale.
     * @dev Throws error unless sender is the owner of the token or operator, the token is valid,
     * and price is not 0 ethers
     * @param owner token owner
     * @param token The token id.
     */
    function takeOutTokenFromSale(address owner, uint256 token)
        external
        validNFToken(token)
        canOperate(token)
        returns (bool success)
    {
        require(owner != address(0), ZERO_ADDRESS);

        // Delete token from map
        delete itemOnSale[token];
        // Delete token price
        delete itemOnSalePrice[token];
        emit LogTakeOutTokenFromSale(owner, token);
        return true;
    }

    /** @notice Buy a token from marketplace.
     * @dev Throws error unless the token is valid, token is on sale, and
     * ethers sent is more than or equal item sale price.
     * @param _buyer buyer address.
     * @param _token The token id.
     */
    function buyToken(address _buyer, uint256 _token)
        external
        payable
        validNFToken(_token)
        returns (bool success)
    {
        require(_buyer != address(0), ZERO_ADDRESS);
        require(itemOnSale[_token], ITEM_IS_NOT_ON_SALE);
        require(msg.value >= itemOnSalePrice[_token], INSUFFICIENT_FUNDS);

        // Subtract sent value with item price to count change.
        uint256 change = msg.value - itemOnSalePrice[_token];

        // Transfer ethers to contract
        super._transferEthersToContract(
            _buyer,
            itemSeller[_token],
            itemOnSalePrice[_token]
        );

        // If change value is not 0, deposit the change to contract
        if (change != 0) {
            super._deposit(change);
        }

        // Delete token from map
        delete itemOnSale[_token];
        // Delete token price
        delete itemOnSalePrice[_token];
        // Transfer Token to the buyer
        super._transfer(_buyer, _token);
        // Returns true
        return true;
    }
}
