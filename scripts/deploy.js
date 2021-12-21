async function main() {
  const TheFlag = await ethers.getContractFactory("TheFlag")

  // Start deployment, returning a promise that resolves to a contract object
  const theFlag = await TheFlag.deploy(process.env.OWNER_ADDRESS)
  console.log("Contract deployed to address:", theFlag.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
