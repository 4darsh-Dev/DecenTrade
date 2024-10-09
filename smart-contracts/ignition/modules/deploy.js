const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DecentradeModule = buildModule("DecentradeModule", (m) => {
    const decentradeNFT = m.contract("DecentradeNFT");

    const decentradeMarketplace = m.contract("DecentradeMarketplace");

    return { decentradeNFT, decentradeMarketplace };
});

module.exports = DecentradeModule;