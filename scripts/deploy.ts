import hre from "hardhat";

async function main() {
  const helloWorld = await hre.ethers.deployContract("HelloWorld");
  console.log("Deployed address:", await helloWorld.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

