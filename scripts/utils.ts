import hre from 'hardhat'; 

export const getContractInstance = async (name: string, address: string) => {
    return await hre.ethers.getContractAt(name, address);
}

export const  convertToHex = (str: string) => {
  var hex: string = '';
  for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}

export const getHexStringLength = (str: string) => {
  return "0x"+str.substring(2).length / 2; 
}

export const checkHexLength = (hexString: string) => {
  if (hexString.length == 3){
    hexString = "0x0" + hexString.substring(2); 
  }
  return hexString;
}

export const toHex = (covertThis: any, padding: any) => {
      return hre.ethers.zeroPadValue(hre.ethers.hexlify(covertThis), padding);
};
  
export const createPermissionlessGenericDepositData = (
      executeFunctionSignature: string,
      executeContractAddress: string,
      maxFee: string,
      depositor: string,
      executionData: string,
      depositorCheck = false
    ) => {
      executionData = convertToHex(executionData);
      if (depositorCheck) {
        // if "depositorCheck" is true -> append depositor address for destination chain check
        executionData = toHex(depositor, 32).substring(2) + executionData;
      } 
      executionData = "0x" + executionData; 
      //var a : string = checkHexLength(getHexStringLength(executeFunctionSignature)).substring(2); // uint16

      return (
        "0x" +
        toHex(maxFee, 32).substring(2) + // uint256
        toHex(checkHexLength(getHexStringLength(executeFunctionSignature)),2).substring(2) + // uint16
        executeFunctionSignature.substring(2) +
        toHex(checkHexLength(getHexStringLength(executeContractAddress)),1).substring(2) + // uint8
        executeContractAddress.substring(2) + // bytes
        toHex(checkHexLength(getHexStringLength(depositor)),1).substring(2) + // uint8
        depositor.substring(2) + // bytes
        executionData.substring(2)
      ) // bytes
        .toLowerCase();
    };

export const createResourceID = (contractAddress: string, domainID:string) => {
      return toHex(contractAddress + toHex(domainID, 1).substring(2), 32);
    };
  