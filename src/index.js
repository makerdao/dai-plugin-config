import { formatContracts, mapTokens } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';

let config = {};

const setUrl = env => {
  switch (env) {
    case 'prod':
      return APP_URL_PROD;
    case 'dev':
      return APP_URL_DEV;
    default:
      return env;
  }
};

export default {
  beforeCreate: async function({ testchainId, backendEnv = 'prod' }) {
    const url = setUrl(backendEnv);
    console.log('fetch url', `${url}${testchainId}`);

    try {
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
        smartContract: { addContracts },
        token: { erc20 }
      };
    } catch (err) {
      console.error(err);
    }

    return {};
  },
  addConfig: function(existingConfig) {
    return {
      ...existingConfig,
      ...config
    };
  }
};
