import { getContracts, web3, runDeployContracts } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';

const url =
  process.env.NODE_ENV === 'development'
    ? APP_URL_DEV
    : 'http://localhost:4000/chain/';

/**
 * Notes:
 * maybe we don't need web3, should the user of Maker.create be expected to provide it?
 */

export default {
  beforeCreate: async function(pluginOptions) {
    let {
      testchainId,
      deployContracts = false,
      accountsProvider = 'privateKey'
    } = pluginOptions;

    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();
    const { rpc_url, accounts: chainAccounts } = json.details;
    const port = rpc_url.substring(17);
    if (deployContracts) {
      const result = await runDeployContracts(port);
      console.log(result);
    }

    const addContracts = getContracts();
    console.log(addContracts);

    // hack until we get network ID back from the endpoint
    const network = 'ganache';

    const accounts = {};
    chainAccounts.map(account => {
      accounts[account.address] = {
        type: accountsProvider,
        key: account.priv_key
      };
    });

    const config = {
      url: rpc_url,
      web3,
      provider: {
        type: 'HTTP',
        network
      },
      // accounts,
      smartContract: { addContracts }
    };

    return config;
  }
};
