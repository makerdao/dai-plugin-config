<h1 align="center">
Dai Config Plugin
</h1>

[![GitHub License][license]][license-url]
[![NPM][npm]][npm-url]

### Development

This plugin fetches configuration data from a testchain backend, and creates a config object to be provided to the Maker SDK so it can be used with a testchain. Add it to the end of the `plugins` array to ensure the options override the default config.

_see [Dai.js](https://github.com/makerdao/dai.js) for more details_

#### Example using the Maker SDK

```
import Maker from '@makerdao/dai';
import configPlugin from '@makerdao/dai-plugin-config';

const config = {
    plugins: [
        [configPlugin, { testchainId: '123abc', backendEnv: 'dev' }]
        ],
    log: false
  };

await Maker.create('http', config);
```

#### Details

`testchainId`: Must be a running testchain ID on the selected backend environment.

`backendEnv`: (optional) defaults to the 'prod' URL, which is `http://18.185.172.121:4000/chain/`. Options are `prod`, `dev`, or any user-specified URL.

In the `beforeCreate` block, the plugin will fetch testchain data from the URL. This includes the testchain RPC, all the deployed contracts, and required tokens. It will create a config object that looks like this:

```
config = {
        url: rpc_url,
        provider: {
          type: 'HTTP',
          network: chainConfig.type
        },
        smartContract: { addContracts },
        token: { erc20 }
      };
```

## Code Style

We run Prettier on-commit, which means you can write code in whatever style you want and it will be automatically formatted according to the common style when you run `git commit`.

### License

The dai config plugin is [MIT licensed](./LICENSE).

[license]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/makerdao/dai-plugin-config/blob/master/LICENSE
[npm]: https://img.shields.io/npm/v/@makerdao/dai-plugin-config.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@makerdao/dai-plugin-config
