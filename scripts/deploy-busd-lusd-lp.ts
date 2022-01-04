import hre from "hardhat";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { CurveFactory, Curve } from "../typechain";
import { getAccounts, getFastGasPrice, deployContract } from "./common";
import { parseUnits } from "@ethersproject/units";


const { ethers } = hre;

async function main() {
  const { user } = await getAccounts();

  console.log(chalk.blue(`>>>>>>>>>>>> Network: ${(hre.network.config as any).url} <<<<<<<<<<<<`));
  console.log(chalk.blue(`>>>>>>>>>>>> Deployer: ${user.address} <<<<<<<<<<<<`));

  const BusdToUsdAssimilatorQ = await ethers.getContractFactory("BusdToUsdAssimilatorQ");
  const LusdToUsdAssimilator = await ethers.getContractFactory("LusdToUsdAssimilator");

  const busdToUsdAssimilatorQ = await deployContract({
    name: "BusdToUsdAssimilatorQ",
    deployer: user,
    factory: BusdToUsdAssimilatorQ,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  const lusdToUsdAssimilator = await deployContract({
    name: "LusdToUsdAssimilator",
    deployer: user,
    factory: LusdToUsdAssimilator,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  const output = {
      busdToUsdAssimilatorQ: busdToUsdAssimilatorQ.address,
      lusdToUsdAssimilator: lusdToUsdAssimilator.address,
    };
    
    console.log(chalk.blue(`>>>>>>>>>>>> Assimilator busd: ${output.busdToUsdAssimilatorQ} <<<<<< Assimilator lusd: ${output.lusdToUsdAssimilator} <<<<<<<<<<<<`));

  const TOKENS = {
    lUSD: "0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e",
    BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  };

  const CURVE_FACTORY = "0x00a738971f4aAb40eAB7ff7E6Ff6330007eE663D";
  
  const ALPHA = parseUnits("0.8");
  const BETA = parseUnits("0.5");
  const MAX = parseUnits("0.15");
  const EPSILON = parseUnits("0.0005");
  const LAMBDA = parseUnits("0.3");

  console.log(chalk.blue(`>>>>>>>>>>>> Network: ${(hre.network.config as any).url} <<<<<<<<<<<<`));
  console.log(chalk.blue(`>>>>>>>>>>>> Deployer: ${user.address} <<<<<<<<<<<< curvefactory: ${CURVE_FACTORY}`));

  const curveFactory = (await ethers.getContractAt("CurveFactory", CURVE_FACTORY)) as CurveFactory;

  const createAndSetParams = async (name, symbol, base, quote, baseAssim, quoteAssim) => {
    console.log("creating ", name);
    let gasPrice = await getFastGasPrice();
    const tx = await curveFactory.newCurve(
      name,
      symbol,
      base,
      quote,
      parseUnits("0.5"),
      parseUnits("0.5"),
      baseAssim,
      quoteAssim,
      {
        gasPrice,
        gasLimit: 3300000,
      },
    );

    console.log("tx hash", tx.hash);
    const txRecp = await tx.wait();
    const newCurveAddress = txRecp.events.filter(x => x.event === "NewCurve")[0].args.curve;
    console.log("new curve", newCurveAddress);

    const curve = (await ethers.getContractAt("Curve", newCurveAddress)) as Curve;
        console.log("setting params");
        gasPrice = await getFastGasPrice();
        const tx2 = await curve.setParams(ALPHA, BETA, MAX, EPSILON, LAMBDA, {
        gasPrice,
        gasLimit: 300000,
        });
        console.log("tx hash", tx2.hash);
        await tx2.wait();
        console.log("params setted");
        gasPrice = await getFastGasPrice();
        const tx3 = await curve.turnOffWhitelisting({
        gasPrice,
        gasLimit: 300000,
        });
        console.log("tx hash", tx3.hash);
        await tx3.wait();
        console.log("turnOffWhitelisting done");

        console.log("==== done ====");
    };

  await createAndSetParams(
    "OCP lUSD BUSD LP",
    "OCP LP",
    TOKENS.lUSD,
    TOKENS.BUSD,
    output.lusdToUsdAssimilator,
    output.busdToUsdAssimilatorQ,
  );

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
