import React, { useState } from 'react';
import PaymentForm from '../../Blockchain/PaymentForm';
import TransactionStatus from '../../Blockchain/TransactionStatus';

const Blockchain: React.FC = () => {
  const [transactionHash, setTransactionHash] = useState<string>('');

  const handlePaymentSubmit = async (amount: number, paymentMethod: string) => {
    // Simulate calling the backend API to initiate payment
    const response = await fetch('https://testdata-bh0z.onrender.com/api/initiate-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, paymentMethod }),
    });

    const data = await response.json();

    if (data.transactionHash) {
      setTransactionHash(data.transactionHash);
    } else {
      alert('Payment failed');
    }
  };

  return (
    <div className="bg-gray-50 mt-10 flex flex-col items-center justify-center">
      <PaymentForm onSubmit={handlePaymentSubmit} />
      {transactionHash && <TransactionStatus transactionHash={transactionHash} />}
    </div>
  );
};

export default Blockchain;
