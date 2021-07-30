import hre from "hardhat";
import chalk from "chalk";

import { CurveFactory, Curve } from "../typechain";
import { getAccounts, getFastGasPrice } from "./common";
import { parseUnits } from "@ethersproject/units";

const { ethers } = hre;

const TOKENS = {
  USDO: "0x5801D0e1C7D977D78E4890880B8E579eb4943276",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
};
const ASSIMILATOR_ADDRESSES = {
  usdoToUsdAssimilator: "0x6e7D90feFFdF7E90DaB19CaF213CE64f28D0cE60",
  busdToUsdAssimilator: "0xd4AABE1A428EA36CB836db2248B4AC68537ed108",
};
const CURVE_FACTORY = "0x00a738971f4aAb40eAB7ff7E6Ff6330007eE663D";

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
    "OCP BUSD USDO LP",
    "OCP LP",
    TOKENS.BUSD,
    TOKENS.USDO,
    ASSIMILATOR_ADDRESSES.busdToUsdAssimilator,
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
