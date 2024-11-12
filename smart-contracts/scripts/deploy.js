const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    try {
        // Get the contract factories
        const DecentradeNFT = await hre.ethers.getContractFactory("DecentradeNFT");
        const DecentradeMarketplace = await hre.ethers.getContractFactory("DecentradeMarketplace");

        // Deploy DecentradeNFT
        console.log("Deploying DecentradeNFT...");
        const nftContract = await DecentradeNFT.deploy();
        
        console.log("nftContract: ", nftContract); // Log the nftContract object to check what is being returned
        
        // Ensure the deployment transaction response exists
        if (!nftContract.deployTransaction) {
            throw new Error("Transaction response is undefined.");
        }

        // Wait for the contract deployment transaction to be mined
        const nftDeployReceipt = await nftContract.deployTransaction.wait();
        console.log("DecentradeNFT deployed to:", nftContract.address);
        console.log("DecentradeNFT deployment gas used:", nftDeployReceipt.gasUsed.toString());
        console.log("DecentradeNFT deployment transaction cost:", hre.ethers.utils.formatEther(nftDeployReceipt.gasUsed.mul(nftDeployReceipt.gasPrice)) + " ETH");

        // Deploy DecentradeMarketplace
        console.log("\nDeploying DecentradeMarketplace...");
        const marketplaceContract = await DecentradeMarketplace.deploy();
        
        console.log("marketplaceContract: ", marketplaceContract); // Log the marketplaceContract object to check what is being returned
        
        // Ensure the deployment transaction response exists
        if (!marketplaceContract.deployTransaction) {
            throw new Error("Transaction response is undefined.");
        }

        // Wait for the contract deployment transaction to be mined
        const marketplaceDeployReceipt = await marketplaceContract.deployTransaction.wait();
        console.log("DecentradeMarketplace deployed to:", marketplaceContract.address);
        console.log("DecentradeMarketplace deployment gas used:", marketplaceDeployReceipt.gasUsed.toString());
        console.log("DecentradeMarketplace deployment transaction cost:", hre.ethers.utils.formatEther(marketplaceDeployReceipt.gasUsed.mul(marketplaceDeployReceipt.gasPrice)) + " ETH");

        console.log("\nDeployment completed successfully!");
    } catch (error) {
        console.error("Error during deployment:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during execution:", error);
        process.exit(1);
    });
