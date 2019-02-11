import { formatContracts } from './utils/configHelper';
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
      accountsProvider = 'privateKey'
    } = pluginOptions;

    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();

    const { chain_details, deploy_data, config: chainConfig } = json.details;
    console.log(chain_details, deploy_data);

    const { rpc_url, accounts } = chain_details;

    const addContracts = formatContracts(deploy_data);
    console.log('add these contracts', addContracts);

    // accounts.map(account => {
    //   accounts[account.address] = {
    //     type: accountsProvider,
    //     key: account.priv_key
    //   };
    // });

    const config = {
      url: rpc_url,
      provider: {
        type: 'HTTP',
        network: chainConfig.type
      },
      // accounts,
      smartContract: { addContracts },
      token: {
        erc20: [
          {
            symbol: 'MKR',
            address: deploy_data.MCD_GOV
          }
        ]
      }
    };

    return config;
  }
};
