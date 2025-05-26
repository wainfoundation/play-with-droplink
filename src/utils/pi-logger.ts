interface PiLogMetadata {
  operation?: string;
  success?: boolean;
  error?: Error | string;
  metadata?: Record<string, any>;
  userAgent?: string;
  timestamp?: string;
  piSDKVersion?: string;
  // Allow any additional properties for custom logging data
  [key: string]: any;
}

export class PiLogger {
  private static formatLog(level: 'info' | 'warn' | 'error', operation: string, data: PiLogMetadata) {
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      operation,
      piSDKVersion: '2.0',
      userAgent: navigator.userAgent,
      isPiBrowser: !!window.Pi,
      ...data
    };

    return logData;
  }

  static info(operation: string, metadata?: PiLogMetadata) {
    const logData = this.formatLog('info', operation, { success: true, ...metadata });
    console.log('[Pi SDK]', operation, logData);
    
    // In production, you could send to analytics service
    if (import.meta.env.PROD && logData.success) {
      // Example: analytics.track('pi_operation_success', logData);
    }
  }

  static warn(operation: string, metadata?: PiLogMetadata) {
    const logData = this.formatLog('warn', operation, metadata);
    console.warn('[Pi SDK]', operation, logData);
  }

  static error(operation: string, error: Error | string, metadata?: PiLogMetadata) {
    const logData = this.formatLog('error', operation, { 
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...metadata 
    });
    console.error('[Pi SDK]', operation, logData);
    
    // In production, you could send to error tracking service
    if (import.meta.env.PROD) {
      // Example: errorService.captureException(error, logData);
    }
  }

  static payment(operation: string, paymentData: any, metadata?: PiLogMetadata) {
    const sanitizedPaymentData = {
      ...paymentData,
      // Remove sensitive data for logging
      accessToken: paymentData.accessToken ? '[REDACTED]' : undefined,
      privateKey: '[REDACTED]',
    };

    this.info(`payment_${operation}`, {
      ...metadata,
      paymentData: sanitizedPaymentData
    });
  }

  static auth(operation: string, authData?: any, metadata?: PiLogMetadata) {
    const sanitizedAuthData = authData ? {
      uid: authData.uid,
      username: authData.username,
      scopes: authData.scopes,
      // Remove sensitive tokens
      accessToken: authData.accessToken ? '[REDACTED]' : undefined,
    } : undefined;

    this.info(`auth_${operation}`, {
      ...metadata,
      authData: sanitizedAuthData
    });
  }
}

export default PiLogger;
