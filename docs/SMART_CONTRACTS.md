# Arsitektur Smart Contract

Melodia terdiri dari **3 Smart Contract** yang saling berinteraksi.

## Contracts Overview

### 1. KYCRegistry.sol

**Fungsi**: Whitelist user yang terverifikasi

```solidity
// Verify user
function verify(address user) external onlyOwner;

// Check verification status
function isVerified(address user) external view returns (bool);
```

**Address (Sepolia)**: `0x381D28F516f3951203A29E3B636e00B6e79AC220`

---

### 2. MusicRoyalty.sol

**Jenis**: Custom Token (ERC-20 style)

**Fungsi**: 
- Setiap lagu memiliki 1 kontrak MusicRoyalty unik
- Token mewakili "Saham" kepemilikan royalti
- Investor bisa buy/sell shares

**Constructor Parameters**:
```solidity
constructor(
    string memory _name,       // Token name (e.g., "My Song Token")
    string memory _symbol,     // Symbol (e.g., "MST")
    address _kycRegistry,      // KYC contract address
    string memory _title,      // Song title
    string memory _artist,     // Artist name
    uint256 _totalRoyaltyValue,// Total value in wei
    uint256 _totalShares,      // Total shares (e.g., 1000 * 1e18)
    string memory _legalDocument // IPFS URI for legal docs
)
```

**Key Functions**:
```solidity
// Buy shares
function buyShares(uint256 amount) external payable;

// Set price per share (admin only)
function setPricePerShare(uint256 price) external onlyAdmin;

// Transfer shares
function transfer(address to, uint256 amount) external;
```

---

### 3. MusicIPNFT.sol

**Jenis**: ERC-721 NFT

**Fungsi**:
- Sertifikat Hak Cipta Master
- Menyimpan metadata: judul, artis, IPFS link
- Menyimpan link ke kontrak MusicRoyalty

**Address (Sepolia)**: `0x57cFb035C6DFCB71f01AE6EA24196328E8b352f6`

**Key Functions**:
```solidity
// Request listing (creator)
function requestListing(
    string calldata _title,
    string calldata _artist,
    string calldata _metadataURI,
    address _royaltyContract
) external;

// Approve listing (admin only)
function approveListing(uint256 _requestId) external onlyOwner;

// Get song data
function getMusicIP(uint256 tokenId) external view returns (MusicIP memory);

// Get all pending requests
function getPendingRequests() external view returns (Request[] memory);
```

---

## Workflow Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Creator   │────>│ MusicRoyalty │     │   Investor  │
│   (Deploy)  │     │  (ERC-20)    │<────│   (Buy)     │
└─────────────┘     └──────────────┘     └─────────────┘
       │                   │
       │ requestListing    │ link to
       ▼                   ▼
┌─────────────┐     ┌──────────────┐
│  MusicIPNFT │<────│    Admin     │
│  (ERC-721)  │     │  (Approve)   │
└─────────────┘     └──────────────┘
```

## Alur Publish Song

1. **Creator Request**:
   - Deploy MusicRoyalty contract via Creator Hub
   - Call `MusicIPNFT.requestListing()`
   - Status: Pending

2. **Admin Approval**:
   - Admin buka Admin Dashboard
   - Call `approveListing(requestId)`
   - NFT di-mint ke wallet Creator

3. **Investor Buy**:
   - Buka song detail
   - Call `buyShares()` + kirim ETH
   - Shares transfer ke investor

## Solidity Version

```
pragma solidity 0.8.20;
```

## Dependencies

- OpenZeppelin Contracts (ERC721, Ownable)
