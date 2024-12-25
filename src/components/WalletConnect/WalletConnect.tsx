// @ts-nocheck


import React, { useState, useEffect } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const WalletConnectComponent: React.FC = () => {
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
      },
    });

    await walletConnectProvider.enable();

    const web3Instance = new Web3(walletConnectProvider);
    setWeb3(web3Instance);

    const accounts = await web3Instance.eth.getAccounts();
    setAccount(accounts[0]);

    const userBalance = await web3Instance.eth.getBalance(accounts[0]);
    setBalance(web3Instance.utils.fromWei(userBalance, "ether"));
  };

  const disconnectWallet = async () => {
    if (provider) {
      await provider.disconnect();
      setProvider(null);
      setWeb3(null);
      setAccount(null);
      setBalance(null);
    }
  };

  return (
    <div className="p-4">
      <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
        Connect Trust Wallet
      </button>

      {account && (
        <div className="mt-4">
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={disconnectWallet} className="mt-4 bg-red-500 text-white p-2 rounded">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnectComponent;
