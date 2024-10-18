const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting deployment...");

  // Get the contract factories
  const DecentradeNFT = await hre.ethers.getContractFactory("DecentradeNFT");
  const DecentradeMarketplace = await hre.ethers.getContractFactory("DecentradeMarketplace");

  // Deploy DecentradeNFT
  console.log("Deploying DecentradeNFT...");
  const nftContract = await DecentradeNFT.deploy();
  await nftContract.waitForDeployment();
  const nftAddress = await nftContract.getAddress();
  console.log("DecentradeNFT deployed to:", nftAddress);

  // Deploy DecentradeMarketplace
  console.log("\nDeploying DecentradeMarketplace...");
  const marketplaceContract = await DecentradeMarketplace.deploy();
  await marketplaceContract.waitForDeployment();
  const marketplaceAddress = await marketplaceContract.getAddress();
  console.log("DecentradeMarketplace deployed to:", marketplaceAddress);

  // Get contract sizes
  const nftContractSize = (await hre.artifacts.readArtifact("DecentradeNFT")).deployedBytecode.length / 2;
  const marketplaceContractSize = (await hre.artifacts.readArtifact("DecentradeMarketplace")).deployedBytecode.length / 2;

  console.log("\nContract Sizes:");
  console.log("DecentradeNFT size:", nftContractSize, "bytes");
  console.log("DecentradeMarketplace size:", marketplaceContractSize, "bytes");

  // Save deployment data
  const deploymentData = {
    nft: {
      address: nftAddress,
      abi: nftContract.interface.format('json')
    },
    marketplace: {
      address: marketplaceAddress,
      abi: marketplaceContract.interface.format('json')
    },
    network: hre.network.name
  };

  // Ensure the deployments directory exists
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Save deployment data to a JSON file
  fs.writeFileSync(
    path.join(deploymentsDir, `${hre.network.name}.json`),
    JSON.stringify(deploymentData, null, 2)
  );

  console.log("\nDeployment data saved to:", path.join(deploymentsDir, `${hre.network.name}.json`));
  console.log("\nDeployment completed successfully!");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });