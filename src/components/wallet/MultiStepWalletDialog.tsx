import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy
} from 'lucide-react';
import { PinVerificationDialog } from './PinVerificationDialog';
import { PaystackPayment } from './PaystackPayment';
import { FlutterwavePayment } from './FlutterwavePayment';
import { verifyPaystackPayment, verifyFlutterwavePayment, initiateBankTransferVerification } from '@/services/paymentVerification';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MultiStepWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMoney: (amount: number, method: string, reference: string) => Promise<void>;
  loading: boolean;
}

type PaymentMethod = 'bank_transfer' | 'paystack' | 'flutterwave';

interface TransactionStep {
  id: number;
  title: string;
  description: string;
}

const steps: TransactionStep[] = [
  { id: 1, title: 'Amount', description: 'Select amount to add' },
  { id: 2, title: 'Payment Method', description: 'Choose payment option' },
  { id: 3, title: 'Review', description: 'Confirm transaction details' },
  { id: 4, title: 'Payment', description: 'Complete payment' },
];

const TRANSACTION_LIMITS = {
  MIN_AMOUNT: 100,
  MAX_AMOUNT: 50000,
  DAILY_LIMIT: 100000,
  PIN_REQUIRED_THRESHOLD: 2000,
};

export const MultiStepWalletDialog = ({ 
  open, 
  onOpenChange, 
  onAddMoney, 
  loading 
}: MultiStepWalletDialogProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bank_transfer');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [paymentReference, setPaymentReference] = useState<string>('');

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];
  const amountNum = parseFloat(amount) || 0;

  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountNumber: "1234567890",
    accountName: "Pallette n' Drapes Ltd",
    reference: `WALLET_${Date.now()}`
  };

  const validateAmount = () => {
    if (amountNum < TRANSACTION_LIMITS.MIN_AMOUNT) {
      return `Minimum amount is ₦${TRANSACTION_LIMITS.MIN_AMOUNT.toLocaleString()}`;
    }
    if (amountNum > TRANSACTION_LIMITS.MAX_AMOUNT) {
      return `Maximum amount is ₦${TRANSACTION_LIMITS.MAX_AMOUNT.toLocaleString()}`;
    }
    return null;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const error = validateAmount();
      if (error) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    if (amountNum >= TRANSACTION_LIMITS.PIN_REQUIRED_THRESHOLD) {
      setShowPinDialog(true);
    } else {
      await processPayment();
    }
  };

  const handlePinVerify = async (pin: string): Promise<boolean> => {
    // Simulate PIN verification (in production, verify against backend)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (pin === '1234') { // Demo PIN
      setShowPinDialog(false);
      await processPayment();
      return true;
    }
    return false;
  };

  const processPayment = async () => {
    const reference = `WALLET_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setPaymentReference(reference);
    setCurrentStep(4);
  };

  const handlePaymentSuccess = async (paymentReference: string) => {
    try {
      setProcessingStage('Verifying payment...');
      
      let verificationResult;
      
      if (selectedMethod === 'paystack') {
        verificationResult = await verifyPaystackPayment(paymentReference);
      } else if (selectedMethod === 'flutterwave') {
        verificationResult = await verifyFlutterwavePayment(paymentReference);
      } else {
        // Bank transfer
        verificationResult = await initiateBankTransferVerification(
          amountNum, 
          paymentReference, 
          user?.id || ''
        );
      }

      if (verificationResult.success) {
        setProcessingStage('Updating wallet...');
        await onAddMoney(verificationResult.amount, selectedMethod, verificationResult.reference);
        
        setProcessingStage('Complete!');
        toast.success(
          selectedMethod === 'bank_transfer' 
            ? `Bank transfer initiated! Amount will be credited after verification.`
            : `₦${verificationResult.amount.toLocaleString()} added to your wallet successfully!`,
          {
            description: `Transaction reference: ${verificationResult.reference}`,
            duration: 5000,
          }
        );
        
        setTimeout(() => {
          onOpenChange(false);
          resetDialog();
        }, 2000);
      } else {
        throw new Error(verificationResult.error || 'Payment verification failed');
      }
    } catch (error) {
      setProcessingStage('');
      toast.error(error instanceof Error ? error.message : 'Payment verification failed');
    }
  };

  const handlePaymentError = (error: any) => {
    setProcessingStage('');
    toast.error(`Payment failed: ${error.message || 'Unknown error'}`);
  };

  const handlePaymentClose = () => {
    setProcessingStage('');
    toast.info('Payment was cancelled. No charges were made.');
  };

  const resetDialog = () => {
    setCurrentStep(1);
    setAmount('');
    setSelectedMethod('bank_transfer');
    setProcessingStage('');
    setPaymentReference('');
  };

  const handleClose = () => {
    if (!loading && !processingStage) {
      onOpenChange(false);
      resetDialog();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'bank_transfer': return <Building2 className="w-5 h-5" />;
      case 'paystack': return <CreditCard className="w-5 h-5" />;
      case 'flutterwave': return <Smartphone className="w-5 h-5" />;
    }
  };

  const renderStepContent = () => {
    if (loading || processingStage) {
      return (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <p className="font-medium">{processingStage}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait while we process your transaction...
            </p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg mt-1"
              />
              {validateAmount() && (
                <p className="text-sm text-red-600 mt-1">{validateAmount()}</p>
              )}
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Quick Amounts</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="text-sm"
                  >
                    ₦{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p>Transaction Limits:</p>
                  <p>• Min: ₦{TRANSACTION_LIMITS.MIN_AMOUNT.toLocaleString()}</p>
                  <p>• Max: ₦{TRANSACTION_LIMITS.MAX_AMOUNT.toLocaleString()}</p>
                  <p>• PIN required for amounts above ₦{TRANSACTION_LIMITS.PIN_REQUIRED_THRESHOLD.toLocaleString()}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <Label>Select Payment Method</Label>
            {[
              { id: 'bank_transfer', name: 'Bank Transfer', desc: 'Direct bank transfer (Manual verification)' },
              { id: 'paystack', name: 'Paystack', desc: 'Pay with card or bank transfer' },
              { id: 'flutterwave', name: 'Flutterwave', desc: 'Mobile money and card payments' }
            ].map((method) => (
              <div 
                key={method.id}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod(method.id as PaymentMethod)}
              >
                {getPaymentMethodIcon(method.id as PaymentMethod)}
                <div className="flex-1">
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Transaction Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">₦{amountNum.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="capitalize">{selectedMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span>₦0</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>₦{amountNum.toLocaleString()}</span>
              </div>
            </div>

            {amountNum >= TRANSACTION_LIMITS.PIN_REQUIRED_THRESHOLD && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  This transaction requires PIN verification for security.
                </AlertDescription>
              </Alert>
            )}

            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                {selectedMethod === 'bank_transfer' 
                  ? 'Bank transfers require manual verification and may take 2-24 hours to process.'
                  : 'Your wallet will be credited immediately after successful payment verification.'
                }
              </AlertDescription>
            </Alert>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Complete Payment</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold">Amount: ₦{amountNum.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Reference: {paymentReference}</p>
            </div>

            {selectedMethod === 'bank_transfer' && (
              <div className="space-y-3">
                <Alert>
                  <Building2 className="h-4 w-4" />
                  <AlertDescription>
                    Transfer ₦{amountNum.toLocaleString()} to the account below and your wallet will be credited after verification.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-white border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bank Name:</span>
                    <span className="font-medium">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bankDetails.accountNumber}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.accountNumber)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Name:</span>
                    <span className="font-medium">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reference:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs">{paymentReference}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(paymentReference)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handlePaymentSuccess(paymentReference)}
                  className="w-full"
                >
                  I have made the transfer
                </Button>
              </div>
            )}

            {selectedMethod === 'paystack' && user && (
              <PaystackPayment
                amount={amountNum}
                email={user.email || ''}
                reference={paymentReference}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                onError={handlePaymentError}
              />
            )}

            {selectedMethod === 'flutterwave' && user && (
              <FlutterwavePayment
                amount={amountNum}
                email={user.email || ''}
                phone="080000000000" // In production, get from user profile
                name={`${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || 'User'}
                reference={paymentReference}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                onError={handlePaymentError}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{steps[currentStep - 1]?.title}</span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>

            {/* Step Content */}
            <div className="min-h-[300px]">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            {!loading && !processingStage && currentStep < 4 && (
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={currentStep === 1 && (!!validateAmount() || !amountNum)}
                    className="flex-1"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFinalSubmit}
                    className="flex-1 btn-premium"
                  >
                    {amountNum >= TRANSACTION_LIMITS.PIN_REQUIRED_THRESHOLD ? 'Verify & Proceed' : 'Proceed to Payment'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <PinVerificationDialog
        open={showPinDialog}
        onOpenChange={setShowPinDialog}
        amount={amountNum}
        onVerify={handlePinVerify}
        loading={loading}
      />
    </>
  );
};
