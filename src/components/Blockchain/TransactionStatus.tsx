import React, { useState, useEffect } from 'react';

interface TransactionStatusProps {
  transactionHash: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ transactionHash }) => {
  const [status, setStatus] = useState<string>('Pending');

  useEffect(() => {
    // Simulate the status change from "Pending" to "Success" after a timeout
    setTimeout(() => setStatus('Success'), 3000); // Assume success after 3 seconds
  }, []);

  return (
    <div className="mt-4 text-center">
      <p className="text-lg font-semibold">Transaction Status: {status}</p>
      <p className="text-sm text-gray-500">Transaction Hash: {transactionHash}</p>
    </div>
  );
};

export default TransactionStatus;
