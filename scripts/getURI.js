require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/TheFlag.sol/TheFlag.json")
const contractAddress = process.env.NFT_CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

 async function getURI() {
    var uri = nftContract.methods.tokenURI(1).call()
    uri.then((signedTx) => {
      console.log("uri="+signedTx);
    })
}

getURI()