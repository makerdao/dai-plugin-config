/**
 * ali: 0xbc838ab7af00cda00cb02efbbe4dbb1ce51f5d2613acfe11bd970ce659ad8704
 */
export const privateKey = {
  mainnet: '0xc7041bb82097139b453ec6f8d52a43d5bcb001c7a3c2506bc1fd8a773e0849ed',
  kovan: '0xc7041bb82097139b453ec6f8d52a43d5bcb001c7a3c2506bc1fd8a773e0849ed',
  ganache: '0xbc838ab7af00cda00cb02efbbe4dbb1ce51f5d2613acfe11bd970ce659ad8704'
};

export const ganacheCoinbase = {
  address: '0x16fb96a5fa0427af0c8f7cf1eb4870231c8154b6',
  privateKey:
    '0x474beb999fed1b3af2ea048f963833c686a0fba05f5724cb6417cf3b8ee9697e',
  type: 'GANACHE'
};
// ^ our default coinbase BUT we should probably avoid using it for
// tests (besides sending mkr) since it's the address the contracts are deployed
// from on ganache, so it has special privledges that could affect test results

// some of the accounts that're generated from the mnemonic we give ganache
export const ganacheAccounts = [
  {
    address: '0xda1495ebd7573d8e7f860862baa3abecebfa02e0',
    privateKey:
      '0xbc838ab7af00cda00cb02efbbe4dbb1ce51f5d2613acfe11bd970ce659ad8704',
    type: 'GANACHE'
  },
  {
    address: '0x81431b69b1e0e334d4161a13c2955e0f3599381e',
    privateKey:
      '0xb3ae65f191aac33f3e3f662b8411cabf14f91f2b48cf338151d6021ea1c08541',
    type: 'GANACHE'
  },
  {
    address: '0xb76a5a26ba0041eca3edc28a992e4eb65a3b3d05',
    privateKey:
      '0xa052332a502d9a91636931be4ffd6e1468684544a1a7bc4a64c21c6f5daa759a',
    type: 'GANACHE'
  }
];
