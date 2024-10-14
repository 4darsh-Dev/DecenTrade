
const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    // Get the contract factories
    const DecentradeNFT = await hre.ethers.getContractFactory("DecentradeNFT");
    const DecentradeMarketplace = await hre.ethers.getContractFactory("DecentradeMarketplace");

    // Deploy DecentradeNFT
    console.log("Deploying DecentradeNFT...");
    const nftContract = await DecentradeNFT.deploy();
    const mAddress = await nftContract.getAddress();
    console.log("DecentradeNFT deployed to:", mAddress);

    // Wait for the transaction to be mined and get the receipt
    // const nftDeployReceipt = await nftContract.deployTransaction.wait();

    // // Log gas used and transaction cost
    // console.log("DecentradeNFT deployment gas used:", nftDeployReceipt.gasUsed.toString());
    // console.log("DecentradeNFT deployment transaction cost:", hre.ethers.utils.formatEther(nftDeployReceipt.gasUsed.mul(nftContract.deployTransaction.gasPrice)) + " ETH");

    // Deploy DecentradeMarketplace
    console.log("\nDeploying DecentradeMarketplace...");
    const marketplaceContract = await DecentradeMarketplace.deploy();
    let marketplaceAddress = await marketplaceContract.getAddress();
    console.log("DecentradeMarketplace deployed to:", marketplaceAddress);

    // Wait for the transaction to be mined and get the receipt
    // const marketplaceDeployReceipt = await marketplaceContract.deployTransaction.wait();

    // // Log gas used and transaction cost
    // console.log("DecentradeMarketplace deployment gas used:", marketplaceDeployReceipt.gasUsed.toString());
    // console.log("DecentradeMarketplace deployment transaction cost:", hre.ethers.utils.formatEther(marketplaceDeployReceipt.gasUsed.mul(marketplaceContract.deployTransaction.gasPrice)) + " ETH");

    // Get contract sizes
    const nftContractSize = (await hre.artifacts.readArtifact("DecentradeNFT")).deployedBytecode.length / 2;
    const marketplaceContractSize = (await hre.artifacts.readArtifact("DecentradeMarketplace")).deployedBytecode.length / 2;

    console.log("\nContract Sizes:");
    console.log("DecentradeNFT size:", nftContractSize, "bytes");
    console.log("DecentradeMarketplace size:", marketplaceContractSize, "bytes");

    // Calculate total deployment cost
    // const totalCost = hre.ethers.utils.formatEther(
    //     nftDeployReceipt.gasUsed.mul(nftContract.deployTransaction.gasPrice).add(
    //         marketplaceDeployReceipt.gasUsed.mul(marketplaceContract.deployTransaction.gasPrice)
    //     )
    // );
    // console.log("\nTotal deployment cost:", totalCost, "ETH");

    console.log("\nDeployment completed successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });