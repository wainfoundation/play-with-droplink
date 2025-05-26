
/**
 * Pi Network Payments Module
 */
import PiLogger from './pi-logger';
import { PiPaymentData, PaymentCallbacks, PiPayment } from './pi-types';
import { initPiNetwork } from './pi-utils';

// Create payment using Pi SDK according to official documentation
export const createPiPayment = async (
  paymentData: PiPaymentData,
  callbacks: PaymentCallbacks
): Promise<void> => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not initialized or not available");
    }

    // Ensure SDK is initialized
    initPiNetwork();

    // Create the payment object with required identifier as per docs
    const piPayment: PiPayment = {
      ...paymentData,
      identifier: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    PiLogger.payment('create_start', piPayment);

    // Wrap callbacks with logging following official callback structure
    const wrappedCallbacks: PaymentCallbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        PiLogger.payment('server_approval_ready', { paymentId });
        callbacks.onReadyForServerApproval(paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        PiLogger.payment('server_completion_ready', { paymentId, txid });
        callbacks.onReadyForServerCompletion(paymentId, txid);
      },
      onCancel: (paymentId: string) => {
        PiLogger.payment('cancelled', { paymentId });
        callbacks.onCancel(paymentId);
      },
      onError: (error: Error, payment?: any) => {
        PiLogger.error('payment_error', error, { 
          paymentId: payment?.identifier,
          amount: piPayment.amount 
        });
        callbacks.onError(error, payment);
      },
    };

    await window.Pi.createPayment(piPayment, wrappedCallbacks);
    PiLogger.payment('create_success', piPayment);
  } catch (error) {
    PiLogger.error('payment_create_error', error, { 
      amount: paymentData.amount,
      memo: paymentData.memo 
    });
    throw error;
  }
};
