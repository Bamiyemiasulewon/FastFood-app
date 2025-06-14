
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

interface FlutterwavePaymentProps {
  amount: number;
  email: string;
  phone: string;
  name: string;
  reference: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

export const FlutterwavePayment = ({
  amount,
  email,
  phone,
  name,
  reference,
  onSuccess,
  onClose,
  onError,
  disabled = false
}: FlutterwavePaymentProps) => {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-your_key_here',
    tx_ref: reference,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: 'Wallet Top-up',
      description: 'Add money to your wallet',
      logo: '/favicon.ico',
    },
    meta: {
      payment_type: 'wallet_topup'
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log('Flutterwave payment response:', response);
        if (response.status === 'successful') {
          onSuccess(response.tx_ref);
        } else {
          onError(new Error(`Payment ${response.status}`));
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log('Flutterwave payment modal closed');
        onClose();
      },
    });
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={disabled}
      className="w-full flex items-center gap-2"
    >
      <Smartphone className="w-4 h-4" />
      Pay with Flutterwave
    </Button>
  );
};
