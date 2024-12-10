import React, { useState } from 'react';

interface PaymentFormProps {
  onSubmit: (amount: number, paymentMethod: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');

  const handleSubmit = () => {
    onSubmit(amount, paymentMethod);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 px-4 rounded-sm"
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentForm;
