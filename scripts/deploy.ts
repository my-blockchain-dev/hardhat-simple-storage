// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
import { ethers, run, network } from "hardhat";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract .....");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  //what happens when we deploy to hardhat network
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6); //waiting for 6 blocks to be mined
    await verify(simpleStorage.address, []);
    console.log("Contract verified successfully");
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(` Current value is ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  console.log("currently updating default value ....");
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is ${updatedValue}`);
}

// Verify function
async function verify(contractAddress: string, args: any[]) {
  console.log("Verifying contract ....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
