import abiMap from '../../contracts/abiMap.json';
import tokens from '../../contracts/tokens';
import { createCurrency } from '@makerdao/currency';

export const formatContracts = deployedContracts => {
  const addContracts = Object.keys(deployedContracts).reduce((result, key) => {
    result[key] = { address: { testnet: deployedContracts[key] } };
    if (abiMap[key])
      result[key].abi = require(`../../contracts/abis/${abiMap[key]}.json`);
    return result;
  }, {});

  // Chief is required for SCD
  if (addContracts['MCD_ADM']) addContracts.CHIEF = addContracts['MCD_ADM'];

  return addContracts;
};

export const mapTokens = contracts => {
  return Object.keys(tokens).reduce((result, key) => {
    if (contracts[key]) {
      const name = tokens[key];
      let currency = createCurrency(name);
      result.push({
        currency,
        symbol: currency.symbol,
        address: contracts[key].address.testnet
      });
    }
    return result;
  }, []);
};
