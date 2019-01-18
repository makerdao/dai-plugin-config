import { addContracts, web3 } from './utils/configHelper';

/**
 * Notes:
 * maybe we don't need web3, should the user of Maker.create be expected to provide it?
 */

export default {
  beforeCreate: async function(pluginOptions) {
    let { testchainId, accountsProvider = 'privateKey' } = pluginOptions;

    const res = await fetch(`http://localhost:4000/chain/${testchainId}`);
    const json = await res.json();

    const { rpc_url, accounts: chainAccounts } = json.details;

    console.log('chain accounts before reformat', chainAccounts);

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
      }
      // accounts,
      // smartContract: { addContracts }
    };

    return config;
  }
};
