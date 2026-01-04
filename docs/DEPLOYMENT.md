# Panduan Deployment ke Sepolia Testnet

## Persiapan

Sebelum deploy, siapkan:

1. **Alchemy API Key**: Daftar di [Alchemy](https://www.alchemy.com/), buat App untuk Ethereum Sepolia
2. **Private Key**: Export dari MetaMask (gunakan wallet khusus testing)
3. **Sepolia ETH**: Dapatkan dari faucet:
   - https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - https://www.alchemy.com/faucets/ethereum-sepolia
   - https://faucet.quicknode.com/ethereum/sepolia

## Langkah 1: Konfigurasi Environment

Buat file `.env` di root project:

```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
```

> **PENTING**: Jangan commit file `.env` ke git. File ini sudah ada di `.gitignore`.

## Langkah 2: Deploy Contracts

Jalankan script deployment:

```bash
npx hardhat run scripts/deploy-admin.js --network sepolia
```

Output akan menampilkan alamat contract:

```
Deploying to Sepolia...
Deploying with: 0xYourWalletAddress
KYCRegistry: 0x...
MusicIPNFT: 0x...

=== UPDATE contracts.js WITH THESE ADDRESSES ===
kycRegistry: 0x...
musicIPNFT: 0x...
```

## Langkah 3: Update Frontend Config

Edit file `frontend/src/config/contracts.js`:

```javascript
export const CONTRACTS = {
  musicRoyalty: {
    address: "0x...", // Tidak perlu diubah (di-deploy dinamis)
    abi: MusicRoyaltyABI,
  },
  musicIPNFT: {
    address: "0xYOUR_NEW_MUSICIPNFT_ADDRESS", // Dari output deploy
    abi: MusicIPNFTABI,
  },
  kycRegistry: {
    address: "0xYOUR_NEW_KYCREGISTRY_ADDRESS", // Dari output deploy
    abi: KYCRegistryABI,
  },
};
```

## Langkah 4: Jalankan Frontend

```bash
cd frontend
npm run dev
```

Buka http://localhost:5173

## Langkah 5: Build untuk Production

```bash
cd frontend
npm run build
```

Upload folder `dist` ke Vercel, Netlify, atau GitHub Pages.

---

# Akses Admin Dashboard

## Siapa yang Bisa Akses?

Wallet yang **deploy** contract `MusicIPNFT` otomatis menjadi **Admin/Owner**.

## Cara Login Admin

1. Buka `http://localhost:5173/admin`
2. Connect wallet yang sama dengan yang deploy contract
3. Sistem akan verifikasi on-chain apakah wallet = contract owner
4. Jika match, redirect ke Admin Dashboard

## Fitur Admin Dashboard

- Lihat pending listing requests
- Approve/Reject song submissions
- Mint NFT untuk approved songs

## Troubleshooting

**Error "Unauthorized":**
- Wallet yang connect bukan owner contract
- Pastikan pakai wallet yang sama saat deploy

**Error "Contract not found":**
- Cek network di MetaMask (harus Sepolia)
- Cek alamat contract di `contracts.js`

---

# Contract Addresses (Sepolia)

| Contract | Address |
|----------|---------|
| KYCRegistry | `0x381D28F516f3951203A29E3B636e00B6e79AC220` |
| MusicIPNFT | `0x57cFb035C6DFCB71f01AE6EA24196328E8b352f6` |

Admin Wallet: `0x14d125438573DA6aE15686e262D1682666e876C8`

---

# Workflow Aplikasi

## 1. Creator Flow
1. Buka Creator Hub
2. Isi form (nama token, judul lagu, royalty value, shares)
3. Deploy contract (Step 1) - Bikin MusicRoyalty contract
4. Request listing (Step 2) - Submit ke Admin untuk approval

## 2. Admin Flow
1. Login ke Admin Dashboard
2. Review pending requests
3. Approve listing -> NFT di-mint, song muncul di Marketplace

## 3. Investor Flow
1. Buka Marketplace
2. Klik song yang menarik
3. Buy shares (butuh ETH sesuai harga per share)
4. Lihat portfolio di halaman Portfolio
