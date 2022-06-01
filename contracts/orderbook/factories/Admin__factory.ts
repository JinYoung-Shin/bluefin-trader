/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Admin } from "../Admin";

export class Admin__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Admin> {
    return super.deploy(overrides || {}) as Promise<Admin>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Admin {
    return super.attach(address) as Admin;
  }
  connect(signer: Signer): Admin__factory {
    return super.connect(signer) as Admin__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Admin {
    return new Contract(address, _abi, signerOrProvider) as Admin;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPositive",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFundingRatePositive",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "balance",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "LogAccountSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "settlementPrice",
        type: "uint256",
      },
    ],
    name: "LogFinalSettlementEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "index",
        type: "bytes32",
      },
    ],
    name: "LogIndex",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feePool",
        type: "address",
      },
    ],
    name: "LogSetFeePool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "LogSetFunder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "LogSetGlobalOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "initialMargin",
        type: "uint256",
      },
    ],
    name: "LogSetInitialMargin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "maintenanceMargin",
        type: "uint256",
      },
    ],
    name: "LogSetMaintenanceMargin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "marginBank",
        type: "address",
      },
    ],
    name: "LogSetMarginBank",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oracle",
        type: "address",
      },
    ],
    name: "LogSetOracle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tradeInfo",
        type: "address",
      },
    ],
    name: "LogSetTradeInfo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "LogTradingStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "stopTime",
        type: "uint256",
      },
    ],
    name: "LogTradingStopped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "balance",
        type: "bytes32",
      },
    ],
    name: "LogWithdrawFinalSettlement",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "priceLowerBound",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceUpperBound",
        type: "uint256",
      },
    ],
    name: "enableFinalSettlement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getAccountBalanceAfterSettlement",
    outputs: [
      {
        components: [
          {
            internalType: "uint120",
            name: "debt",
            type: "uint120",
          },
          {
            internalType: "bool",
            name: "debtIsPositive",
            type: "bool",
          },
          {
            internalType: "uint120",
            name: "size",
            type: "uint120",
          },
          {
            internalType: "bool",
            name: "sizeIsPositive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "margin",
            type: "uint256",
          },
        ],
        internalType: "struct Types.PositionBalance",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maintenanceMargin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialMargin",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "timestamp",
                type: "uint32",
              },
              {
                internalType: "bool",
                name: "isPositive",
                type: "bool",
              },
              {
                internalType: "uint128",
                name: "value",
                type: "uint128",
              },
            ],
            internalType: "struct Types.Index",
            name: "index",
            type: "tuple",
          },
        ],
        internalType: "struct Types.Context",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feePool",
        type: "address",
      },
    ],
    name: "setFeePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "setFunder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setGlobalOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialMargin",
        type: "uint256",
      },
    ],
    name: "setInitialMargin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maintenanceMargin",
        type: "uint256",
      },
    ],
    name: "setMaintenanceMargin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marginBank",
        type: "address",
      },
    ],
    name: "setMarginBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracle",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tradeInfo",
        type: "address",
      },
    ],
    name: "setTradeInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTrading",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stopTrading",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFinalSettlement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506100467fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610333610050602090811b61102e17901c565b6001600055610054565b9055565b6128d580620000646000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063481c3a0e116100975780637185f163116100665780637185f163146101dd5780637adbf973146101e5578063a2359b7e146101f8578063f40c36991461020b576100f5565b8063481c3a0e1461016b5780635e17fec31461017e5780636e9960c3146101a8578063704b6c02146101bd576100f5565b8063293230b8116100d3578063293230b81461012a578063332be91a146101325780633eac0eb41461014557806346d256c514610158576100f5565b80630acc8cd1146100fa578063142c69b31461010f57806319db222814610117575b600080fd5b61010d610108366004612127565b61021e565b005b61010d610362565b61010d610125366004612127565b610645565b61010d6106f2565b61010d6101403660046121c0565b610797565b61010d610153366004612127565b610879565b61010d610166366004612141565b610926565b61010d610179366004612127565b6109ee565b61019161018c366004612127565b610b1c565b60405161019f929190612771565b60405180910390f35b6101b0610b96565b60405161019f91906122b7565b6101d06101cb366004612127565b610bc6565b60405161019f91906122ff565b61010d610c3c565b61010d6101f3366004612127565b610cd3565b61010d6102063660046121c0565b610e1e565b61010d6102193660046121f0565b610efe565b610226610b96565b6001600160a01b0316336001600160a01b03161461025f5760405162461bcd60e51b81526004016102569061258c565b60405180910390fd5b60001960005414156102835760405162461bcd60e51b81526004016102569061273a565b6000196000908155604051633afb52f560e21b81526001600160a01b0383169163ebed4bd4916102b6919060040161235b565b604080518083038186803b1580156102cd57600080fd5b505afa1580156102e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103059190612193565b5050600380546001600160a01b0319166001600160a01b0383161790556040517f433b5c8c9ff78f62114ee8804a916537fa42009ebac4965bfed953f771789e47906103529083906122b7565b60405180910390a1506001600055565b600f5460ff166103845760405162461bcd60e51b815260040161025690612475565b60001960005414156103a85760405162461bcd60e51b81526004016102569061273a565b6000196000556103b661207e565b50604080516080810182526010548152600c54602080830191909152600d548284015282516060808201855260085463ffffffff81168352640100000000810460ff16151593830193909352600160281b9092046001600160801b0316938101939093528101919091526104286120ab565b6104328233611032565b90506000806104458385600001516111f9565b915091508082101561045a575050505061063e565b600061047761046761128b565b6104718585611297565b906112f4565b6001546040516370a0823160e01b81529192506000916001600160a01b03909116906370a08231906104ad9030906004016122b7565b60206040518083038186803b1580156104c557600080fd5b505afa1580156104d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104fd91906121d8565b9050600061050b828461135b565b9050600061052161051c8584611297565b611373565b6040805160a0810182526001600160781b03808416808352151560208084019182526000848601818152606086018281526080870183815233808552600790955297909220865181549551925193511515600160f81b026001600160f81b03948816600160801b02600160801b600160f81b0319941515600160781b0260ff60781b19939099166001600160781b0319909816979097179190911696909617919091169390931716929092178155925160019384015591549099509192506105f3916001600160a01b0316908461139c565b337fc3b34c584e097adcd5d59ecaf4107928698a4f075c7753b5dbe28cd20d7ac1fd8361061f8a6113f3565b60405161062d929190612803565b60405180910390a250505050505050505b6001600055565b61064d610b96565b6001600160a01b0316336001600160a01b03161461067d5760405162461bcd60e51b81526004016102569061258c565b60001960005414156106a15760405162461bcd60e51b81526004016102569061273a565b600019600055600680546001600160a01b0319166001600160a01b0383161790556040517f23b29729375efe47b26bdd9fdf3c8a0960c7da56bb584e9c632ca46cbd8f58b9906103529083906122b7565b6106fa610b96565b6001600160a01b0316336001600160a01b03161461072a5760405162461bcd60e51b81526004016102569061258c565b600019600054141561074e5760405162461bcd60e51b81526004016102569061273a565b60001960005542600e8190556040517f05c622992793084d881d5512b50f335e26caaa5e5248d461ed4797992ca181e9916107889161235b565b60405180910390a16001600055565b61079f610b96565b6001600160a01b0316336001600160a01b0316146107cf5760405162461bcd60e51b81526004016102569061258c565b60001960005414156107f35760405162461bcd60e51b81526004016102569061273a565b60001960005561080161128b565b8110156108205760405162461bcd60e51b8152600401610256906123c9565b600c54600d5410156108445760405162461bcd60e51b8152600401610256906124bb565b600d8190556040517f17fd044bab7c0b277a1d267a977b81ab0764f77f84c77967a8feeaf251c6e63c9061035290839061235b565b610881610b96565b6001600160a01b0316336001600160a01b0316146108b15760405162461bcd60e51b81526004016102569061258c565b60001960005414156108d55760405162461bcd60e51b81526004016102569061273a565b600019600055600580546001600160a01b0319166001600160a01b0383161790556040517fbc149e077840b6e1ed5f797839cf031a461fa70bbb7f7330a45dff3e069a0b1c906103529083906122b7565b61092e610b96565b6001600160a01b0316336001600160a01b03161461095e5760405162461bcd60e51b81526004016102569061258c565b60001960005414156109825760405162461bcd60e51b81526004016102569061273a565b60001960009081556001600160a01b0383168152600a602052604090819020805460ff1916831515179055517feaeee7699e70e6b31ac89ec999ef6936b97ac1e364f0e1fcf584772372caa0d3906109dd90849084906122cb565b60405180910390a150506001600055565b6109f6610b96565b6001600160a01b0316336001600160a01b031614610a265760405162461bcd60e51b81526004016102569061258c565b6000196000541415610a4a5760405162461bcd60e51b81526004016102569061273a565b6000196000908155604051637239d6e160e11b81526001600160a01b0383169163e473adc291610a7e9130916004016122e6565b602060405180830381600087803b158015610a9857600080fd5b505af1158015610aac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad09190612177565b50600480546001600160a01b0319166001600160a01b0383161790556040517f9714f7e9fdae98b223fda435ee9a260cef1fe5cb72e85e3dec75f63f35551398906103529083906122b7565b610b246120ab565b610b2c61207e565b610b346120d9565b6000610b3e61145a565b91509150610b4a61207e565b6040518060800160405280838152602001600c548152602001600d548152602001848152509050610b796120ab565b610b83828861168f565b5093995094975050505050505050915091565b6000610bc17fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610361196e565b905090565b6000610bd0610b96565b6001600160a01b0316336001600160a01b031614610c005760405162461bcd60e51b81526004016102569061258c565b610c337fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61036001600160a01b03841661102e565b5060015b919050565b610c44610b96565b6001600160a01b0316336001600160a01b031614610c745760405162461bcd60e51b81526004016102569061258c565b6000196000541415610c985760405162461bcd60e51b81526004016102569061273a565b6000196000908155600e556040517f3f21c8b2e412662a569c5d73adc2cae6df6cec57eb71dba846d69d62846928579061078890429061235b565b610cdb610b96565b6001600160a01b0316336001600160a01b031614610d0b5760405162461bcd60e51b81526004016102569061258c565b6000196000541415610d2f5760405162461bcd60e51b81526004016102569061273a565b600019600090815560405163524f388960e01b81526001600160a01b0383169063524f388990610d6490601190600401612364565b604080518083038186803b158015610d7b57600080fd5b505afa158015610d8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db39190612211565b50905080610dd35760405162461bcd60e51b81526004016102569061265a565b600280546001600160a01b0319166001600160a01b0384161790556040517fad675642c3cba5442815383698d42cd28889533d9671a6d32cffea58ef0874da906109dd9084906122b7565b610e26610b96565b6001600160a01b0316336001600160a01b031614610e565760405162461bcd60e51b81526004016102569061258c565b6000196000541415610e7a5760405162461bcd60e51b81526004016102569061273a565b600019600055610e8861128b565b811015610ea75760405162461bcd60e51b815260040161025690612426565b600d54811115610ec95760405162461bcd60e51b815260040161025690612608565b600c8190556040517f1ca0d10d5750b994b1774ca32af49372b1ffb256a2be24b4b942b79cf7dcefc09061035290839061235b565b610f06610b96565b6001600160a01b0316336001600160a01b031614610f365760405162461bcd60e51b81526004016102569061258c565b600f5460ff1615610f595760405162461bcd60e51b8152600401610256906125c3565b6000196000541415610f7d5760405162461bcd60e51b81526004016102569061273a565b600019600055610f8b61207e565b610f93611972565b90508281600001511015610fb95760405162461bcd60e51b815260040161025690612377565b8051821015610fda5760405162461bcd60e51b8152600401610256906126e5565b80516010819055600f805460ff191660011790556040517f68e4c41627e835051be46337f1542645a60c7e6d6ea79efc5f20bdadae5f88d29161101c9161235b565b60405180910390a15050600160005550565b9055565b61103a6120ab565b6110426120ab565b600080600061104f6120d9565b6110576120f9565b611061898961168f565b6001600160a01b038e1660009081526009602090815260409182902084518154928601519386015163ffffffff1990931663ffffffff9091161764ff000000001916640100000000931515939093029290921765010000000000600160a81b031916600160281b6001600160801b0390921691909102179055949a5092985090965094509250905082156111ea576001600160a01b03881660008181526007602090815260409182902089518154838c0151948c015160608d01511515600160f81b026001600160f81b036001600160781b03928316600160801b02600160801b600160f81b0319981515600160781b0260ff60781b19949096166001600160781b0319909516949094179290921693909317959095161793909316929092178255608089015160019092019190915582015182518b517f1c719d763b0c66fc06b842e1f0bafc88b78f8a03df2f31f9da94810b2aba898c9289929091899190426111cb8e6113f3565b60116040516111e198979695949392919061230a565b60405180910390a25b50939450505050505b92915050565b60008060008085602001511561122c5761122561121461128b565b87516001600160781b031690611a5b565b915061123a565b61123761121461128b565b90505b6040860151600090611255906001600160781b031687611a5b565b90508660600151156112725761126b8382611ab4565b925061127f565b61127c8282611ab4565b91505b50909590945092505050565b670de0b6b3a764000090565b6000828211156112ee576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600080821161134a576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161135357fe5b049392505050565b600081831061136a578161136c565b825b9392505050565b6000600160781b82106113985760405162461bcd60e51b8152600401610256906124fe565b5090565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526113ee908490611b0e565b505050565b600080826060015161140657600061140c565b600160781b5b836020015161141c576000611422565b600160f81b5b845160408601516001600160781b03166effffffffffffffffffffffffffffff60801b60809290921b91909116171717915050919050565b6114626120d9565b600061146c6120d9565b506040805160608101825260085463ffffffff81168252640100000000810460ff1615156020830152600160281b90046001600160801b031681830152600254915163524f388960e01b815290916000916001600160a01b039091169063524f3889906114de90601190600401612364565b604080518083038186803b1580156114f557600080fd5b505afa158015611509573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061152d9190612211565b509050600061154f836000015163ffffffff164261129790919063ffffffff16565b905080156116855761155f6120f9565b50604080518082018252848201516001600160801b031681526020808601511515908201526003549151633afb52f560e21b8152909160009182916001600160a01b03169063ebed4bd4906115b890879060040161235b565b604080518083038186803b1580156115cf57600080fd5b505afa1580156115e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116079190612193565b90925090506116168186611bbf565b9050811561162f576116288382611bd7565b925061163c565b6116398382611c70565b92505b604051806060016040528061165042611cf7565b63ffffffff1681526020018460200151151581526020016116748560000151611d1d565b6001600160801b0316905295505050505b5090925090509091565b6116976120ab565b60008060006116a46120d9565b6116ac6120f9565b6116b46120d9565b5060608801516116c26120d9565b506001600160a01b0388166000908152600960209081526040918290208251606081018452905463ffffffff81168252640100000000810460ff16151592820192909252600160281b9091046001600160801b0316918101919091526117266120ab565b506001600160a01b038916600090815260076020908152604091829020825160a08101845281546001600160781b03808216835260ff600160781b83048116151595840195909552600160801b82041694820194909452600160f81b909304909116151560608301526001015460808201526117a06120f9565b50604080518082018252908401516001600160801b031681526020808501511515908201528351835163ffffffff9182169116106118055760608201516040830151929a5098506001600160781b039091169650600095509193509091506119649050565b60408201516001600160781b03166118445760608201516040830151929a5098506001600160781b039091169650600095509193509091506119649050565b82602001511561186e5760408301516118679082906001600160801b0316611c70565b905061188a565b60408301516118879082906001600160801b0316611bd7565b90505b606082015160208201511515901515148015906000906118f357604084015183516118bd916001600160781b0316611bbf565b90506118c98482611d42565b6118e96118de6118d761128b565b8390611a5b565b608086015190611ab4565b6080850152611950565b6040840151835161190c916001600160781b0316611d6b565b9050600061191b6118d761128b565b90506119278583611db0565b808560800151101561193a576000611949565b60808501516119499082611297565b6080860152505b929a50985090965060019550919350909150505b9295509295509295565b5490565b61197a61207e565b6119826120d9565b600061198c61145a565b815160088054602085015160408601516001600160801b0316600160281b0265010000000000600160a81b03199115156401000000000264ff000000001963ffffffff90961663ffffffff199094169390931794909416919091171691909117905590925090507f995e61c355733308eab39a59e1e1ac167274cdd1ad707fe4d13e127a01076428611a1d83611dcd565b604051611a2a919061235b565b60405180910390a160408051608081018252918252600c546020830152600d54908201526060810191909152905090565b600082611a6a575060006111f3565b82820282848281611a7757fe5b041461136c5760405162461bcd60e51b81526004018080602001828103825260218152602001806128556021913960400191505060405180910390fd5b60008282018381101561136c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6060611b63826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611e0d9092919063ffffffff16565b8051909150156113ee57808060200190516020811015611b8257600080fd5b50516113ee5760405162461bcd60e51b815260040180806020018281038252602a815260200180612876602a913960400191505060405180910390fd5b600061136c670de0b6b3a76400006104718585611a5b565b611bdf6120f9565b826020015115611c1c576040518060400160405280611c0b856000015185611ab490919063ffffffff16565b8152600160209091015290506111f3565b8251821115611c47576040518060400160405280611c0b85600001518561129790919063ffffffff16565b6040805180820190915283518190611c5f9085611297565b815260006020909101529392505050565b611c786120f9565b8260200151611cb4576040518060400160405280611ca3856000015185611ab490919063ffffffff16565b8152600060209091015290506111f3565b8251821015611cd5576040805180820190915283518190611c0b9085611297565b6040518060400160405280611c5f85600001518561129790919063ffffffff16565b600064010000000082106113985760405162461bcd60e51b81526004016102569061269f565b6000600160801b82106113985760405162461bcd60e51b815260040161025690612545565b611d4a6120f9565b611d5383611e24565b9050611d5f8183611bd7565b90506113ee8382611e55565b6000821580611d78575081155b15611d85575060006111f3565b61136c6001611daa670de0b6b3a764000061047183611da48989611a5b565b90611297565b90611ab4565b611db86120f9565b611dc183611e24565b9050611d5f8183611c70565b6000806088836000015163ffffffff16901b8360200151611def576000611df5565b600160801b5b60408501516001600160801b03161717915050919050565b6060611e1c8484600085611e78565b949350505050565b611e2c6120f9565b506040805180820190915281516001600160781b03168152602080830151151590820152919050565b8051611e6090611373565b6001600160781b031682526020908101511515910152565b606082471015611eb95760405162461bcd60e51b815260040180806020018281038252602681526020018061282f6026913960400191505060405180910390fd5b611ec285611fd4565b611f13576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b60208310611f525780518252601f199092019160209182019101611f33565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114611fb4576040519150601f19603f3d011682016040523d82523d6000602084013e611fb9565b606091505b5091509150611fc9828286611fda565b979650505050505050565b3b151590565b60608315611fe957508161136c565b825115611ff95782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561204357818101518382015260200161202b565b50505050905090810190601f1680156120705780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60405180608001604052806000815260200160008152602001600081526020016120a66120d9565b905290565b6040805160a08101825260008082526020820181905291810182905260608101829052608081019190915290565b604080516060810182526000808252602082018190529181019190915290565b604080518082019091526000808252602082015290565b80356001600160a01b0381168114610c3757600080fd5b600060208284031215612138578081fd5b61136c82612110565b60008060408385031215612153578081fd5b61215c83612110565b9150602083013561216c8161281d565b809150509250929050565b600060208284031215612188578081fd5b815161136c8161281d565b600080604083850312156121a5578182fd5b82516121b08161281d565b6020939093015192949293505050565b6000602082840312156121d1578081fd5b5035919050565b6000602082840312156121e9578081fd5b5051919050565b60008060408385031215612202578182fd5b50508035926020909101359150565b60008060408385031215612223578182fd5b505080516020909101519092909150565b600081546001808216600081146122525760018114612270576122ae565b60028304607f16865260ff19831660208701526040860193506122ae565b6002830480875261228086612811565b60005b828110156122a45781546020828b0101528482019150602081019050612283565b8801602001955050505b50505092915050565b6001600160a01b0391909116815260200190565b6001600160a01b039290921682521515602082015260400190565b6001600160a01b03929092168252602082015260400190565b901515815260200190565b60006101008a1515835289151560208401528860408401528760608401528660808401528560a08401528460c08401528060e084015261234c81840185612234565b9b9a5050505050505050505050565b90815260200190565b60006020825261136c6020830184612234565b60208082526032908201527f4f7261636c65207072696365206973206c657373207468616e207468652070726040820152711bdd9a591959081b1bddd95c88189bdd5b9960721b606082015260800190565b6020808252603e908201527f54686520696e697469616c206d617267696e20636f6c6c61746572616c20726560408201527f71756972656d656e742063616e6e6f7420626520756e64657220313030250000606082015260800190565b6020808252602f908201527f54686520636f6c6c61746572616c20726571756972656d656e742063616e6e6f60408201526e7420626520756e646572203130302560881b606082015260800190565b60208082526026908201527f4f6e6c79207065726d697474656420647572696e672066696e616c20736574746040820152651b195b595b9d60d21b606082015260800190565b60208082526023908201527f5f494e495449414c5f4d415247494e5f203e3d204d494e5f434f4c4c41544552604082015262414c5f60e81b606082015260800190565b60208082526027908201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316040820152663230206269747360c81b606082015260800190565b60208082526027908201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316040820152663238206269747360c81b606082015260800190565b6020808252601e908201527f41646d696e61626c653a2063616c6c6572206973206e6f742061646d696e0000604082015260600190565b60208082526025908201527f4e6f74207065726d697474656420647572696e672066696e616c20736574746c604082015264195b595b9d60da1b606082015260800190565b60208082526032908201527f5f4d41494e54454e414e43455f4d415247494e5f203c3d20494e495449414c5f6040820152714d415247494e5f434f4c4c41544552414c5f60701b606082015260800190565b60208082526025908201527f4e6577206f7261636c652063616e6e6f742072657475726e2061207a65726f20604082015264707269636560d81b606082015260800190565b60208082526026908201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360408201526532206269747360d01b606082015260800190565b60208082526035908201527f4f7261636c652070726963652069732067726561746572207468616e20746865604082015274081c1c9bdd9a591959081d5c1c195c88189bdd5b99605a1b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b82516001600160781b0390811682526020808501511515818401526040808601519092168284015260608086015115158185015260809586015195840195909552835160a08401528381015160c08401528382015160e08401529290930151805163ffffffff166101008301529182015115156101208201529101516001600160801b03166101408201526101600190565b918252602082015260400190565b60009081526020902090565b801515811461282b57600080fd5b5056fe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a264697066735822122049fb41060f3bef37ab31ffb01049084d057320998097e255ea8b72ce6fa359bd64736f6c63430007050033";
