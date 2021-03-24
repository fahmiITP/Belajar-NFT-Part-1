// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./tokens/nf-token-metadata.sol";
import "./ownership/ownable.sol";
import "./store/store.sol";

/**
 * @dev This is an example contract implementation of NFToken with metadata extension.
 */
contract UserContract is NFTokenMetadata, Ownable, Store {
    /**
     * @dev Contract constructor. Sets metadata extension `name` and `symbol`.
     */
    constructor(string memory contractName, string memory contractSymbol) {
        nftName = contractName;
        nftSymbol = contractSymbol;
    }

    /**
     * @dev Mints a new NFT.
     * @param _to The address that will own the minted NFT.
     * @param _tokenId of the NFT to be minted by the msg.sender.
     * @param _uri String representing RFC 3986 URI.
     */
    function mint(
        address _to,
        uint256 _tokenId,
        string calldata _uri
    ) external onlyOwner {
        super._mint(_to, _tokenId);
        super._setTokenUri(_tokenId, _uri);
        super._push(_tokenId);
    }

    /**
     * @dev Burn an NFT.
     * @param _tokenId of the NFT to be burned by the msg.sender.
     */
    function burn(uint256 _tokenId) external onlyOwner {
        super._burn(_tokenId);
    }

    /**
     * @dev Buy an NFT.
     * @param _tokenId of the NFT to be bought by the msg.sender.
     */

    function buy(address buyer, uint256 _tokenId) external payable {
        super._buy(buyer, _tokenId);
    }
}
