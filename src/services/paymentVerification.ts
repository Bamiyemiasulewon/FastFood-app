import { supabase } from '@/integrations/supabase/client';

export interface PaymentVerificationResult {
  success: boolean;
  amount: number;
  reference: string;
  gatewayResponse?: any;
  error?: string;
}

export const verifyPaystackPayment = async (reference: string): Promise<PaymentVerificationResult> => {
  try {
    // In production, this should be done via a Supabase Edge Function
    // to keep your secret key secure
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.status && data.data.status === 'success') {
      return {
        success: true,
        amount: data.data.amount / 100, // Convert from kobo to naira
        reference: data.data.reference,
        gatewayResponse: data.data
      };
    } else {
      return {
        success: false,
        amount: 0,
        reference,
        error: data.message || 'Payment verification failed'
      };
    }
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    return {
      success: false,
      amount: 0,
      reference,
      error: error instanceof Error ? error.message : 'Network error during verification'
    };
  }
};

export const verifyFlutterwavePayment = async (transactionId: string): Promise<PaymentVerificationResult> => {
  try {
    // In production, this should be done via a Supabase Edge Function
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.status === 'success' && data.data.status === 'successful') {
      return {
        success: true,
        amount: data.data.amount,
        reference: data.data.tx_ref,
        gatewayResponse: data.data
      };
    } else {
      return {
        success: false,
        amount: 0,
        reference: transactionId,
        error: data.message || 'Payment verification failed'
      };
    }
  } catch (error) {
    console.error('Error verifying Flutterwave payment:', error);
    return {
      success: false,
      amount: 0,
      reference: transactionId,
      error: error instanceof Error ? error.message : 'Network error during verification'
    };
  }
};

// Bank transfer verification (manual approval workflow)
export const initiateBankTransferVerification = async (
  amount: number, 
  reference: string, 
  userId: string
): Promise<PaymentVerificationResult> => {
  try {
    // Create a pending transaction record
    const { error } = await supabase
      .from('wallet_transactions')
      .insert({
        user_id: userId,
        type: 'credit',
        amount: amount,
        description: 'Bank transfer - Pending verification',
        reference: reference,
        status: 'pending'
      });

    if (error) throw error;

    return {
      success: true,
      amount: amount,
      reference: reference
    };
  } catch (error) {
    console.error('Error initiating bank transfer verification:', error);
    return {
      success: false,
      amount: 0,
      reference,
      error: error instanceof Error ? error.message : 'Failed to initiate bank transfer'
    };
  }
};
