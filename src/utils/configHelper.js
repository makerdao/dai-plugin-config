import { PROXY_FACTORY, CHIEF, POLLING } from './constants';
// import { ganacheCoinbase, ganacheAccounts } from '../keys';
import { map, prop } from 'ramda';
import { exec } from 'child_process';

export const runDeployContracts = port => {
  const cmd = `cd $HOME/Documents/code/web/testchain-client/testchain && ./deploy ${port}`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

export const web3 = {
  transactionSettings: { gasLimit: 4000000 }
};

export const formatContracts = deployedContracts => {
  const useJson = true;
  // Contract Setup
  // const contractAddresses = {
  //   // kovan: require('../../contracts/addresses/kovan.json'),
  //   // mainnet: require('../../contracts/addresses/mainnet.json'),
  //   // testnet: require('../../contracts/addresses/testnet.json')
  //   testnet: require('../../contracts/addresses/myjsonfile.json')
  // };

  let contractAddresses = deployedContracts;
  console.log('deployedContracts', contractAddresses);
  const mockAddress = '0xbeefed1bedded2dabbed3defaced4decade5caca';

  // Note to self, addresses can come from here, if you can't get them from deployed
  const demoContracts = require('../../contracts/addresses/testnet.json');

  if (useJson) {
    const addContracts = {
      [CHIEF]: {
        address: demoContracts.chief,
        abi: require('../../contracts/abis/DSChief.json')
      },
      [PROXY_FACTORY]: {
        address: demoContracts.proxy_factory,
        abi: require('../../contracts/abis/VoteProxyFactory.json')
      },
      [POLLING]: {
        address: demoContracts.chief,
        abi: require('../../contracts/abis/Polling.json')
      },
      VOTE_YES: {
        address: {
          testnet: contractAddresses ? contractAddresses.VOTE_YES : mockAddress
        },
        abi: ''
      },
      VOTE_NO: {
        address: {
          testnet: contractAddresses ? contractAddresses.VOTE_NO : mockAddress
        },
        abi: ''
      },
      POLL_ID: {
        address: '0xbeefed1bedded2dabbed3defaced4decade5caca',
        abi: ''
      }
    };

    return addContracts;
  }

  const addContracts = {
    [CHIEF]: {
      address: { testnet: contractAddresses.MCD_ADM },
      abi: require('../../contracts/abis/DSChief.json')
    },
    [PROXY_FACTORY]: {
      address: { testnet: contractAddresses.VOTE_PROXY_FACTORY },
      abi: require('../../contracts/abis/VoteProxyFactory.json')
    },
    [POLLING]: {
      address: { testnet: demoContracts.chief },
      abi: require('../../contracts/abis/Polling.json')
    },
    PROXY_REGISTRY: {
      address: { testnet: contractAddresses.PROXY_REGISTRY }
    },
    VOTE_YES: {
      address: { testnet: contractAddresses.VOTE_YES },
      abi: ''
    },
    VOTE_NO: {
      address: { testnet: contractAddresses.VOTE_NO },
      abi: ''
    }
    // POLL_ID: {
    //   address: { testnet: contractAddresses.POLL_ID },
    //   abi: ''
    // }
  };

  return addContracts;
};

// export const addContracts = {
//   [CHIEF]: {
//     address: map(prop('chief'), contractAddresses),
//     abi: require('../../contracts/abis/DSChief.json')
//   },
//   [PROXY_FACTORY]: {
//     address: map(prop('proxy_factory'), contractAddresses),
//     abi: require('../../contracts/abis/VoteProxyFactory.json')
//   },
//   [POLLING]: {
//     address: map(prop('polling'), contractAddresses),
//     abi: require('../../contracts/abis/Polling.json')
//   }
// };

// export const url = {
//   mainnet: 'https://mainnet.infura.io/',
//   kovan: 'https://kovan.infura.io/',
//   ganache: 'http://localhost:2000',
//   taas: 'http://localhost:8545'
// };

// export const provider = {
//   mainnet: {
//     type: 'INFURA',
//     network: 'mainnet'
//   },
//   kovan: {
//     type: 'INFURA',
//     network: 'kovan'
//   },
//   ganache: { type: 'HTTP', network: 'ganache' },
//   taas: { type: 'HTTP' }
// };

// export const accounts = {
//   ganache: {
//     owner: { type: 'privateKey', key: ganacheCoinbase.privateKey },
//     ali: { type: 'privateKey', key: ganacheAccounts[0].privateKey },
//     sam: { type: 'privateKey', key: ganacheAccounts[1].privateKey },
//     ava: { type: 'privateKey', key: ganacheAccounts[2].privateKey }
//   },
//   kovan: {
//     owner: { type: 'privateKey', key: ganacheCoinbase.privateKey },
//     ali: { type: 'privateKey', key: ganacheAccounts[0].privateKey },
//     sam: { type: 'privateKey', key: ganacheAccounts[1].privateKey },
//     ava: { type: 'privateKey', key: ganacheAccounts[2].privateKey }
//   },
//   mainnet: {}
// };
