require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/CaptureTheFlag.sol/CaptureTheFlag.json")
const contractAddress = process.env.NFT_CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

 async function getURI() {
    var ownerCall = nftContract.methods.isFlagHolder(process.env.OWNER_ADDRESS).call()
    ownerCall.then((owner) => {
      console.log("isFlagHolder="+owner);
    })

    var uri = nftContract.methods.baseTokenURI().call()
    uri.then((baseURI) => {
      console.log("uri="+baseURI);
    })
}

getURI()