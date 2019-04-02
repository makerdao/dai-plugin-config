import { formatContracts, mapTokens } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';

let config = {};

export default {
  beforeCreate: async function(pluginOptions) {
    let { testchainId } = pluginOptions;
    const url = APP_URL_PROD;

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
      accounts: {
        owner: {
          address: accounts[0].address,
          type: 'provider',
          key: accounts[0].priv_key
        }
      },
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
