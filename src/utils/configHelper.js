import abiMap from '../../contracts/abiMap.json';
import { ZERO_ADDRESS } from './constants';

export const formatContracts = deployedContracts => {
  let addContracts = {};

  // We need to ensure IOU is present on addContracts to add the token successfully.
  if (!deployedContracts['IOU']) deployedContracts.IOU = ZERO_ADDRESS;

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

  // Chief is required for SCD
  if (addContracts['MCD_ADM']) addContracts.CHIEF = addContracts['MCD_ADM'];

  return addContracts;
};
