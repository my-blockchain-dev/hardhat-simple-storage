import { task } from "hardhat/config";

//hre - hardhat runtime environment

export default task("block-number", "prints the current block number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

