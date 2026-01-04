import MusicRoyaltyArtifact from "../artifacts/contracts/MusicRoyalty.sol/MusicRoyalty.json";
import MusicIPNFTArtifact from "../artifacts/contracts/MusicIPNFT.sol/MusicIPNFT.json";
import KYCRegistryArtifact from "../artifacts/contracts/KYCRegistry.sol/KYCRegistry.json";

const MusicRoyaltyABI = MusicRoyaltyArtifact.abi;
const MusicIPNFTABI = MusicIPNFTArtifact.abi;
const KYCRegistryABI = KYCRegistryArtifact.abi;

export const CONTRACTS = {
  musicRoyalty: {
    address: "0x8DebFA31686012B1aa2ea78B7fFd58d977c96a20",
    abi: MusicRoyaltyABI,
  },
  musicIPNFT: {
    address: "0x57cFb035C6DFCB71f01AE6EA24196328E8b352f6",
    abi: MusicIPNFTABI,
  },
  kycRegistry: {
    address: "0x381D28F516f3951203A29E3B636e00B6e79AC220",
    abi: KYCRegistryABI,
  },
};
