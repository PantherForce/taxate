import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Metamask: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  // List of token addresses you want to check the balances for
  const tokenAddresses = [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    "0xA0b86991C6218b36c1D19D4A2e9Eb0Ce3606eB48", // USDC
    // Add more token addresses here
  ];

  const tokenNames = [
    { symbol: "USDT", name: "Tether USD" },
    { symbol: "DAI", name: "Dai" },
    { symbol: "USDC", name: "USD Coin" },
    // Add corresponding names for each token
  ];

  const ERC20_ABI = [
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
    },
  ];

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Request accounts from MetaMask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAccount(accounts[0]);
        })
        .catch((err: any) => {
          console.error("User denied account access", err);
        });

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      console.log("MetaMask is not installed!");
    }
  }, []);

  // Fetch balances for each token dynamically
  const getTokenBalances = async () => {
    if (web3 && account) {
      setLoading(true);
      const updatedBalances: { [key: string]: string } = {};

      for (let i = 0; i < tokenAddresses.length; i++) {
        const tokenAddress = tokenAddresses[i];
        const token = new web3.eth.Contract(ERC20_ABI, tokenAddress);

        try {
          const balanceWei = await token.methods.balanceOf(account).call();
          const balance = web3.utils.fromWei(balanceWei, "ether");
          updatedBalances[tokenNames[i].symbol] = balance;
        } catch (error) {
          console.error(`Error fetching balance for token ${tokenNames[i].symbol}:`, error);
          updatedBalances[tokenNames[i].symbol] = "Error";
        }
      }

      setBalances(updatedBalances);
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalances({});
    setWeb3(null);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start p-4 mb-6">
      <h1 className="text-3xl font-bold text-center mb-4">Connect MetaMask</h1>
      {!account ? (
        <button
          onClick={() => window.ethereum.request({ method: "eth_requestAccounts" })}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Connected Account: {account}</p>
          <div className="flex flex-row gap-6 mb-4">
            <button
              onClick={getTokenBalances}
              className="px-6 py-2 bg-primary text-white rounded-lg"
            >
              Get Token Balances
            </button>
            <button
              onClick={disconnectWallet}
              className="px-6 py-2 bg-white text-primary rounded-lg"
            >
              Disconnect
            </button>
          </div>

          {loading ? (
            <p className="text-xl font-semibold">Loading balances...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tokenNames.map((token) => (
                <div
                  key={token.symbol}
                  className="flex w-full flex-col items-center bg-[#F4F1E6] p-4 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{token.name}</h3>
                  <p className="text-lg text-gray-600">{token.symbol}</p>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold">
                      {balances[token.symbol] || "0"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Metamask;
