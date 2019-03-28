import { formatContracts } from './utils/configHelper';
const APP_URL_DEV = 'http://localhost:4000/chain/';
const APP_URL_PROD = 'http://18.185.172.121:4000/chain/';
import { createCurrency } from '@makerdao/currency';

const MKR = createCurrency('MKR');
const IOU = createCurrency('IOU');

let config = {};

export default {
  beforeCreate: async function(pluginOptions) {
    let { testchainId } = pluginOptions;
    const url = APP_URL_PROD;

    const res = await fetch(`${url}${testchainId}`);
    const json = await res.json();

    const { chain_details, deploy_data, config: chainConfig } = json.details;
    const { rpc_url, accounts } = chain_details;

    // FIXME: deploy_data is missing IOU, it will be added after 4/4/19 deployment
    // TODO: can we get IOU address from chief contract dynamically until solved?
    deploy_data.IOU = '0xc5996bab8c3531b19f2e62c1b7293637c8b76961';

    const addContracts = formatContracts(deploy_data);

    const settings = {
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
      token: {
        erc20: [
          {
            currency: MKR,
            symbol: MKR.symbol,
            address: deploy_data.MCD_GOV
          },
          {
            currency: IOU,
            symbol: IOU.symbol,
            address: deploy_data.IOU
          }
        ]
      }
    };

    Object.assign(config, settings);

    return {};
  },
  addConfig: function(existingConfig) {
    return {
      ...existingConfig,
      ...config
    };
  }
};
