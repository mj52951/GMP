import hre from 'hardhat'; 

export const getContractInstance = async (name: string, address: string) => {
    return await hre.ethers.getContractAt(name, address);
  } 

export  const toHex = (covertThis: any, padding: any) => {
      return hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(covertThis), padding);
  };
  
export const createPermissionlessGenericDepositData = (
      executeFunctionSignature: string,
      executeContractAddress: string,
      maxFee: string,
      depositor: string,
      executionData: string,
      depositorCheck = true
    ) => {
      if (depositorCheck) {
        // if "depositorCheck" is true -> append depositor address for destination chain check
        executionData = executionData.concat(toHex(depositor, 32).substring(2));
      }
      console.log(executionData)
  
      /*var a = toHex(maxFee, 32).substring(2); 
      var b = toHex(executeFunctionSignature.substring(2).length / 2, 2).substring(2)
      var c = executeFunctionSignature.substring(2)
      var d = toHex(executeContractAddress.substring(2).length / 2, 1).substring(2)
      var e = executeContractAddress.substring(2)  // bytes
      var f = toHex(depositor.substring(2).length / 2, 1).substring(2);// uint8
      var g = depositor.substring(2) // bytes
      var h = executionData.substring(2)
      console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)
      console.log(e)
      console.log(f)
      console.log(g)
      console.log(h)
      console.log("\n")*/
  
      return (
        "0x" +
        toHex(maxFee, 32).substring(2) + // uint256
        toHex(executeFunctionSignature.substring(2).length / 2, 2).substring(2) + // uint16
        executeFunctionSignature.substring(2) + // bytes
        toHex(executeContractAddress.substring(2).length / 2, 1).substring(2) + // uint8
        executeContractAddress.substring(2) + // bytes
        toHex(depositor.substring(2).length / 2, 1).substring(2) + // uint8
        depositor.substring(2) + // bytes
        executionData.substring(2)
      ) // bytes
        .toLowerCase();
    };
  