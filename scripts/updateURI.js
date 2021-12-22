require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/CaptureTheFlag.sol/CaptureTheFlag.json")
const contractAddress = process.env.NFT_CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

 async function updateURI(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(process.env.OWNER_ADDRESS, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': process.env.OWNER_ADDRESS,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.changeURI(tokenURI).encodeABI()
     };

     const signPromise = web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
   }

updateURI("https://gateway.pinata.cloud/ipfs/QmaqLCuKYRkf2ntHKxRqRx1d8nTiS85Xo21ygWzewawH5q")