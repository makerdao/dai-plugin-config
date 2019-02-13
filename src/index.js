import { formatContracts } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';

export default {
  beforeCreate: async function(pluginOptions) {
    let { testchainId } = pluginOptions;
    const url = APP_URL_DEV;

    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();

    const { chain_details, deploy_data, config: chainConfig } = json.details;
    const { rpc_url, accounts } = chain_details;

    console.log('deploy_data', deploy_data);

    // const addContracts = formatContracts(deploy_data);

    const config = {
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
      smartContract: {
        addContracts: {
          GOV_POLL_GEN: { address: { testnet: deploy_data.GOV_POLL_GEN } },
          MCD_ADM: { address: { testnet: deploy_data.MCD_ADM } },
          VOTE_PROXY_FACTORY: {
            address: { testnet: deploy_data.VOTE_PROXY_FACTORY }
          }
        }
      },
      // smartContract: { addContracts },
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
