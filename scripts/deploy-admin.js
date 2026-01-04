const hre = require("hardhat");

async function main() {
  console.log("Deploying to Sepolia...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Deploy KYCRegistry
  const KYCRegistry = await hre.ethers.getContractFactory("KYCRegistry", deployer);
  const kyc = await KYCRegistry.deploy();
  await kyc.waitForDeployment();
  const kycAddress = await kyc.getAddress();
  console.log("KYCRegistry:", kycAddress);

  // Deploy MusicIPNFT
  const MusicIPNFT = await hre.ethers.getContractFactory("MusicIPNFT", deployer);
  const nft = await MusicIPNFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("MusicIPNFT:", nftAddress);

  console.log("\n=== UPDATE contracts.js WITH THESE ADDRESSES ===");
  console.log("kycRegistry:", kycAddress);
  console.log("musicIPNFT:", nftAddress);
}

main().catch(console.error);
