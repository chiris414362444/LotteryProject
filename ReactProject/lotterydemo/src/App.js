import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    playerAddress: '',
    value: '',
    message : ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance});
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: '等待交易完成.......'});
    console.log(this.state.playerAddress);

    if (!this.state.playerAddress) {
      this.setState({message: '请输入账户地址！'});
      return;
    }

    if (!this.state.value) {
      this.setState({message: '请输入参与金额！'});
      return;
    }

    await lottery.methods.enetr().send({from: this.state.playerAddress, value: web3.utils.toWei(this.state.value, 'ether')});
    this.setState({message: '交易成功！'});
  }

  onClick = async ()=> {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: '等待交易完成.......'});
    await lottery.methods.pickwiner().send({from: accounts[0]});
    this.setState({message: '赢家已产生！'});
  }

  render() {
    //console.log(web3.version);
    console.log(this.state.value);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>欢迎进入博彩项目</h1>
          <p>当前参与者的数量： {this.state.players.length}</p>
          <p>当前资金池总金额：{web3.utils.fromWei(this.state.balance, 'ether')} ETH</p>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>请输入您的账户地址：</label>
              <input className='form-control' value={this.state.playerAddress} onChange={event=>{this.setState({playerAddress:event.target.value})}}/>
              <label>请输入您想参与的金额：</label>
              <input className='form-control' value={this.state.value} onChange={event=>{this.setState({value:event.target.value})}}/>
              <button>提交</button>
            </div>
            <h4>{this.state.message}</h4>
          </form>
          <div>
            <h4>判断输赢</h4>
            <button onClick={this.onClick}>开始博彩</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
