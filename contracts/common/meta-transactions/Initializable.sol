// SPDX-License-Identifier: MIT
// forked from https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/common/meta-transactions/Initializable.sol

pragma solidity ^0.8.0;

contract Initializable {
    bool inited = false;

    modifier initializer() {
        require(!inited, "already inited");
        _;
        inited = true;
    }
}