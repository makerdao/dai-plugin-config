import {
  url,
  provider,
  accounts,
  addContracts,
  web3
} from './utils/configHelper';
import { privateKey } from './keys';

export default async testchainId => {
  const config = configHelper(testchainId);
  return config;
};

const configHelper = testchainId => {
  switch (parseInt(testchainId)) {
    case 1:
      return mainnetConfig;
    case 2:
      return taasConfig;
    case 42:
      return kovanConfig;
    case 999:
      return ganacheConfig;
    default:
      break;
  }
};
const taasConfig = {
  url: url.taas,
  web3: web3,
  // privateKey: privateKey.ganache,
  accounts: accounts.ganache,
  provider: provider.taas,
  smartContract: { addContracts }
};

const mainnetConfig = {
  url: url.mainnet,
  web3: web3,
  privateKey: privateKey.mainnet,
  accounts: accounts.mainnet,
  provider: provider.mainnet,
  smartContract: { addContracts }
};

const ganacheConfig = {
  url: url.ganache,
  web3: web3,
  // privateKey: privateKey.ganache,
  // accounts: accounts.ganache,
  provider: provider.ganache,
  smartContract: { addContracts }
};

const kovanConfig = {
  url: url.kovan,
  web3: web3,
  privateKey: privateKey.kovan,
  accounts: accounts.kovan,
  provider: provider.kovan,
  smartContract: { addContracts }
};
