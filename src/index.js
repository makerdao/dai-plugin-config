import {
  formatContracts,
  web3,
  runDeployContracts
} from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';

const url = APP_URL_DEV;
// const url = APP_URL_PROD;

// const url =
//   process.env.NODE_ENV === 'development'
//     ? APP_URL_DEV
//     : 'http://localhost:4000/chain/';

export default {
  beforeCreate: async function(pluginOptions) {
    let {
      testchainId,
      deployContracts = false,
      accountsProvider = 'privateKey',
      externalApi = '' // allow for an external api url override
    } = pluginOptions;

    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();

    // const { rpc_url, accounts: chainAccounts } = json.details;
    // console.log('JSON details', json.details);

    const { chain_details, deploy_data } = json.details;
    console.log(chain_details, deploy_data);

    const { rpc_url, accounts } = chain_details;

    const port = rpc_url.substring(17);

    if (deployContracts) {
      const result = await runDeployContracts(port);
      console.log(result);
    }

    const addContracts = formatContracts(deploy_data);
    console.log('add these contracts', addContracts);

    // hack until we get network ID back from the endpoint
    const network = 'ganache';

    // const accounts = {};
    // remove the coinbase account from the accounts
    accounts.map(account => {
      accounts[account.address] = {
        type: accountsProvider,
        key: account.priv_key
      };
    });

    const config = {
      url: rpc_url,
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
