// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./nf-token.sol";
import "./erc721-metadata.sol";

/**
 * @dev Optional metadata implementation for ERC-721 non-fungible token standard.
 */
contract NFTokenMetadata is NFToken, ERC721Metadata {
    /**
     * @dev A descriptive name for a collection of NFTs.
     */
    string internal nftName;

    /**
     * @dev An abbreviated name for NFTokens.
     */
    string internal nftSymbol;

    /**
     * @dev Mapping from NFT ID to metadata uri.
     */
    mapping(uint256 => string) internal idToUri;

    /**
     * @dev Array of all NFT IDs.
     */
    uint256[] internal mintedTokens;

    /**
     * @dev Contract constructor.
     * @notice When implementing this contract don't forget to set nftName and nftSymbol.
     */
    constructor() {
        supportedInterfaces[0x5b5e139f] = true; // ERC721Metadata
    }

    /**
     * @dev Returns a descriptive name for a collection of NFTokens.
     * @return _name Representing name.
     */
    function name() external view override returns (string memory _name) {
        _name = nftName;
    }

    /**
     * @dev Returns an abbreviated name for NFTokens.
     * @return _symbol Representing symbol.
     */
    function symbol() external view override returns (string memory _symbol) {
        _symbol = nftSymbol;
    }

    /**
     * @dev Returns the count of all existing NFTokens.
     * @return Total supply of NFTs.
     */
    function totalToken() external view returns (uint256) {
        return mintedTokens.length;
    }

    /**
     * @dev Push NFT token to array.
     * @param _tokenId Id for which we want to push.
     */
    function _push(uint256 _tokenId) internal validNFToken(_tokenId) {
        mintedTokens.push(_tokenId);
    }

    /**
     * @dev A distinct URI (RFC 3986) for a given NFT.
     * @param _tokenId Id for which we want uri.
     * @return URI of _tokenId.
     */
    function tokenURI(uint256 _tokenId)
        external
        view
        override
        validNFToken(_tokenId)
        returns (string memory)
    {
        return idToUri[_tokenId];
    }

    /**
     * @dev Burns a NFT.
     * @notice This is an internal function which should be called from user-implemented external
     * burn function. Its purpose is to show and properly initialize data structures when using this
     * implementation. Also, note that this burn implementation allows the minter to re-mint a burned
     * NFT.
     * @param _tokenId ID of the NFT to be burned.
     */
    function _burn(uint256 _tokenId) internal virtual override {
        super._burn(_tokenId);

        if (bytes(idToUri[_tokenId]).length != 0) {
            delete idToUri[_tokenId];
        }
    }

    /**
     * @dev Set a distinct URI (RFC 3986) for a given NFT ID.
     * @notice This is an internal function which should be called from user-implemented external
     * function. Its purpose is to show and properly initialize data structures when using this
     * implementation.
     * @param _tokenId Id for which we want URI.
     * @param _uri String representing RFC 3986 URI.
     */
    function _setTokenUri(uint256 _tokenId, string memory _uri)
        internal
        validNFToken(_tokenId)
    {
        idToUri[_tokenId] = _uri;
    }
}
