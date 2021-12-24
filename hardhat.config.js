/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

// task action function receives the Hardhat Runtime Environment as second argument
task(
  "blockNumber",
  "Prints the current block number",
  async (_, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber);
    });
  }
);

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: {
      version: "0.8.0",
      settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
   } ,
   defaultNetwork: "mainnet",
   networks: {
      mainnet: {
         url: API_URL,
         chainId: 1,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 2100000,
         gasPrice: 80000000000,
         gasLimit: 1500000000000,
         blockGasLimit: 1500000000000,
      }
   },
}