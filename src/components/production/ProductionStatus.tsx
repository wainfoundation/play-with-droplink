
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface StatusItem {
  label: string;
  status: 'success' | 'error' | 'warning' | 'info';
  description?: string;
}

interface ProductionStatusProps {
  isPiBrowser: boolean;
  isAuthenticated: boolean;
  piSDKReady: boolean;
  walletConnected: boolean;
  adNetworkReady: boolean;
}

const ProductionStatus: React.FC<ProductionStatusProps> = ({
  isPiBrowser,
  isAuthenticated,
  piSDKReady,
  walletConnected,
  adNetworkReady
}) => {
  const statusItems: StatusItem[] = [
    {
      label: 'Pi Browser Environment',
      status: isPiBrowser ? 'success' : 'error',
      description: isPiBrowser ? 'Running in Pi Browser' : 'Requires Pi Browser for full functionality'
    },
    {
      label: 'Pi SDK',
      status: piSDKReady ? 'success' : 'warning',
      description: piSDKReady ? 'SDK loaded and ready' : 'SDK not fully initialized'
    },
    {
      label: 'User Authentication',
      status: isAuthenticated ? 'success' : 'info',
      description: isAuthenticated ? 'User authenticated with Pi Network' : 'Authentication required'
    },
    {
      label: 'Wallet Connection',
      status: walletConnected ? 'success' : 'info',
      description: walletConnected ? 'Pi wallet connected' : 'Wallet connection pending'
    },
    {
      label: 'Ad Network',
      status: adNetworkReady ? 'success' : 'warning',
      description: adNetworkReady ? 'Rewarded ads available' : 'Ad network not available'
    }
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const overallStatus = statusItems.every(item => item.status === 'success') 
    ? 'success' 
    : statusItems.some(item => item.status === 'error') 
    ? 'error' 
    : 'warning';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon(overallStatus)}
          Production System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <Badge variant={getStatusVariant(overallStatus)} className="text-lg px-4 py-2">
            {overallStatus === 'success' && 'All Systems Ready'}
            {overallStatus === 'warning' && 'Partial Functionality'}
            {overallStatus === 'error' && 'Action Required'}
          </Badge>
        </div>

        <div className="space-y-3">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              {getIcon(item.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.label}</h4>
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {overallStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Action Required</h4>
            <p className="text-red-700 text-sm">
              Please open this application in Pi Browser to access all Pi Network features.
            </p>
          </div>
        )}

        {overallStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Ready for Production</h4>
            <p className="text-green-700 text-sm">
              All Pi Network integrations are active and ready for use.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductionStatus;
