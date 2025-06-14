
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

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
  const config = {
    reference,
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_key_here',
    currency: 'NGN',
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    metadata: {
      custom_fields: [
        {
          display_name: "Payment Type",
          variable_name: "payment_type",
          value: "wallet_topup"
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    initializePayment({
      onSuccess: (response) => {
        console.log('Paystack payment successful:', response);
        onSuccess(response.reference);
      },
      onClose: () => {
        console.log('Paystack payment closed');
        onClose();
      },
      onError: (error) => {
        console.error('Paystack payment error:', error);
        onError(error);
      }
    });
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
