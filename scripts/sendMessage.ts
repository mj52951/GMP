import hre from 'hardhat';

import {createPermissionlessGenericDepositData, getContractInstance} from "./utils"; 

async function main() {
  let functionSignature: string = "emitMessage(string)"; 
  let executeFunctionSignature: string = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes(functionSignature)).substring(0,10); 
  const depositData = 
      createPermissionlessGenericDepositData(executeFunctionSignature, //function signature
          "0xDFd064882F876A1b2D12bC436FCC0606a34215E7", //execute contract address
          "0x200000", //max fee
          "0x0858a92b33ee6b2eDFecCdca4FBcdC1D70a7045b", //depositor
          "aaSendingMessage"); //execution data

  
  //Sepolia Bridge = 0x820d8d0666f85c7c035f471E3D4577F995F310aB
  //Goerli Bridge = 0x5cEA5130c49dCd262B9482E0A76eCE8b23Ae45Df
  var bridgeAddress: string = "0x820d8d0666f85c7c035f471E3D4577F995F310aB";
  console.log(depositData);
  let BridgeContract = await getContractInstance("Bridge", "0x820d8d0666f85c7c035f471E3D4577F995F310aB"); 

  var data: any = await BridgeContract.deposit(1, 
    "0x0000000000000000000000000000000000000000000000000000000000000500", 
    depositData,
    "0x", {value: 100000000000000}); 
}

