import abiMap from '../../contracts/abiMap.json';

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
