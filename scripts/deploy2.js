require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/CaptureTheNFT.sol/CaptureTheNFT.json")
const nftContract = new web3.eth.Contract(contract.abi)

 async function mintNFT() {
     const nonce = await web3.eth.getTransactionCount(process.env.OWNER_ADDRESS, 'latest'); //get latest nonce

   //the transaction
   const payload = {
      data: contract.bytecode
    }

     const tx = {
       'from': process.env.OWNER_ADDRESS,
       'nonce': nonce,
       'gas': 500000,
     };

     nftContract.deploy(payload).send(tx, (err, transactionHash) => {
          console.log('Transaction Hash :', transactionHash);
      }).on('confirmation', () => {}).then((newContractInstance) => {
          console.log('Deployed Contract Address : ', newContractInstance.options.address);
      })  
   }

mintNFT()