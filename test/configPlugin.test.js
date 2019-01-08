import Maker from '@makerdao/dai';
import testchainClientPlugin from '../src';
import each from 'jest-each';
import 'whatwg-fetch';

const mainnetId = 1;
const kovanId = 42;
const ganacheId = 999;
const addedContracts = ['CHIEF', 'POLLING', 'PROXY_FACTORY'];

const setupTestMakerInstance = async testchainId => {
  const makerConfig = {
    plugins: [[testchainClientPlugin, { testchainId: testchainId }]],
    log: false
  };

  const maker = await Maker.create('http', makerConfig);
  await maker.authenticate();
  return maker;
};

each([mainnetId, kovanId, ganacheId]).test(
  'can create a Maker instance with a specific configuration based on a testchainId',
  async testchainId => {
    const maker = await setupTestMakerInstance(testchainId);
    const networkId = maker.service('web3').networkId();
    expect(networkId).toBe(testchainId);

    addedContracts.forEach(contract =>
      expect(maker.service('smartContract').hasContract(contract)).toBe(true)
    );
  }
);
