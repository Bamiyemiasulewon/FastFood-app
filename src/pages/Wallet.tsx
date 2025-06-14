
import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wallet as WalletIcon, 
  Plus, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  RefreshCw,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Wallet = () => {
  const { profile, walletTransactions, loading, addMoney, refreshTransactions } = useUserProfile();
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bank_transfer');

  // Bank details for transfer
  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountNumber: "1234567890",
    accountName: "Pallette n' Drapes Ltd",
    reference: `WALLET_${Date.now()}`
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
      case 'deposit':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'debit':
      case 'purchase':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
      case 'deposit':
        return 'text-green-600';
      case 'debit':
      case 'purchase':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleAddMoney = async () => {
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      if (selectedMethod === 'bank_transfer') {
        // For bank transfer, just show the bank details
        toast.success('Bank details shown below. Transfer the amount and it will be credited to your wallet within 24 hours.');
      } else if (selectedMethod === 'paystack') {
        // Simulate Paystack integration (would need actual API keys in production)
        try {
          const reference = `paystack_${Date.now()}`;
          await addMoney(amountNum, reference);
          setAddMoneyOpen(false);
          setAmount('');
          toast.success('Payment successful! Money added to wallet.');
        } catch (error) {
          toast.error('Paystack payment failed. Please try bank transfer.');
        }
      } else if (selectedMethod === 'flutterwave') {
        // Simulate Flutterwave integration (would need actual API keys in production)
        try {
          const reference = `flutterwave_${Date.now()}`;
          await addMoney(amountNum, reference);
          setAddMoneyOpen(false);
          setAmount('');
          toast.success('Payment successful! Money added to wallet.');
        } catch (error) {
          toast.error('Flutterwave payment failed. Please try bank transfer.');
        }
      }
    }
  };

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  if (loading) {
    return (
      <div className="min-h-screen bg-texture flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            My <span className="text-gradient-premium">Wallet</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your wallet balance and view transaction history
          </p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="card-premium mb-8 bg-gradient-premium text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <WalletIcon className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Wallet Balance</h2>
                </div>
                <p className="text-4xl font-bold mb-2">
                  ₦{profile?.walletBalance.toLocaleString()}
                </p>
                <p className="opacity-80">
                  Available for spending
                </p>
              </div>
              <div className="text-right">
                <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-white/90 gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Money to Wallet</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Amount Input */}
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₦)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      {/* Quick Amount Buttons */}
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

                      {/* Payment Method */}
                      <div className="space-y-3">
                        <Label>Payment Method</Label>
                        <div className="space-y-2">
                          <div 
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedMethod('bank_transfer')}
                          >
                            <Building2 className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Bank Transfer</p>
                              <p className="text-sm text-muted-foreground">Direct bank transfer (Recommended)</p>
                            </div>
                          </div>
                          <div 
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedMethod === 'paystack' ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedMethod('paystack')}
                          >
                            <CreditCard className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Paystack</p>
                              <p className="text-sm text-muted-foreground">Pay with card or bank transfer</p>
                            </div>
                          </div>
                          <div 
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedMethod === 'flutterwave' ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedMethod('flutterwave')}
                          >
                            <Smartphone className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Flutterwave</p>
                              <p className="text-sm text-muted-foreground">Mobile money and card payments</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer Details */}
                      {selectedMethod === 'bank_transfer' && amount && parseFloat(amount) > 0 && (
                        <Alert>
                          <Building2 className="h-4 w-4" />
                          <AlertDescription>
                            <div className="space-y-2 mt-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Bank:</span>
                                <span>{bankDetails.bankName}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Account:</span>
                                <div className="flex items-center gap-2">
                                  <span>{bankDetails.accountNumber}</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Name:</span>
                                <span>{bankDetails.accountName}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Reference:</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{bankDetails.reference}</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => copyToClipboard(bankDetails.reference)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between font-bold text-primary">
                                <span>Amount:</span>
                                <span>₦{parseFloat(amount).toLocaleString()}</span>
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Add Money Button */}
                      <Button 
                        onClick={handleAddMoney}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full btn-premium"
                        size="lg"
                      >
                        {selectedMethod === 'bank_transfer' ? 'Show Bank Details' : `Pay ₦${amount ? parseFloat(amount).toLocaleString() : '0'}`}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-premium">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                ₦{walletTransactions
                  .filter(tx => tx.type === 'credit' || tx.type === 'deposit')
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString()
                }
              </p>
              <p className="text-sm text-muted-foreground">Total Added</p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">
                ₦{walletTransactions
                  .filter(tx => tx.type === 'debit' || tx.type === 'purchase')
                  .reduce((sum, tx) => sum + tx.amount, 0)
                  .toLocaleString()
                }
              </p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-charcoal">
                {walletTransactions.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-charcoal">Transaction History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={refreshTransactions}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {walletTransactions.length === 0 ? (
              <div className="text-center py-12">
                <WalletIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your wallet transaction history will appear here
                </p>
                <Button className="btn-premium" onClick={() => setAddMoneyOpen(true)}>
                  Add Your First Transaction
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {walletTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(transaction.timestamp)}
                          {transaction.reference && (
                            <>
                              <span>•</span>
                              <span>Ref: {transaction.reference}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'credit' || transaction.type === 'deposit' ? '+' : '-'}
                        ₦{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Balance: ₦{transaction.balanceAfter.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
