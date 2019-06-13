import abiMap from '../../contracts/abiMap.json';
import tokens from '../../contracts/tokens.json';
import { createCurrency } from '@makerdao/currency';

export const formatContracts = deployedContracts => {
  const addContracts = Object.keys(deployedContracts).reduce(
    (result, contractName) => {
      result[contractName] = {
        address: { testnet: deployedContracts[contractName] }
      };
      if (abiMap[contractName]) {
        result[contractName].abi = require(`../../contracts/abis/${
          abiMap[contractName]
        }.json`);
      } else {
        const prefix = Object.keys(abiMap).find(
          k =>
            k.substring(k.length - 1) == '*' &&
            k.substring(0, k.length - 1) ==
              contractName.substring(0, k.length - 1)
        );
        if (prefix)
          result[contractName].abi = require(`../../contracts/abis/${
            abiMap[prefix]
          }.json`);
      }
      return result;
    },
    {}
  );

  // These MCD contracts are also required for SCD
  if (addContracts['MCD_ADM']) addContracts.CHIEF = addContracts['MCD_ADM'];
  if (addContracts['MCD_IOU']) addContracts.IOU = addContracts['MCD_IOU'];
  if (addContracts['MCD_DAI_GUARD'])
    addContracts.MCD_DAI_GUARD = {
      address: { testnet: '0x2a92ccf051f33912115f86ea0530f4999e3ac1ac' }
    };

  return addContracts;
};

export const mapTokens = contracts => {
  return Object.keys(tokens).reduce((result, key) => {
    if (contracts[key]) {
      let currency = createCurrency(tokens[key].name);
      result.push({
        currency,
        symbol: currency.symbol,
        address: contracts[key].address.testnet,
        abi: contracts[key].abi,
        decimals: tokens[key].decimals || 18
      });
    }
    return result;
  }, []);
};
