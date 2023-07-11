import hre, { ethers} from 'hardhat';

import {createPermissionlessGenericDepositData, getContractInstance} from "./utils"; 

//Goerli deployed address: 0x780A095af71F0C01D99C99f41Fc0Fcc06A0918f0
//Sepolia deployed address: 0x780A095af71F0C01D99C99f41Fc0Fcc06A0918f0
async function main() {
  let functionSignature: string = "emitMessage(string)"; 
  let executeFunctionSignature: string = hre.ethers.keccak256(hre.ethers.toUtf8Bytes(functionSignature)).substring(0,10); 
  let depositData = 
      createPermissionlessGenericDepositData(executeFunctionSignature, //function signature
          "0x780A095af71F0C01D99C99f41Fc0Fcc06A0918f0", //execute contract address
          "0x200000", //max fee
          "0x0858a92b33ee6b2eDFecCdca4FBcdC1D70a7045b", //depositor
          "SendingMessage"); //execution data

  
  //Sepolia Bridge = 0x820d8d0666f85c7c035f471E3D4577F995F310aB
  //Goerli Bridge = 0x5cEA5130c49dCd262B9482E0A76eCE8b23Ae45Df
  const bridgeAddress: string = "0x820d8d0666f85c7c035f471E3D4577F995F310aB";
  const abi = [{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"address","name":"accessControl","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"bytes4","name":"funcSig","type":"bytes4"}],"name":"AccessNotAllowed","type":"error"},{"inputs":[],"name":"DepositToCurrentDomain","type":"error"},{"inputs":[],"name":"EmptyProposalsArray","type":"error"},{"inputs":[],"name":"InvalidProposalSigner","type":"error"},{"inputs":[],"name":"MPCAddressAlreadySet","type":"error"},{"inputs":[],"name":"MPCAddressIsNotUpdatable","type":"error"},{"inputs":[],"name":"MPCAddressNotSet","type":"error"},{"inputs":[],"name":"MPCAddressZeroAddress","type":"error"},{"inputs":[],"name":"NonceDecrementsNotAllowed","type":"error"},{"inputs":[],"name":"ResourceIDNotMappedToHandler","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAccessControl","type":"address"}],"name":"AccessControlChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"destinationDomainID","type":"uint8"},{"indexed":false,"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"handlerResponse","type":"bytes"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[],"name":"EndKeygen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"lowLevelData","type":"bytes"},{"indexed":false,"internalType":"uint8","name":"originDomainID","type":"uint8"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"}],"name":"FailedHandlerExecution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newFeeHandler","type":"address"}],"name":"FeeHandlerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"hash","type":"string"}],"name":"KeyRefresh","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"originDomainID","type":"uint8"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"handlerResponse","type":"bytes"}],"name":"ProposalExecution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"txHash","type":"string"}],"name":"Retry","type":"event"},{"anonymous":false,"inputs":[],"name":"StartKeygen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"_MPCAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_accessControl","outputs":[{"internalType":"contract IAccessControlSegregator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"_depositCounts","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_domainID","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_feeHandler","outputs":[{"internalType":"contract IFeeHandler","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_resourceIDToHandlerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAccessControl","type":"address"}],"name":"adminChangeAccessControl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeHandler","type":"address"}],"name":"adminChangeFeeHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminPauseTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"adminSetBurnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"name":"adminSetDepositNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"},{"internalType":"bool","name":"valid","type":"bool"}],"name":"adminSetForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"bytes","name":"args","type":"bytes"}],"name":"adminSetResource","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminUnpauseTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"adminWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"destinationDomainID","type":"uint8"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"depositData","type":"bytes"},{"internalType":"bytes","name":"feeData","type":"bytes"}],"name":"deposit","outputs":[{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes","name":"handlerResponse","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"MPCAddress","type":"address"}],"name":"endKeygen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint8","name":"originDomainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Bridge.Proposal","name":"proposal","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"executeProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint8","name":"originDomainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Bridge.Proposal[]","name":"proposals","type":"tuple[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"executeProposals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint256","name":"depositNonce","type":"uint256"}],"name":"isProposalExecuted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isValidForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"hash","type":"string"}],"name":"refreshKey","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"txHash","type":"string"}],"name":"retry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startKeygen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"usedNonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint8","name":"originDomainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Bridge.Proposal[]","name":"proposals","type":"tuple[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
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
