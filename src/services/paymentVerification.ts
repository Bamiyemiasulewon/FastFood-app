export interface PaymentVerificationResult {
  success: boolean;
  amount: number;
  reference: string;
  gatewayResponse?: any;
  error?: string;
}

export const verifyPaystackPayment = async (reference: string): Promise<PaymentVerificationResult> => {
  try {
    // Frontend simulation - In production, this would call your backend API
    console.log('Verifying Paystack payment:', reference);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, simulate successful verification
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      // Extract amount from reference (demo logic)
      const amount = Math.floor(Math.random() * 10000) + 500;
      
      return {
        success: true,
        amount: amount,
        reference: reference,
        gatewayResponse: {
          status: 'success',
          gateway_response: 'Successful',
          amount: amount * 100 // Paystack returns in kobo
        }
      };
    } else {
      return {
        success: false,
        amount: 0,
        reference,
        error: 'Payment verification failed'
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

// Bank transfer verification (manual approval workflow)
export const initiateBankTransferVerification = async (
  amount: number, 
  reference: string, 
  userId: string
): Promise<PaymentVerificationResult> => {
  try {
    // Create a pending transaction record
    // Logic for creating a transaction record would go here
    // This is a placeholder to indicate where backend interaction occurs

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
}

// API base URL for Rust backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Example: Fetch all tasks from Rust backend
export async function fetchTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

// Example: Create a new task
export async function createTask(task: { title: string }) {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

// Example: Update a task
export async function updateTask(id: string, updates: { title?: string; completed?: boolean }) {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

// Example: Delete a task
export async function deleteTask(id: string) {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
}
