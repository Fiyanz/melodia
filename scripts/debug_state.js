const hre = require("hardhat");

async function main() {
  const NFT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Localhost Address
  
  console.log(`Connecting to MusicIPNFT at ${NFT_ADDRESS}...`);
  const nft = await hre.ethers.getContractAt("MusicIPNFT", NFT_ADDRESS);

  // 1. Check Request Counter
  const count = await nft.requestCounter();
  console.log(`Total Requests Submitted: ${count.toString()}`);

  // 2. Check Pending Requests
  const pending = await nft.getPendingRequests();
  console.log(`Pending Requests Array Length: ${pending.length}`);
  
  if (pending.length > 0) {
      console.log("First Pending Request:", pending[0]);
  } else {
      console.log("No pending requests returned by contract.");
  }

  // 3. Check Token Counter (Minted)
  const tokens = await nft.tokenCounter();
  console.log(`Total Tokens Minted: ${tokens.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
