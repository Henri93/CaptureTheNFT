//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

// The Flag that people can 'capture' by owning
// only the owner can update the URI to point to their meta data
contract CaptureTheFlag is ERC721Tradable  {
    constructor(address _proxyRegistryAddress) ERC721Tradable("CaptureTheFlag", "FLAG", "https://gateway.pinata.cloud/ipfs/QmNXuifoCMkYdPxcc9SsSW1xgwKCw25XGfaNHEguRcxQGW", _proxyRegistryAddress) {}
}
