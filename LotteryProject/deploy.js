const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'bacon sick habit grain pen turtle sad solid wolf stumble sound emerge',  // 助记词
  'http://ropsten.infura.io/v3/bdc7db3df9b24971acca76e474ae121f' // ropsten测试网络
);

const web3 = new Web3(provider);

const deploy = async ()=>{
  console.log('contract interface:', interface);
  const accounts = await web3.eth.getAccounts();
  console.log('Attemp to deploy contract', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: '0x' + bytecode})
    .send({from: accounts[0], gas: '1000000'});
  console.log('Result', result);
  console.log('contract deployed to', result.options.address);
}

deploy();
