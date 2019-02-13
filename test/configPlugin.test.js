import Maker from '@makerdao/dai';
import configPlugin from '../src';
import each from 'jest-each';
import 'whatwg-fetch';

const mainnetId = 1;
const kovanId = 42;
const ganacheId = 999;
// const addedContracts = ['CHIEF', 'POLLING', 'PROXY_FACTORY'];

const setupTestMakerInstance = async testchainId => {
  const makerConfig = {
    plugins: [[configPlugin, { testchainId: testchainId }]],
    log: false
  };

  const maker = await Maker.create('http', makerConfig);
  await maker.authenticate();
  return maker;
};

test.skip('can create a Maker instance with a specific configuration based on a testchainId', async () => {
  const testchainId = '3563321456763763453';
  const expectedTokens = ['DAI', 'MKR', 'WETH', 'PETH', 'ETH'];

  const maker = await setupTestMakerInstance(testchainId);

  const networkId = maker.service('web3').networkId();
  expect(networkId).toBe(ganacheId);

  const tokens = maker.service('token').getTokens();
  expect(tokens).toEqual(expectedTokens);
});
