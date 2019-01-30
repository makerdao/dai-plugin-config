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

export const getContracts = () => {
  // Contract Setup
  const contractAddresses = {
    // kovan: require('../../contracts/addresses/kovan.json'),
    // mainnet: require('../../contracts/addresses/mainnet.json'),
    testnet: require('../../contracts/addresses/testnet.json')
  };

  const addContracts = {
    [CHIEF]: {
      address: map(prop('chief'), contractAddresses),
      abi: require('../../contracts/abis/DSChief.json')
    },
    [PROXY_FACTORY]: {
      address: map(prop('proxy_factory'), contractAddresses),
      abi: require('../../contracts/abis/VoteProxyFactory.json')
    },
    [POLLING]: {
      address: map(prop('polling'), contractAddresses),
      abi: require('../../contracts/abis/Polling.json')
    }
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
