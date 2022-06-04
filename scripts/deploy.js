// Imports
const {ethers, run, network} = require("hardhat");
// Main function
async function main(){
const contractFactory = await ethers.getContractFactory("SimpleStorage");
console.log("Deploying contract...");
const SimpleStorage = await contractFactory.deploy();
await SimpleStorage.deployed();
console.log(SimpleStorage.address);
console.log(`Network chainId is: ${network.config.chainId}`);
if (network.chainId ==4 && process.env.ETHERSCAN_API_KEY) {
  console.log("waiting for block txs...");
  await SimpleStorage.deployTransaction.wait(6);
  await verify(contractAdress = SimpleStorage.address, []);
} else {
  console.log("Verification failed");
}

const currentValue = await SimpleStorage.retrieve();
console.log(`Current value is: ${currentValue}`);

// Updating favorite value
console.log("Passing a new value...")
const transactionResponce = await SimpleStorage.store(10);
const updated_value = await SimpleStorage.retrieve();
console.log(`Updated value is: ${updated_value}`);
}

async function verify(contractAdress,args){
  console.log("Verifying Contract...");
  try{
    await run("verify:verify",{
      address:contractAdress,
      constructorArguments: args,
    } )
} catch(e) {
  console.log(e);
}
}

// main
main()
.then(() =>process.exit(0) )
.catch((error) => {
console.log(error);
process.exit(1);
});