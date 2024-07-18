import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  // State variables
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  // Contract address and ABI
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  // Function to retrieve the Metamask wallet object
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  // Function to handle the connected Ethereum account
  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  // Function to connect the user's MetaMask wallet
  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);

      // Once wallet is set we can get a reference to our deployed contract
      getATMContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  // Function to get the ATM contract instance
  const getATMContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
      setATM(atmContract);
    }
  };

  // Function to get the user's balance from the ATM contract
 // Function to get the user's balance from the ATM contract
const getBalance = async () => {
  if (atm) {
    try {
      const balance = await atm.getBalance();
      const formattedBalance = ethers.utils.formatEther(balance);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
};


  // Function to deposit ETH into the ATM contract
  const deposit = async () => {
    if (atm) {
      try {
        const tx = await atm.deposit(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing ETH:", error);
      }
    }
  };

  // Function to withdraw ETH from the ATM contract
  const withdraw = async () => {
    if (atm) {
      try {
        const tx = await atm.withdraw(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing ETH:", error);
      }
    }
  };

  // Function to transfer ETH to another account
  const transfer = async () => {
    if (atm) {
      try {
        const recipient = prompt("Enter recipient address:");
        const amount = prompt("Enter amount to transfer in ETH:");

        if (recipient && amount) {
          const tx = await atm.transfer(recipient, ethers.utils.parseEther(amount));
          await tx.wait();
          getBalance();
        } else {
          console.log("Transfer cancelled: Invalid recipient or amount");
        }
      } catch (error) {
        console.error("Error transferring ETH:", error);
      }
    }
  };

  // Function to initialize user connection and balance
  const initUser = () => {
    // Check if MetaMask is installed
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    // Check if user is connected
    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask wallet</button>;
    }

    // Check if balance is loaded, if not, load it
    if (balance === undefined) {
      getBalance();
    }

    // Render user interface with account details and actions
    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={transfer}>Transfer</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters Crypto Portal!</h1>
        <p><b>Here, Ritik Kumar</b></p>
      </header>
      {initUser()}
      <section className="info">
        <h2>About This Portal</h2>
        <p>This decentralized portal allows you to deposit, withdraw, and transfer ETH using your MetaMask wallet.</p>
        <p>Connect your MetaMask wallet to get started and manage your funds securely on the Ethereum blockchain.</p>
      </section>
      <section className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Install MetaMask from <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">here</a>.</li>
          <li>Connect your MetaMask wallet by clicking the button above.</li>
          <li>Use the deposit button to add 1 ETH to your balance.</li>
          <li>Use the withdraw button to remove 1 ETH from your balance.</li>
          <li>Transfer ETH to another account by clicking on the transfer button.</li>
        </ol>
      </section>
      <style jsx>{`
        .container {
          font-family: 'Roboto', sans-serif;
          text-align: center;
          padding: 20px;
          background-color: #e0f7fa;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin: 0 auto;
        }
        header {
          margin-bottom: 20px;
        }
        h1 {
          color: #00796b;
        }
        .info, .instructions {
          margin: 20px 0;
          text-align: left;
        }
        .info h2, .instructions h2 {
          color: #004d40;
        }
        .instructions ol {
          list-style: none;
          padding: 0;
        }
        .instructions ol li {
          margin: 10px 0;
          padding: 10px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        button {
          margin: 10px;
          padding: 10px 20px;
          background-color: #004d40;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #00251a;
        }
      `}</style>
    </main>
  );
}
