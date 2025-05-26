
import crypto from 'crypto';

export class PiAuth {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.minepi.com';
  }

  /**
   * Verify Pi payment signature
   */
  verifyPayment(paymentData, signature) {
    try {
      const expectedSignature = this.generateSignature(paymentData);
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  /**
   * Generate expected signature for payment data
   */
  generateSignature(paymentData) {
    const payload = JSON.stringify(paymentData);
    return crypto
      .createHmac('sha256', this.apiKey)
      .update(payload)
      .digest('hex');
  }

  /**
   * Validate Pi user authentication
   */
  async validateUser(accessToken, uid) {
    try {
      const response = await fetch(`${this.baseURL}/v2/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const userData = await response.json();
      return userData.uid === uid;
    } catch (error) {
      console.error('User validation failed:', error);
      return false;
    }
  }

  /**
   * Complete payment verification
   */
  async completePayment(paymentId, transactionId) {
    try {
      const response = await fetch(`${this.baseURL}/v2/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transactionId
        })
      });

      if (!response.ok) {
        throw new Error(`Payment completion failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment completion failed:', error);
      throw error;
    }
  }

  /**
   * Cancel payment
   */
  async cancelPayment(paymentId) {
    try {
      const response = await fetch(`${this.baseURL}/v2/payments/${paymentId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Payment cancellation failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment cancellation failed:', error);
      throw error;
    }
  }
}

export default PiAuth;
