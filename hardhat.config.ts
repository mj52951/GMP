import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy"; 
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {

  defaultNetwork: "hardhat",

  solidity: {

      version: "0.8.7",

      settings: {

          optimizer: {

              enabled: true,

              runs: 200

          }

      }

  },

  paths: {

      sources: "./contracts",

      artifacts: "./artifacts",

      deploy: "./scripts",

  },

  networks: {

      hardhat: {

          loggingEnabled: false,


      },

      coverage: {

          url: 'http://127.0.0.1:5458'

      },

      localhost: {

          url: 'http://127.0.0.1:8545',

          live: true,

          loggingEnabled: true

      },

      goerli: {

          url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,

          accounts: [`${process.env.PRIVATE_KEY}`],

          chainId: 5,

          loggingEnabled: true,

          gas: "auto",

          gasPrice: "auto",

          gasMultiplier: 1.5

      },
      sepolia: {
        url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
        accounts: [`${process.env.PRIVATE_KEY}`],
      }, 


  },

  etherscan: {

      apiKey: `${process.env.ETHERSCAN_API_KEY}}`

  },

  gasReporter: {

      coinmarketcap: process.env.COINMARKETCAP_API_KEY,

      enabled: !!(process.env.REPORT_GAS),

  },

  typechain: {

      outDir: "typechain",

      target: "ethers-v5"

  },

  namedAccounts: {

      deployer: {

          default: 0,

          6: 0

      }

  }

};

​



export default config;
