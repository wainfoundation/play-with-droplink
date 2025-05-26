
/**
 * Pi Network SDK Type Definitions
 */

// Types from Pi SDK documentation
export interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

export interface PiPaymentData {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

// Internal Pi payment interface that includes identifier
export interface PiPayment {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
  identifier: string;
}

export interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

// Ad related types
export type AdType = "interstitial" | "rewarded";
export type NativeFeature = "inline_media" | "request_permission" | "ad_network";

export type ShowAdResponse =
  | {
      type: "interstitial";
      result: "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE";
    }
  | {
      type: "rewarded";
      result: "AD_REWARDED" | "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED" | "USER_UNAUTHENTICATED";
      adId?: string;
    };

export type IsAdReadyResponse = {
  type: "interstitial" | "rewarded";
  ready: boolean;
};

export type RequestAdResponse = {
  type: "interstitial" | "rewarded";
  result: "AD_LOADED" | "AD_FAILED_TO_LOAD" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED";
};

// Updated global window type to include all Pi SDK features
declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound?: (payment: any) => void
      ) => Promise<PiAuthResult>;
      createPayment: (
        payment: PiPayment,
        callbacks: PaymentCallbacks
      ) => Promise<any>;
      nativeFeaturesList: () => Promise<Array<NativeFeature>>;
      openShareDialog: (title: string, message: string) => void;
      openUrlInSystemBrowser: (url: string) => Promise<void>;
      Ads?: {
        showAd: (adType: AdType) => Promise<ShowAdResponse>;
        isAdReady: (adType: AdType) => Promise<IsAdReadyResponse>;
        requestAd: (adType: AdType) => Promise<RequestAdResponse>;
      };
    };
  }
}
