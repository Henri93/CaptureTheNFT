require("dotenv").config()
require("@nomiclabs/hardhat-ethers");

async function main() {
  let provider = ethers.getDefaultProvider('mainnet');
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const balance = await provider.getBalance(process.env.OWNER_ADDRESS);
  console.log("address balance:", balance)

  const TheFlag = await hre.ethers.getContractFactory("CaptureTheNFT", wallet)

  // Start deployment, returning a promise that resolves to a contract object
  const theFlag = await TheFlag.deploy(process.env.OWNER_ADDRESS)
  //await theFlag.deployed();
  console.log("Contract deployed to address:", theFlag.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
