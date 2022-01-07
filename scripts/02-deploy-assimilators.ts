import hre from "hardhat";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import { getAccounts, deployContract } from "./common";

const { ethers } = hre;

async function main() {
  const { user } = await getAccounts();

  console.log(chalk.blue(`>>>>>>>>>>>> Network: ${(hre.network.config as any).url} <<<<<<<<<<<<`));
  console.log(chalk.blue(`>>>>>>>>>>>> Deployer: ${user.address} <<<<<<<<<<<<`));

  const UsdoToUsdAssimilator = await ethers.getContractFactory("UsdoToUsdAssimilator");
  const MUsdcToUsdAssimilator = await ethers.getContractFactory("MUsdcToUsdAssimilator");

  const usdoToUsdAssimilator = await deployContract({
    name: "UsdoToUsdAssimilator",
    deployer: user,
    factory: UsdoToUsdAssimilator,
    args: [],
    opts: {},
  });

  const mUsdcToUsdAssimilator = await deployContract({
    name: "MUsdcToUsdAssimilator",
    deployer: user,
    factory: MUsdcToUsdAssimilator,
    args: [],
    opts: {},
  });

  const output = {
    usdoToUsdAssimilator: usdoToUsdAssimilator.address,
    mUsdcToUsdAssimilator: mUsdcToUsdAssimilator.address,
  };

  const network = await hre.ethers.provider.getNetwork();
  const outputDir = path.join(__dirname, `${network.chainId}`);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  fs.writeFileSync(path.join(outputDir, `assimilators_deployed.json`), JSON.stringify(output, null, 4));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
