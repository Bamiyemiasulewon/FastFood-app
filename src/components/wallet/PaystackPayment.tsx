
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface PaystackPaymentProps {
  amount: number;
  email: string;
  reference: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

export const PaystackPayment = ({
  amount,
  email,
  reference,
  onSuccess,
  onClose,
  onError,
  disabled = false
}: PaystackPaymentProps) => {
  const handlePayment = () => {
    // Frontend simulation - will be replaced with real Paystack when you implement backend
    console.log('Initiating Paystack payment:', { amount, email, reference });
    
    toast.info('Opening Paystack payment gateway...');
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        toast.success('Payment completed successfully!');
        onSuccess(reference);
      } else {
        const error = new Error('Payment failed. Please try again.');
        toast.error('Payment failed. Please try again.');
        onError(error);
      }
    }, 2000);
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={disabled}
      className="w-full flex items-center gap-2"
    >
      <CreditCard className="w-4 h-4" />
      Pay with Paystack
    </Button>
  );
};
