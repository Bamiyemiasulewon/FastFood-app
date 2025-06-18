import React from 'react';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  fees: number;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'paystack',
    name: 'Card Payment',
    icon: '💳',
    description: 'Pay with debit/credit card via Paystack',
    fees: 1.5 // 1.5% + ₦100
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Transfer to our bank account',
    fees: 0
  }
];

interface Props {
  onSelect: (id: string) => void;
  selectedMethod: string;
}

export const PaymentMethodSelector: React.FC<Props> = ({ onSelect, selectedMethod }) => (
  <div className="space-y-3">
    {paymentMethods.map(method => (
      <div 
        key={method.id}
        className={`p-4 border rounded-lg cursor-pointer ${
          selectedMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
        }`}
        onClick={() => onSelect(method.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{method.icon}</span>
            <div>
              <h3 className="font-medium">{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {method.fees > 0 ? `${method.fees}% + ₦100 fee` : 'No fees'}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);
