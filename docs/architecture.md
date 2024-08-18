## Architecture of DecenTrade

<pre>
DecenTrade/
│
├── smart-contracts/
│ ├── contracts/
│ │ ├── Marketplace.sol
│ │ ├── NFT.sol
│ │ └── Rating.sol
│ ├── scripts/
│ │ └── deploy.js
│ ├── test/
│ │ └── Marketplace.test.js
│ ├── hardhat.config.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ │ ├── index.html
│ │ └── favicon.ico
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.js
│ │ │ ├── AssetCard.js
│ │ │ └── ...
│ │ ├── pages/
│ │ │ ├── Home.js
│ │ │ ├── Marketplace.js
│ │ │ ├── Profile.js
│ │ │ └── ...
│ │ ├── utils/
│ │ │ ├── web3.js
│ │ │ └── ipfs.js
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
│
├── docs/
│ ├── api-spec.md
│ └── architecture.md
│
├── scripts/
│ └── setup.sh
│
├── .gitignore
├── README.md
├── LICENSE
└──

</pre>
