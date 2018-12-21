import fetchConfig from './fetchConfig';

export default {
  beforeCreate: async function(testchainId) {
    const config = await fetchConfig(testchainId);
    //TODO: remove this placeholder http call
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await res.json();

    return Object.assign(config, json);
  }
};
