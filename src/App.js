import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ExpenseTrackerABI from "./ExpenseTrackerABI.json";
import "./App.css";

// Replace this with your actual deployed contract address
const contractAddress = "0xe1ED2dcd37fBd9b35FBBdA69e3C03f4FBD785D11";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [totalRegistered, setTotalRegistered] = useState(null);

  // Load MetaMask connection and contract
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        const signer = tempProvider.getSigner();
        const tempContract = new ethers.Contract(contractAddress, ExpenseTrackerABI, signer);
        setContract(tempContract);

        const accounts = await tempProvider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  // Fetch total registered users
  const fetchTotalRegistered = async () => {
    if (!contract) return;

    try {
      const total = await contract.getTotalRegistered();
      setTotalRegistered(total.toString());
    } catch (error) {
      console.error("Failed to fetch total registered users:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchTotalRegistered();
    }
  }, [contract]);

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker DApp</h1>
      </header>

      {account ? (
        <>
          <p><strong>Connected Wallet:</strong> {account}</p>
          <p><strong>Total Registered Users:</strong> {totalRegistered !== null ? totalRegistered : "Loading..."}</p>
        </>
      ) : (
        <button onClick={loadBlockchainData}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
