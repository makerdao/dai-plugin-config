import abiMap from '../../contracts/abiMap.json';

export const formatContracts = deployedContracts => {
  let addContracts = {};
  for (let contract in deployedContracts) {
    addContracts[contract] = {
      address: {
        testnet: deployedContracts[contract]
      }
    };
    if (abiMap[contract])
      addContracts[contract].abi = require(`../../contracts/abis/${
        abiMap[contract]
      }.json`);
  }

  return addContracts;
};
