
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface PinVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onVerify: (pin: string) => Promise<boolean>;
  loading?: boolean;
}

export const PinVerificationDialog = ({ 
  open, 
  onOpenChange, 
  amount, 
  onVerify, 
  loading = false 
}: PinVerificationDialogProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleVerify = async () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    try {
      const isValid = await onVerify(pin);
      if (!isValid) {
        setAttempts(prev => prev + 1);
        setError(`Invalid PIN. ${2 - attempts} attempts remaining.`);
        setPin('');
        
        if (attempts >= 2) {
          setError('Too many failed attempts. Please try again later.');
          setTimeout(() => onOpenChange(false), 2000);
        }
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    setAttempts(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Transaction PIN Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              For security, amounts above ₦2,000 require PIN verification.
            </AlertDescription>
          </Alert>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Amount to add:</p>
            <p className="text-2xl font-bold text-primary">₦{amount.toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <label className="block text-sm font-medium mb-2">Enter 4-digit PIN</label>
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                disabled={loading || attempts >= 3}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerify}
              disabled={pin.length !== 4 || loading || attempts >= 3}
              className="flex-1"
            >
              {loading ? 'Verifying...' : 'Verify PIN'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
