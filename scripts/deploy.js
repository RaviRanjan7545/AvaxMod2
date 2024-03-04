
const hrdhat = require("hardhat");

async function startFunction() {
  const netflix = await hrdhat.ethers.getContractFactory("AmazonTvSubscription");
  const NetflixSubs = await netflix.deploy();
  await NetflixSubs.deployed();

}


startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
