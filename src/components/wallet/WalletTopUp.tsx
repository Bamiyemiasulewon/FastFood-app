import React, { useState } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { AmountInput, calculateFees } from './AmountInput';
import { PaystackPayment } from './PaystackPayment';
import { BankTransferPayment, BankTransferDetails } from './BankTransferPayment';
import { verifyPaystackPayment } from '@/services/paymentVerification';
import { toast } from 'sonner';

interface Props {
  userEmail: string;
  currentBalance: number;
  updateWalletBalance: (amount: number) => Promise<void>;
}

export const WalletTopUp: React.FC<Props> = ({ userEmail, currentBalance, updateWalletBalance }) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  const handlePaystackSuccess = async (reference: string) => {
    setIsProcessing(true);
    setProcessingStep('Verifying payment...');
    try {
      const result = await verifyPaystackPayment(reference);
      if (result.success) {
        setProcessingStep('Payment successful! Updating wallet...');
        await updateWalletBalance(result.amount);
        toast.success('Payment successful! Your wallet has been credited.');
      } else {
        toast.error('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      toast.error('Payment verification error. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleBankTransferConfirm = async (details: BankTransferDetails) => {
    setIsProcessing(true);
    setProcessingStep('Submitting transfer details...');
    try {
      // You should call your backend here to submit transfer details
      toast.success('Transfer details submitted! Your wallet will be credited after verification.');
    } catch (error) {
      toast.error('Failed to submit transfer details. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const validateAmount = (): boolean => {
    if (amount < 100) {
      toast.error('Minimum amount is ₦100');
      return false;
    }
    if (amount > 50000) {
      toast.error('Maximum amount is ₦50,000');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold text-center mb-6">Add Money to Wallet</h2>
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-4 rounded-lg mb-6">
        <p className="text-sm opacity-90">Current Balance</p>
        <p className="text-2xl font-bold">₦{currentBalance.toLocaleString()}</p>
      </div>
      <AmountInput 
        amount={amount}
        onAmountChange={setAmount}
        selectedMethod={selectedMethod}
      />
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Select Payment Method</h3>
        <PaymentMethodSelector 
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
        />
      </div>
      <div className="mt-6">
        {isProcessing ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">{processingStep}</p>
          </div>
        ) : (
          <>
            {selectedMethod === 'paystack' && amount > 0 && validateAmount() && (
              <PaystackPayment
                amount={amount + calculateFees(amount, 'paystack')}
                email={userEmail}
                reference={`ref-${Date.now()}`}
                onSuccess={handlePaystackSuccess}
                onClose={() => {}}
                onError={() => {}}
              />
            )}
            {selectedMethod === 'bank_transfer' && amount > 0 && validateAmount() && (
              <BankTransferPayment
                amount={amount}
                onConfirm={handleBankTransferConfirm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
