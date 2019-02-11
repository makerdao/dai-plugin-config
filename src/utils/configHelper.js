import { PROXY_FACTORY, CHIEF, POLLING, MCD_ADM } from './constants';

export const formatContracts = deployedContracts => {
  console.log('deployedContracts', deployedContracts);

  const addContracts = {
    [MCD_ADM]: {
      address: { testnet: deployedContracts.MCD_ADM },
      abi: require('../../contracts/abis/DSChief.json')
    },
    [PROXY_FACTORY]: {
      address: { testnet: deployedContracts.VOTE_PROXY_FACTORY },
      abi: require('../../contracts/abis/VoteProxyFactory.json')
    },
    [POLLING]: {
      address: { testnet: '0xbeefed1bedded2dabbed3defaced4decade5caca' },
      abi: require('../../contracts/abis/Polling.json')
    },
    PROXY_REGISTRY: {
      address: { testnet: deployedContracts.PROXY_REGISTRY }
    },
    VOTE_YES: {
      address: deployedContracts.VOTE_YES,
      abi: ''
    },
    VOTE_NO: {
      address: deployedContracts.VOTE_NO,
      abi: ''
    },
    GOV: {
      address: { testnet: deployedContracts.MCD_GOV }
    },
    MKR: {
      address: { testnet: deployedContracts.MCD_GOV }
    }
    // POLL_ID: {
    //   address: { testnet: deployedContracts.POLL_ID },
    //   abi: ''
    // }
  };

  return addContracts;
};
