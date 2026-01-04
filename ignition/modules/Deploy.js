const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MusicRoyaltySystem", (m) => {
  // 1. Deploy KYC Registry (Mock for now, or real if code exists)
  // Assuming KYCRegistry exists in contracts/ based on imports in other files
  // If not, we might need to skip or mock it, but MusicRoyalty needs it.
  // Let's assume it exists or we use a zero address if allowed (but require check usually fails).
  // Checking previous file lists... MusicRoyalty.sol import says "kycRegistry".
  // Note: I haven't seen KYCRegistry.sol content but it was imported in MusicRoyalty.
  
  // Let's try to deploy it. If it fails, I'll mock it.
  // Assuming Mock or Real KYC Registry is available.
  // I'll create a simple deployment if the artifact exists.
  
  // Actually, let's check if KYCRegistry artifact exists first? 
  // I will just try to deploy "KYCRegistry".
  
  // Wait, I strictly need to know if KYCRegistry.sol exists.
  // Docs said: contracts/KYCRegistry.sol exists.
  
  const kyc = m.contract("KYCRegistry");

  // 2. Deploy MusicIPNFT
  const musicIPNFT = m.contract("MusicIPNFT");

  // 3. Deploy MusicRoyalty (Optional: usually deployed by Creator via Factory)
  // But for "Demo Checklist" we often want one pre-deployed.
  
  const tokenName = "Melodia Demo";
  const tokenSymbol = "MLD";
  const title = "Demo Song";
  const artist = "Melodia Artist";
  const totalRoyalty = "1000000000000000000"; // 1 ETH
  const totalShares = "1000000000000000000000"; // 1000 Shares (18 decimals)

  const musicRoyalty = m.contract("MusicRoyalty", [
    tokenName,
    tokenSymbol,
    kyc,
    title,
    artist,
    totalRoyalty,
    totalShares
  ]);
  
  // Set Legal Doc for demo
  m.call(musicRoyalty, "setLegalDocument", ["ipfs://DEMO_HASH"]);
  
  // Set Price Per Share for demo (e.g. 0.001 ETH)
  const price = "1000000000000000"; // 0.001 ETH
  m.call(musicRoyalty, "setPricePerShare", [price]);

  return { kyc, musicIPNFT, musicRoyalty };
});
