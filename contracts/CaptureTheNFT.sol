// SPDX-License-Identifier: MIT
// forked from https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/ERC721Tradable.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

contract OwnableDelegateProxy {}

// Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

//@title ERC721Tradable
//ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
contract CaptureTheNFT is ERC721, ContextMixin, NativeMetaTransaction {
    using SafeMath for uint256;

    address proxyRegistryAddress;
    address flagHolder;
    address internal minter;
    string baseURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _proxyRegistryAddress
    ) ERC721(_name, _symbol) {
        proxyRegistryAddress = _proxyRegistryAddress;
        _initializeEIP712(_name);

        baseURI = _uri;
        minter = _proxyRegistryAddress;
        flagHolder = _proxyRegistryAddress;
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._transfer(from, to, tokenId);
        // swap flagholder
        flagHolder = to;
    }

    // Only the flag holder can call this to update the token's metadata
    function changeURI(string memory _tokenURI) public {
        require(_msgSender() == flagHolder, "!flag holder");
        baseURI = _tokenURI;
    }
    
     //@dev Mints a token to an address with a tokenURI.
     //@param _to address of the future owner of the token
     //since it is 1/1 we set the tokenID to 1
    function mintTo(address _to) public {
        require(_msgSender() == minter, "!minter");
        _safeMint(_to, 1);
    }

    
    //@dev Returns the total tokens minted so far.
    function totalSupply() public pure returns (uint256) {
        return 1;
    }

    // since we know this is 1/1, just return baseTokenURI
    function tokenURI(uint256 _tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(baseURI));
    }

    //Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    //This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }
}