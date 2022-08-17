import React from 'react';
//bootstraps
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//css styling
import './App.css';
//kbean logo
import logo from './assets/kbean-logo.png';
//useEffect and useState methods from react
import { useEffect, useState } from "react";
import web3 from "./web3";
import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";


function App() {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [userBalance, setBalance] = useState("");
  const [connectMessage, setMessage] = 
    useState("If there is no Metamask pop-up for 15 seconds after clicking the button, click the metamask extension and make sure you're signed in!");
  // const [name, setName] = useState(""); <-for future uses (maybe)
  // const [signer, setSigner] = useState(""); <-for future uses (maybe)

  //Keeps the Connect button say "Connected!" if the user reloads
  //the page after connecting their wallet.
  useEffect(() => {
    async function updateWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
    }
    updateWallet()
  }, []);

  //Prompts the users to connect Metamask to the website
  const connectWalletPressed = async () => {
    if (!window.ethereum) {
      alert('Install Metamask extension first!');
    } else {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
      }
  };

  //Displays users' ETH amount on screen
  //(Doesn't account for other coins other than ETH)
  const readWalletInfo = async() => {
    if (!(walletAddress.length > 0)) {
      alert('Connect to your Metamask Wallet first!');
    } else {
      const walletBalance = await web3.eth.getBalance(walletAddress);
      setBalance(web3.utils.fromWei(walletBalance, "ether") + " ETH");
    }
  };

  //Connects to deeplink Metamask mobile app
  function mobilePressed() {
    //const url = "https://metamask.app.link/dapp/reuely.github.io/web3-react-metamask/";
    const url = "dapp://reuely.github.io/web3-react-metamask/";
    window.location.replace(url);
  };


  return (
    <div className="App">
      <div className='head-section'>
        <h2>Web3 Project!</h2>
      </div>
      <header className="App-header">
        <div className='row'>
          <div className='col-lg-6'>
            <button type='button' className='btn btn-lg btn-outline-light' onClick={connectWalletPressed}>
              {walletAddress.length > 0 ? (
                "Connected to Metamask!"
                ) : (
                <span>Connect Wallet</span>
              )}
            </button>
            <p className="wallet-message">
              {walletAddress.length > 0 ? (
                ""
                ) : (
                <span>{connectMessage}</span>
              )}
            </p>
          </div>
          <div className='col-lg-6'>
            <button type='button' className='btn btn-lg btn-outline-light' onClick={readWalletInfo}>
              Read
            </button>
            <p>{userBalance}</p>
          </div>
          <div className='col-lg-6'>
            <button type='button' className='btn btn-lg btn-outline-light' onClick={mobilePressed}>
              Connect with mobile Metamask app
            </button>
          </div>
        </div>
      <p>
      </p>
      </header>
      <div className='logo-section'>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

//index.js imports App
export default App;
