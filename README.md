
# Project Title

A brief description of what this project does and who it's for

# Threads of Truth 🧵🔗  
_Authenticating Handloom Heritage with Blockchain_

## 🌟 Overview  
**Threads of Truth** is a decentralized platform developed during **Handloom Hackathon 2025** to authenticate traditional handloom products and empower artisans through digital identity. By integrating blockchain technology, smart contracts, and oracle services, the platform ensures that every handloom product has a verifiable origin and is traceable from loom to market.

## 🔑 Key Features  
- **🪪 Digital Identity for Artisans**  
  Each artisan receives a blockchain-verified profile linked to their wallet.
  
- **🧶 Product Authenticity Verification**  
  Each handloom item is linked to a smart contract containing its creation metadata.

- **📸 Metadata Capture with Proof**  
  Real-time geo-tagged photos and roles captured via form submission are verified through Chainlink oracles.

- **🧾 Hash Verification for Customers**  
  Customers can verify Hash to view the product journey, artisan identity, and timestamped metadata.

- **📢 Thread Guru (Chatbot)**  
  A smart assistant that provides policy updates, schemes, and support to artisans in regional languages.

## 🧰 Tech Stack  
- **Smart Contracts**: Solidity (ethereum sepolia testnet)  
- **Oracle Services**: Chainlink  
- **Frontend**: React.js, Tailwind CSS  
- **Wallet Integration**: MetaMask  
- **Decentralized Storage**: Chain link
- **Backend**: Node.js
- **Hash Generator**: keccak

## 🔁 System Workflow

1. Artisan logs in via MetaMask and fills a role-based metadata form.
2. Real-time images and data are geo-tagged and stored.
3. Chainlink verifies off-chain data and generates a proof.
4. Smart contract is triggered with verified data.
5. A unique product hash is generated.
6. Customers verify the Hash.
