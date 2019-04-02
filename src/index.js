import { formatContracts, formatToken } from './utils/configHelper';
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

    const addContracts = formatContracts(deploy_data);

    const erc20 = [
      {
        currency: MKR,
        symbol: MKR.symbol,
        address: addContracts.MCD_GOV.address.testnet
      }
    ];

    if (addContracts.IOU) {
      const iouToken = {
        currency: IOU,
        symbol: IOU.symbol,
        address: addContracts.IOU.address.testnet
      };
      erc20.push(iouToken);
    }

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
