import hre from "hardhat";
import chalk from "chalk";

import { CurveFactory, Curve } from "../typechain";
import { getAccounts, getFastGasPrice } from "./common";
import { parseUnits } from "@ethersproject/units";

const { ethers } = hre;

const TOKENS = {
  USDO: "0x5801D0e1C7D977D78E4890880B8E579eb4943276",
  USDC: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
};
const ASSIMILATOR_ADDRESSES = {
  usdoToUsdAssimilator: "0x7a60177C95A6abE226F30cF5ef45Df212856F64b",
  usdcToUsdAssimilator: "0xFdbce1ca7Bb8d10D30d9BcC2a87d251aEA6bE055",
};
const CURVE_FACTORY = "0xB4e6F3A23644808451E0f0E8F178dC9733311D07";

const ALPHA = parseUnits("0.8");
const BETA = parseUnits("0.5");
const MAX = parseUnits("0.15");
const EPSILON = parseUnits("0.0005");
const LAMBDA = parseUnits("0.3");

async function main() {
  const { user } = await getAccounts();

  console.log(chalk.blue(`>>>>>>>>>>>> Network: ${(hre.network.config as any).url} <<<<<<<<<<<<`));
  console.log(chalk.blue(`>>>>>>>>>>>> Deployer: ${user.address} <<<<<<<<<<<<`));

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
        gasPrice
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
      gasPrice
    });
    console.log("tx hash", tx2.hash);
    await tx2.wait();
    console.log("params setted");
    gasPrice = await getFastGasPrice();
    const tx3 = await curve.turnOffWhitelisting({
      gasPrice
    });
    console.log("tx hash", tx3.hash);
    await tx3.wait();
    console.log("turnOffWhitelisting done");

    console.log("==== done ====");
  };

  await createAndSetParams(
    "OCP USDC USDO LP",
    "OCP LP",
    TOKENS.USDC,
    TOKENS.USDO,
    ASSIMILATOR_ADDRESSES.usdcToUsdAssimilator,
    ASSIMILATOR_ADDRESSES.usdoToUsdAssimilator,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
