
declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onSuccess: (authResult: any) => void,
        onError: (error: Error) => void
      ) => void;
      createPayment: (
        paymentData: {
          amount: number;
          memo: string;
          metadata?: any;
        },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void;
          onReadyForServerCompletion: (paymentId: string, txid: string) => void;
          onCancel: (paymentId: string) => void;
          onError: (error: Error, payment?: any) => void;
        }
      ) => any;
      openShareDialog: (data: { title?: string; text?: string; url?: string }) => void;
      ad?: {
        requestAd: (type: string) => Promise<any>;
        showAd: () => Promise<any>;
      };
    };
  }
}

export interface PiUser {
  uid: string;
  username: string;
}

export interface PiAuthResult {
  accessToken: string;
  user: PiUser;
}

export interface PiPayment {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
  payment_id?: string;
  transaction_id?: string;
  status?: 'pending' | 'completed' | 'cancelled' | 'error';
}

export interface AdReward {
  type: 'pi' | 'coins';
  amount: number;
  description: string;
}

export {};
