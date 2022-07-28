import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import logo from './assets/kbean-logo.png';
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
  // const [name, setName] = useState("");
  // const [signer, setSigner] = useState("");

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
    if (!window.ethereum) { //this conditional is not working actually check if the user is logged into metamask
      alert('Log into your Metamask first!');
    } else {
        const walletResponse = await connectWallet();
        // add a code that alerts user if they reject to connect
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
      }
  };

  //Displays users' ETH amount on screen
  //(Doesn't account for other coins other than ETH)
  const readWalletInfo = async() => {
    if (!(walletAddress.length > 0)) { //switch the if to actually check if metmamask is connected
      alert('Connect to your Metamask Wallet first!');
    } else {
      const walletBalance = await web3.eth.getBalance(walletAddress);
      setBalance(web3.utils.fromWei(walletBalance, "ether") + " ETH");
    }
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
