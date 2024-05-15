import { useState, useEffect } from 'react';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import UserPage from './Components/UserPage';
import InsPage from './Components/InsPage';
import './App.css';

const { ethers } = require("ethers");

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isInstitution, setIsInstitution] = useState(false);
  const [credentials, setCredentials] = useState([]);


  useEffect( () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  async function addCredential(userWalletAddress, credentialName, credentialYear, credentialType) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const tx = await contractInstance.addCredential(userWalletAddress, credentialName, credentialYear, credentialType);
    await tx.wait();
  }

  async function getCredentials(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const education = await contractInstance.getCredentials(await signer.getAddress(), "Education");
    const professional = await contractInstance.getCredentials(await signer.getAddress(), "Professional");
    const certfication = await contractInstance.getCredentials(await signer.getAddress(), "Certification");
    const credentialsList = [education, professional, certfication];
    setCredentials(credentialsList);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setIsUser(false);
      setIsInstitution(false);
      setAccount(null);
    }
  }

  async function connectToMetamaskUser() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        setIsUser(true);
        getCredentials();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function connectToMetamaskInstitution() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        setIsInstitution(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  return (
    <div className="App">
      {isConnected ? (isUser ? (<UserPage 
                                 account = {account}
                                 credentials = {credentials}
                                 />) 
                    : (<InsPage
                        account = {account}
                        addCredential = {addCredential}
                       />)) 
                    : (<Login connectUserWallet = {connectToMetamaskUser}
                        connectInstitutionWallet = {connectToMetamaskInstitution}/>)}
      
    </div>
  );

}


export default App;
