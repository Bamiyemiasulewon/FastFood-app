import React, { useState } from 'react';

export interface BankTransferDetails {
  amount: number;
  senderName: string;
  senderAccount: string;
  senderBank: string;
  transferReference: string;
  transferDate: string;
}

interface Props {
  amount: number;
  onConfirm: (details: BankTransferDetails) => void;
}

const validateTransferDetails = (details: Partial<BankTransferDetails>) => {
  return details.senderName && details.senderBank && details.transferReference;
};

export const BankTransferPayment: React.FC<Props> = ({ amount, onConfirm }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transferDetails, setTransferDetails] = useState<Partial<BankTransferDetails>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const bankDetails = {
    bankName: 'Access Bank',
    accountNumber: '1234567890',
    accountName: 'YourApp Limited',
    sortCode: '044'
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmTransfer = () => {
    if (validateTransferDetails(transferDetails)) {
      onConfirm({
        ...transferDetails,
        amount,
        senderAccount: '',
        transferDate: new Date().toISOString(),
      } as BankTransferDetails);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-3">Transfer Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Bank Name:</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{bankDetails.bankName}</span>
              <button
                onClick={() => copyToClipboard(bankDetails.bankName, 'bank')}
                className="text-blue-600 hover:text-blue-800"
                type="button"
              >
                {copied === 'bank' ? '✓' : '📋'}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Account Number:</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium font-mono">{bankDetails.accountNumber}</span>
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                className="text-blue-600 hover:text-blue-800"
                type="button"
              >
                {copied === 'account' ? '✓' : '📋'}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Account Name:</span>
            <span className="font-medium">{bankDetails.accountName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Amount to Transfer:</span>
            <span className="font-bold text-lg text-green-600">₦{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Important Instructions:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Transfer exactly ₦{amount.toLocaleString()}</li>
          <li>• Use a unique reference/narration</li>
          <li>• Keep your transfer receipt</li>
          <li>• Confirmation may take 5-15 minutes</li>
        </ul>
      </div>
      <button
        onClick={() => setShowConfirmation(true)}
        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600"
        type="button"
      >
        I Have Made the Transfer
      </button>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Your Transfer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name (as on bank account)
                </label>
                <input
                  type="text"
                  value={transferDetails.senderName || ''}
                  onChange={(e) => setTransferDetails({...transferDetails, senderName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Bank
                </label>
                <input
                  type="text"
                  value={transferDetails.senderBank || ''}
                  onChange={(e) => setTransferDetails({...transferDetails, senderBank: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Bank name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer Reference/Narration
                </label>
                <input
                  type="text"
                  value={transferDetails.transferReference || ''}
                  onChange={(e) => setTransferDetails({...transferDetails, transferReference: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Reference used in transfer"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg"
                type="button"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
