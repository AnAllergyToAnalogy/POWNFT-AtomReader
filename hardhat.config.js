require('dotenv').config()

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "ROPSTEN_ALCHEMY_KEY" in env
const ROPSTEN_ALCHEMY_API_KEY = process.env.ROPSTEN_ALCHEMY_KEY;

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "MAINNET_ALCHEMY_KEY" in env
const MAINNET_ALCHEMY_API_KEY = process.env.MAINNET_ALCHEMY_KEY;

// Replace ROPSTEN_PRIVATE_KEY with your Ropsten account private key in .env
// Replace MAINNET_PRIVATE_KEY with your Mainnet account private key in .env
// (They will be the same if you use the same address on Ropsten and Mainnet)
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  mocha: {
    timeout: 180000
  },

  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_API_KEY}`,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`]
    },

  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY

  }
};

