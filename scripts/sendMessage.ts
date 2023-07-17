import hre, { ethers} from 'hardhat';

import {createPermissionlessGenericDepositData, getContractInstance} from "./utils"; 

const abi = require("./contractABI.json");

//Goerli deployed address: 0xebd1702Ca48d4c758AfC02c0b42d937f2b758D5f
//Sepolia deployed address: 0x7e461Efe4bb5A65D240c7b0bB273BD122d632C6E
async function main() {
  let functionSignature: string = "emitMessage(address,string)"; 
  let executeFunctionSignature: string = hre.ethers.keccak256(hre.ethers.toUtf8Bytes(functionSignature)).substring(0,10); 
  let depositData = 
      createPermissionlessGenericDepositData(executeFunctionSignature, //function signature
          "0xebd1702Ca48d4c758AfC02c0b42d937f2b758D5f", //execute contract address
          "0x200000", //max fee
          "0x0858a92b33ee6b2eDFecCdca4FBcdC1D70a7045b", //depositor
          "SendingMessage"); //execution data

  
  //Sepolia Bridge = 0x820d8d0666f85c7c035f471E3D4577F995F310aB
  //Goerli Bridge = 0x5cEA5130c49dCd262B9482E0A76eCE8b23Ae45Df
  const bridgeAddress: string = "0x820d8d0666f85c7c035f471E3D4577F995F310aB";
  
  //const NETWORK = "goerli"; 
  const NETWORK = "sepolia"; 
  const provider = new ethers.InfuraProvider(NETWORK, process.env.INFURA_API_KEY); 
  
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider); 

  let BridgeContract = new ethers.Contract(bridgeAddress,
            abi,
            signer);

  //resource id for GMP: 0x0000000000000000000000000000000000000000000000000000000000000500
  var data: any = await BridgeContract.deposit(1, 
    "0x0000000000000000000000000000000000000000000000000000000000000500", 
    depositData,
    "0x", {value: ethers.parseEther("0.0001"), gasLimit: 2000000}); 

  console.log(data); 
}

try {
   main(); 
} catch (e){
  console.log((e as Error).message); 
}
