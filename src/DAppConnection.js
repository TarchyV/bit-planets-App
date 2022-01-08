
import detectEthereumProvider from '@metamask/detect-provider';
import React, { Component } from 'react';
import metaMask from './metamask.svg';

import Button from '@mui/material/Button';



class DAppConnection extends Component {

  address = 'hello';
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      address: '',
      type: '',
      currentAccount: null,
    };
  }

  getProvider = async () => {
const provider = await detectEthereumProvider();
if (provider) {
  await this.startApp(provider).then(() => {
    this.setState({ 
      connected: true,
      address: provider.selectedAddress,
      type: provider.type,
      
     });
  });
} else {
  console.log('Please install MetaMask!');
}
}

 async startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  console.log('MetaMask detected!', provider);
  var userAddress = "";
    // Now we can use the provider to get the user's address
    provider.enable().then(function() {
      console.log('Enabled!');
      userAddress = provider.selectedAddress;
      console.log('User address:', userAddress);
    });

  // Access the decentralized web!
}

  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.state.currentAccount) {
      this.setState({
      currentAccount: accounts[0],
      });
      // Do any other work!
    }
  }


 getAddress(){
  return this.state.address;
  }


  connect = () => {
    window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(this.handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    console.log('connecting');
  }

  componentDidMount() {
    this.getProvider();
  }
  render(){
    window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    window.ethereum
    .request({ method: 'eth_accounts' })
    .then(this.handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });
    var connectButton = this.state.connected?"": <Button variant="contained" onClick={this.connect}>Connect</Button>
    return (
      <div className="DAppConnection">
        <h2>Meta Mask</h2>
        <img src={metaMask} className="metaMask-logo" alt="logo" />
        <p>{this.state.connected ? 'Connected' : 'Not Connected'}</p>
        <p>{this.state.address.slice(0,12) + '...'}</p>
        <p>{this.state.type}</p>
        {connectButton}
      </div>
    )
  }


}

export default DAppConnection;