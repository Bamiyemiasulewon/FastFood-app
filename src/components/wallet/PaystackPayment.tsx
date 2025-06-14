
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock } from 'lucide-react';
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
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCardData = () => {
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 16) return 'Please enter a valid card number';
    if (cardData.expiryDate.length < 5) return 'Please enter a valid expiry date';
    if (cardData.cvv.length < 3) return 'Please enter a valid CVV';
    if (!cardData.cardholderName.trim()) return 'Please enter cardholder name';
    return null;
  };

  const handlePayment = async () => {
    const validationError = validateCardData();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setProcessing(true);
    
    console.log('Processing Paystack payment:', { 
      amount, 
      email, 
      reference,
      cardData: {
        ...cardData,
        cvv: '***' // Don't log CVV
      }
    });
    
    toast.info('Processing your payment...');
    
    // Simulate payment processing with card validation
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        toast.success('Payment completed successfully!');
        onSuccess(reference);
      } else {
        const error = new Error('Payment failed. Please check your card details and try again.');
        toast.error('Payment failed. Please check your card details and try again.');
        onError(error);
      }
      setProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Card Details</h3>
        <Lock className="w-4 h-4 text-green-600 ml-auto" />
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            maxLength={19}
            className="text-lg font-mono"
          />
        </div>

        <div>
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <Input
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            value={cardData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className="uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={cardData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              maxLength={5}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              value={cardData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              maxLength={4}
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="font-semibold">₦{amount.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        onClick={handlePayment}
        disabled={disabled || processing}
        className="w-full flex items-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        {processing ? 'Processing Payment...' : `Pay ₦${amount.toLocaleString()}`}
      </Button>

      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        <span>Secured by Paystack</span>
      </div>
    </div>
  );
};
