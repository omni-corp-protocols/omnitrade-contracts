import hre from "hardhat";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { parseUnits } from "@ethersproject/units";

import { getAccounts, deployContract, getFastGasPrice } from "./common";
import { CurveFactory, Curve, IERC20 } from "../typechain";

const { ethers } = hre;
const USDC = '0x209d032472401Fadc06156518d8AB5b1b946C53a';
const EURO = '0x97e9fde3DC18005B887D1fe1ecf835cfe6CB8Bd4';

async function main() {
  const { user } = await getAccounts();

  console.log(chalk.blue(`>>>>>>>>>>>> Network: ${(hre.network.config as any).url} <<<<<<<<<<<<`));
  console.log(chalk.blue(`>>>>>>>>>>>> Deployer: ${user.address} <<<<<<<<<<<<`));

  // 01
  const CurvesLib = await ethers.getContractFactory("Curves");
  const OrchestratorLib = await ethers.getContractFactory("Orchestrator");
  const ProportionalLiquidityLib = await ethers.getContractFactory("ProportionalLiquidity");
  const SwapsLib = await ethers.getContractFactory("Swaps");
  const ViewLiquidityLib = await ethers.getContractFactory("ViewLiquidity");

  const curvesLib = await deployContract({
    name: "CuvesLib",
    deployer: user,
    factory: CurvesLib,
    args: [],
    opts: {
      gasLimit: 800000,
    },
  });

  const orchestratorLib = await deployContract({
    name: "OrchestratorLib",
    deployer: user,
    factory: OrchestratorLib,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  const proportionalLiquidityLib = await deployContract({
    name: "ProportionalLiquidityLib",
    deployer: user,
    factory: ProportionalLiquidityLib,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  const swapsLib = await deployContract({
    name: "SwapsLib",
    deployer: user,
    factory: SwapsLib,
    args: [],
    opts: {
      gasLimit: 3000000,
    },
  });

  const viewLiquidityLib = await deployContract({
    name: "ViewLiquidityLib",
    deployer: user,
    factory: ViewLiquidityLib,
    args: [],
    opts: {
      gasLimit: 400000,
    },
  });

  const CurveFactory = await ethers.getContractFactory("CurveFactory", {
    libraries: {
      Curves: curvesLib.address,
      Orchestrator: orchestratorLib.address,
      ProportionalLiquidity: proportionalLiquidityLib.address,
      Swaps: swapsLib.address,
      ViewLiquidity: viewLiquidityLib.address,
    },
  });

  const RouterFactory = await ethers.getContractFactory("Router");

  const curveFactory = await deployContract({
    name: "CurveFactory",
    deployer: user,
    factory: CurveFactory,
    args: [],
    opts: {
      gasLimit: 4000000,
    },
  });

  const router = await deployContract({
    name: "Router",
    deployer: user,
    factory: RouterFactory,
    args: [curveFactory.address],
    opts: {
      gasLimit: 4000000,
    },
  });

  let output: any = {
    libraries: {
      Curves: curvesLib.address,
      Orchestrator: orchestratorLib.address,
      ProportionalLiquidity: proportionalLiquidityLib.address,
      Swaps: swapsLib.address,
      ViewLiquidity: viewLiquidityLib.address,
    },
    curveFactory: curveFactory.address,
    router: router.address,
  };

  // 02

  const UsdcToUsdAssimilator = await ethers.getContractFactory("UsdcToUsdAssimilator");
  const EursToUsdAssimilator = await ethers.getContractFactory("EursToUsdAssimilator");

  const usdcToUsdAssimilator = await deployContract({
    name: "UsdcToUsdAssimilator",
    deployer: user,
    factory: UsdcToUsdAssimilator,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  const eursToUsdAssimilator = await deployContract({
    name: "EursToUsdAssimilator",
    deployer: user,
    factory: EursToUsdAssimilator,
    args: [],
    opts: {
      gasLimit: 2000000,
    },
  });

  output.usdcToUsdAssimilator = usdcToUsdAssimilator.address;
  output.eursToUsdAssimilator = eursToUsdAssimilator.address;

  // 04

  const ALPHA = parseUnits("0.8");
  const BETA = parseUnits("0.5");
  const MAX = parseUnits("0.15");
  const EPSILON = parseUnits("0.0005");
  const LAMBDA = parseUnits("0.3");

  const curveFactory2 = (await ethers.getContractAt(
    "CurveFactory",
    curveFactory.address,
  )) as CurveFactory;

  const createAndSetParams = async (name, symbol, base, quote, baseAssim, quoteAssim) => {
    console.log("creating ", name);
    let gasPrice = await getFastGasPrice();
    const tx = await curveFactory2.newCurve(
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
    console.log("params setted, transferring ownership");
    gasPrice = await getFastGasPrice();
    console.log("==== done ====");
    return curve;
  };

  const euroCurve = await createAndSetParams(
    "dfx-eurs-usdc-a",
    "dfx-eurs-a",
    EURO,
    USDC,
    output.eursToUsdAssimilator,
    output.usdcToUsdAssimilator,
  );
  output.euroCurve = euroCurve.address;

  const outputPath = path.join(__dirname, `temp.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 4));


  // additional
  const gasPrice = await getFastGasPrice();
  const tx3 = await euroCurve.turnOffWhitelisting({
    gasPrice,
    gasLimit: 300000,
  });
  console.log("tx hash", tx3.hash);
  await tx3.wait();
  console.log("turnOffWhitelisting done");
 
  const usdc = (await ethers.getContractAt("IERC20", USDC)) as IERC20;
  const tx4 = await usdc.approve(euroCurve.address, ethers.constants.MaxUint256, {
    gasPrice,
    gasLimit: 300000,
  });
  console.log("tx hash", tx4.hash);
  await tx4.wait();
  console.log("approve done");

  const euro = (await ethers.getContractAt("IERC20", EURO)) as IERC20;
  const tx5 = await euro.approve(euroCurve.address, ethers.constants.MaxUint256, {
    gasPrice,
    gasLimit: 300000,
  });
  console.log("tx hash", tx5.hash);
  await tx5.wait();
  console.log("approve done");


  let timestamp = new Date().getTime().toString();
  const tx6 = await euroCurve.deposit(parseUnits("10000"), parseFloat(timestamp) + 100000, {
    gasPrice,
    gasLimit: 2000000,
  });
  console.log("tx hash", tx6.hash);
  await tx6.wait();
  console.log("deposit done");

  const tx7 = await euro.approve(router.address, ethers.constants.MaxUint256, {
    gasPrice,
    gasLimit: 300000,
  });
  console.log("tx hash", tx7.hash);
  await tx7.wait();
  console.log("approve done");

  const tx8 = await usdc.approve(router.address, ethers.constants.MaxUint256, {
    gasPrice,
    gasLimit: 300000,
  });
  console.log("tx hash", tx8.hash);
  await tx8.wait();
  console.log("approve done");

  timestamp = new Date().getTime().toString();
  const tx9 = await router.originSwap(USDC, USDC, EURO, parseUnits("100"), "1", parseFloat(timestamp) + 100000, {
    gasPrice,
    gasLimit: 2000000,
  });
  console.log("tx hash", tx9.hash);
  await tx9.wait();
  console.log("originSwap done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
