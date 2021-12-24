// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
require("dotenv").config()
const contract = artifacts.require("CaptureTheNFT");

module.exports = function(deployer) {
  deployer.deploy(contract, "CaptureTheNFT", "FLAG", "https://gateway.pinata.cloud/ipfs/QmNXuifoCMkYdPxcc9SsSW1xgwKCw25XGfaNHEguRcxQGW", process.env.OWNER_ADDRESS);
};