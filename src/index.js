import { formatContracts, mapTokens } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';

let config = {};

export default {
  beforeCreate: async function({ testchainId }) {
    const url =
      window.location.hostname === 'localhost' ? APP_URL_DEV : APP_URL_PROD;

    console.log('fetch url', `${url}${testchainId}`);
    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();

    const { chain_details, deploy_data, config: chainConfig } = json.details;
    const { rpc_url, accounts } = chain_details;

    const addContracts = formatContracts(deploy_data);
    const erc20 = mapTokens(addContracts);

    config = {
      url: rpc_url,
      provider: {
        type: 'HTTP',
        network: chainConfig.type
      },
      // accounts: {
      //   // usera: {
      //   //   // address: accounts[1].address,
      //   //   type: 'provider',
      //   //   key: accounts[1].priv_key
      //   // }
      //   owner: {
      //     address: accounts[0].address,
      //     type: 'provider',
      //     key: accounts[0].priv_key
      //   }
      // },
      smartContract: { addContracts },
      token: { erc20 }
    };

    return {};
  },
  addConfig: function(existingConfig) {
    return {
      ...existingConfig,
      ...config
    };
  }
};
