import React from 'react';

interface Props {
  amount: number;
  onAmountChange: (amt: number) => void;
  selectedMethod: string;
}

export const calculateFees = (amount: number, method: string): number => {
  if (method === 'paystack') {
    return Math.round((amount * 0.015) + 100); // 1.5% + ₦100
  }
  return 0;
};

export const AmountInput: React.FC<Props> = ({ amount, onAmountChange, selectedMethod }) => {
  const fees = calculateFees(amount, selectedMethod);
  const total = amount + fees;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount to Add
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="Enter amount"
          min="100"
          max="50000"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[500, 1000, 2000, 5000].map(quickAmount => (
          <button
            key={quickAmount}
            onClick={() => onAmountChange(quickAmount)}
            className="p-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            type="button"
          >
            ₦{quickAmount.toLocaleString()}
          </button>
        ))}
      </div>
      {amount > 0 && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Amount:</span>
            <span>₦{amount.toLocaleString()}</span>
          </div>
          {fees > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Transaction Fee:</span>
              <span>₦{fees.toLocaleString()}</span>
            </div>
          )}
          <hr className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
