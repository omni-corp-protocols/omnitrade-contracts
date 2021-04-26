/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { CadcToUsdAssimilator } from "../CadcToUsdAssimilator";

export class CadcToUsdAssimilator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CadcToUsdAssimilator> {
    return super.deploy(overrides || {}) as Promise<CadcToUsdAssimilator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CadcToUsdAssimilator {
    return super.attach(address) as CadcToUsdAssimilator;
  }
  connect(signer: Signer): CadcToUsdAssimilator__factory {
    return super.connect(signer) as CadcToUsdAssimilator__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CadcToUsdAssimilator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CadcToUsdAssimilator;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int128",
        name: "_amount",
        type: "int128",
      },
    ],
    name: "intakeNumeraire",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quoteWeight",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "int128",
        name: "_amount",
        type: "int128",
      },
    ],
    name: "intakeNumeraireLPRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "intakeRaw",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "intakeRawAndGetBalance",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "balance_",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dst",
        type: "address",
      },
      {
        internalType: "int128",
        name: "_amount",
        type: "int128",
      },
    ],
    name: "outputNumeraire",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "outputRaw",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "outputRawAndGetBalance",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "balance_",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "viewNumeraireAmount",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "viewNumeraireAmountAndBalance",
    outputs: [
      {
        internalType: "int128",
        name: "amount_",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "balance_",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "viewNumeraireBalance",
    outputs: [
      {
        internalType: "int128",
        name: "balance_",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quoteWeight",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "viewNumeraireBalanceLPRatio",
    outputs: [
      {
        internalType: "int128",
        name: "balance_",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int128",
        name: "_amount",
        type: "int128",
      },
    ],
    name: "viewRawAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quoteWeight",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "int128",
        name: "_amount",
        type: "int128",
      },
    ],
    name: "viewRawAmountLPRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061217b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636fc390521161008c578063df4efe4911610066578063df4efe491461046c578063f09a3fc3146104e5578063f5e6c0ca1461054a578063fa00102a1461058f576100ea565b80636fc390521461035d5780637f328ecc146103c2578063ac969a7314610411576100ea565b80631e9b2cba116100c85780631e9b2cba1461021c578063523bf2571461028b578063679aefce146102fa5780636b677a8f14610318576100ea565b8063011847a0146100ef5780630271c3c81461016857806305cf7bb4146101ad575b600080fd5b6101526004803603608081101561010557600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600f0b90602001909291905050506105d4565b6040518082815260200191505060405180910390f35b6101976004803603602081101561017e57600080fd5b810190808035600f0b906020019092919050505061081e565b6040518082815260200191505060405180910390f35b610203600480360360608110156101c357600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506109b6565b6040518082600f0b815260200191505060405180910390f35b6102686004803603604081101561023257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c04565b6040518083600f0b815260200182600f0b81526020019250505060405180910390f35b6102d7600480360360408110156102a157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d1f565b6040518083600f0b815260200182600f0b81526020019250505060405180910390f35b610302610f78565b6040518082815260200191505060405180910390f35b6103476004803603602081101561032e57600080fd5b810190808035600f0b9060200190929190505050611053565b6040518082815260200191505060405180910390f35b6103ac6004803603604081101561037357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600f0b9060200190929190505050611095565b6040518082815260200191505060405180910390f35b6103ee600480360360208110156103d857600080fd5b8101908080359060200190929190505050611210565b6040518083600f0b815260200182600f0b81526020019250505060405180910390f35b6104536004803603602081101561042757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061147f565b6040518082600f0b815260200191505060405180910390f35b6104cf6004803603608081101561048257600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035600f0b9060200190929190505050611595565b6040518082815260200191505060405180910390f35b610531600480360360408110156104fb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611935565b6040518082600f0b815260200191505060405180910390f35b6105766004803603602081101561056057600080fd5b8101908080359060200190929190505050611ab3565b6040518082600f0b815260200191505060405180910390f35b6105bb600480360360208110156105a557600080fd5b8101908080359060200190929190505050611af2565b6040518082600f0b815260200191505060405180910390f35b60008073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561065257600080fd5b505afa158015610666573d6000803e3d6000fd5b505050506040513d602081101561067c57600080fd5b81019080805190602001909291905050509050600081116106a1576000915050610816565b600061078586610777670de0b6b3a764000073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4873ffffffffffffffffffffffffffffffffffffffff166370a082318a6040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561072e57600080fd5b505afa158015610742573d6000803e3d6000fd5b505050506040513d602081101561075857600080fd5b8101908080519060200190929190505050611c8790919063ffffffff16565b611d0d90919063ffffffff16565b905060006107e26107b9896107ab670de0b6b3a764000087611c8790919063ffffffff16565b611d0d90919063ffffffff16565b6107d4670de0b6b3a764000085611c8790919063ffffffff16565b611d0d90919063ffffffff16565b905080620f4240610807670de0b6b3a764000088600f0b611d5790919063ffffffff16565b028161080f57fe5b0493505050505b949350505050565b600080610829610f78565b9050806305f5e10061084f670de0b6b3a764000086600f0b611d5790919063ffffffff16565b028161085757fe5b049150600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156108ff57600080fd5b505af1158015610913573d6000803e3d6000fd5b505050506040513d602081101561092957600080fd5b81019080805190602001909291905050509050806109af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f43757276652f434144432d7472616e736665722d66726f6d2d6661696c65640081525060200191505060405180910390fd5b5050919050565b60008073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231846040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610a3457600080fd5b505afa158015610a48573d6000803e3d6000fd5b505050506040513d6020811015610a5e57600080fd5b8101908080519060200190929190505050905060008111610a8b57610a836000611e12565b915050610bfd565b6000610b6f85610b61670de0b6b3a764000073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4873ffffffffffffffffffffffffffffffffffffffff166370a08231896040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610b1857600080fd5b505afa158015610b2c573d6000803e3d6000fd5b505050506040513d6020811015610b4257600080fd5b8101908080519060200190929190505050611c8790919063ffffffff16565b611d0d90919063ffffffff16565b90506000610bcc610ba388610b95670de0b6b3a764000087611c8790919063ffffffff16565b611d0d90919063ffffffff16565b610bbe670de0b6b3a764000085611c8790919063ffffffff16565b611d0d90919063ffffffff16565b9050610bf7670de0b6b3a7640000620f424083860281610be857fe5b04611e3590919063ffffffff16565b93505050505b9392505050565b6000806000610c11610f78565b9050610c3d670de0b6b3a76400006305f5e10083870281610c2e57fe5b04611e3590919063ffffffff16565b9250600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231876040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610cbc57600080fd5b505afa158015610cd0573d6000803e3d6000fd5b505050506040513d6020811015610ce657600080fd5b81019080805190602001909291905050509050610d14670de0b6b3a764000082611e3590919063ffffffff16565b925050509250929050565b6000806000610d2c610f78565b905060006305f5e10082860281610d3f57fe5b049050600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff1663a9059cbb88846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610dc957600080fd5b505af1158015610ddd573d6000803e3d6000fd5b505050506040513d6020811015610df357600080fd5b8101908080519060200190929190505050905080610e79576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f43757276652f434144432d7472616e736665722d6661696c656400000000000081525060200191505060405180910390fd5b600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610ef657600080fd5b505afa158015610f0a573d6000803e3d6000fd5b505050506040513d6020811015610f2057600080fd5b81019080805190602001909291905050509050610f4e670de0b6b3a764000084611e3590919063ffffffff16565b9550610f6b670de0b6b3a764000082611e3590919063ffffffff16565b9450505050509250929050565b60008060008060008073a34317db73e77d453b1b8d04550c44d10e981c8e73ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b158015610fdb57600080fd5b505afa158015610fef573d6000803e3d6000fd5b505050506040513d60a081101561100557600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919050505094509450945094509450839550505050505090565b60008061105e610f78565b9050806305f5e100611084670de0b6b3a764000086600f0b611d5790919063ffffffff16565b028161108c57fe5b04915050919050565b6000806110a0610f78565b9050806305f5e1006110c6670de0b6b3a764000086600f0b611d5790919063ffffffff16565b02816110ce57fe5b049150600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff1663a9059cbb86856040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561115857600080fd5b505af115801561116c573d6000803e3d6000fd5b505050506040513d602081101561118257600080fd5b8101908080519060200190929190505050905080611208576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f43757276652f434144432d7472616e736665722d6661696c656400000000000081525060200191505060405180910390fd5b505092915050565b600080600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156112b857600080fd5b505af11580156112cc573d6000803e3d6000fd5b505050506040513d60208110156112e257600080fd5b8101908080519060200190929190505050905080611368576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f43757276652f434144432d7472616e736665722d66726f6d2d6661696c65640081525060200191505060405180910390fd5b600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156113e557600080fd5b505afa1580156113f9573d6000803e3d6000fd5b505050506040513d602081101561140f57600080fd5b81019080805190602001909291905050509050600061142c610f78565b9050611449670de0b6b3a764000083611e3590919063ffffffff16565b9350611475670de0b6b3a76400006305f5e1008389028161146657fe5b04611e3590919063ffffffff16565b9450505050915091565b60008061148a610f78565b9050600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561150957600080fd5b505afa15801561151d573d6000803e3d6000fd5b505050506040513d602081101561153357600080fd5b8101908080519060200190929190505050905060008111611561576115586000611e12565b92505050611590565b61158b670de0b6b3a76400006305f5e1008484028161157c57fe5b04611e3590919063ffffffff16565b925050505b919050565b60008073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561161357600080fd5b505afa158015611627573d6000803e3d6000fd5b505050506040513d602081101561163d57600080fd5b810190808051906020019092919050505090506000811161166257600091505061192d565b600061174686611738670de0b6b3a764000073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4873ffffffffffffffffffffffffffffffffffffffff166370a082318a6040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156116ef57600080fd5b505afa158015611703573d6000803e3d6000fd5b505050506040513d602081101561171957600080fd5b8101908080519060200190929190505050611c8790919063ffffffff16565b611d0d90919063ffffffff16565b905060006117a361177a8961176c670de0b6b3a764000087611c8790919063ffffffff16565b611d0d90919063ffffffff16565b611795670de0b6b3a764000085611c8790919063ffffffff16565b611d0d90919063ffffffff16565b905080620f42406117c8670de0b6b3a764000088600f0b611d5790919063ffffffff16565b02816117d057fe5b049350600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166323b872dd3330886040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561187857600080fd5b505af115801561188c573d6000803e3d6000fd5b505050506040513d60208110156118a257600080fd5b8101908080519060200190929190505050905080611928576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f43757276652f434144432d7472616e736665722d66726f6d2d6661696c65640081525060200191505060405180910390fd5b505050505b949350505050565b600080611940610f78565b905060006305f5e1008285028161195357fe5b049050600073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156119dd57600080fd5b505af11580156119f1573d6000803e3d6000fd5b505050506040513d6020811015611a0757600080fd5b8101908080519060200190929190505050905080611a8d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f43757276652f434144432d7472616e736665722d6661696c656400000000000081525060200191505060405180910390fd5b611aa8670de0b6b3a764000083611e3590919063ffffffff16565b935050505092915050565b600080611abe610f78565b9050611aea670de0b6b3a76400006305f5e10083860281611adb57fe5b04611e3590919063ffffffff16565b915050919050565b60008073cadc0acd4b445166f12d2c07eac6e2544fbe2eef73ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611b9857600080fd5b505af1158015611bac573d6000803e3d6000fd5b505050506040513d6020811015611bc257600080fd5b8101908080519060200190929190505050905080611c48576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f43757276652f636164632d7472616e736665722d66726f6d2d6661696c65640081525060200191505060405180910390fd5b6000611c52610f78565b9050611c7e670de0b6b3a76400006305f5e10083870281611c6f57fe5b04611e3590919063ffffffff16565b92505050919050565b600080831415611c9a5760009050611d07565b6000828402905082848281611cab57fe5b0414611d02576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806121256021913960400191505060405180910390fd5b809150505b92915050565b6000611d4f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611e9d565b905092915050565b600080821415611d6a5760009050611e0c565b600083600f0b1215611d7b57600080fd5b600060406fffffffffffffffffffffffffffffffff841685600f0b02901c90506000608084901c85600f0b02905077ffffffffffffffffffffffffffffffffffffffffffffffff811115611dce57600080fd5b604081901b9050817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03811115611e0457600080fd5b818101925050505b92915050565b6000677fffffffffffffff821115611e2957600080fd5b604082901b9050919050565b600080821415611e4457600080fd5b6000611e508484611f63565b90506f7fffffffffffffffffffffffffffffff6fffffffffffffffffffffffffffffffff16816fffffffffffffffffffffffffffffffff161115611e9357600080fd5b8091505092915050565b60008083118290611f49576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611f0e578082015181840152602081019050611ef3565b50505050905090810190601f168015611f3b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581611f5557fe5b049050809150509392505050565b600080821415611f7257600080fd5b600077ffffffffffffffffffffffffffffffffffffffffffffffff8411611fa85782604085901b81611fa057fe5b0490506120fd565b600060c09050600060c086901c90506401000000008110611fd157602081901c90506020820191505b620100008110611fe957601081901c90506010820191505b610100811061200057600881901c90506008820191505b6010811061201657600481901c90506004820191505b6004811061202c57600281901c90506002820191505b6002811061203b576001820191505b600160bf830360018703901c018260ff0387901b8161205657fe5b0492506fffffffffffffffffffffffffffffffff83111561207657600080fd5b6000608086901c8402905060006fffffffffffffffffffffffffffffffff871685029050600060c089901c9050600060408a901b9050828110156120bb576001820391505b8281039050608084901b9250828110156120d6576001820391505b8281039050608084901c82146120e857fe5b8881816120f157fe5b04870196505050505050505b6fffffffffffffffffffffffffffffffff81111561211a57600080fd5b809150509291505056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220bcd3e09c8b751d7846749089c3262a4268fd4aeaf757bc2f864f96a01551f37564736f6c63430007030033";
