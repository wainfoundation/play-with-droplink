
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pi, Wallet, Shield, Globe, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { isRunningInPiBrowser, initPiNetwork, authenticateWithPi } from '@/utils/pi-sdk';
import PiBrowserPrompt from './PiBrowserPrompt';

interface PiIntegrationProps {
  showTitle?: boolean;
  compact?: boolean;
}

const PiNetworkIntegration: React.FC<PiIntegrationProps> = ({ 
  showTitle = true, 
  compact = false 
}) => {
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [piInitialized, setPiInitialized] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    const checkPiBrowser = () => {
      const inPiBrowser = isRunningInPiBrowser();
      setIsPiBrowser(inPiBrowser);
      
      if (inPiBrowser) {
        const initialized = initPiNetwork();
        setPiInitialized(initialized);
      }
    };

    checkPiBrowser();
  }, []);

  const handlePiAuth = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please open this app in Pi Browser to use Pi Network features",
        variant: "destructive",
      });
      return;
    }

    try {
      setAuthenticating(true);
      const authResult = await authenticateWithPi();
      
      if (authResult) {
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome ${authResult.user.username || 'Pi User'}!`,
        });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "Could not authenticate with Pi Network",
        variant: "destructive",
      });
    } finally {
      setAuthenticating(false);
    }
  };

  const piFeatures = [
    {
      icon: Pi,
      title: "Pi Payments",
      description: "Accept Pi cryptocurrency payments seamlessly",
      status: piInitialized ? "active" : "inactive"
    },
    {
      icon: Wallet,
      title: "Pi Wallet",
      description: "Connect your Pi wallet for transactions",
      status: isPiBrowser ? "active" : "inactive"
    },
    {
      icon: Shield,
      title: "Pi Authentication",
      description: "Secure login with Pi Network credentials",
      status: piInitialized ? "active" : "inactive"
    },
    {
      icon: Globe,
      title: "Pi Domain",
      description: "Connect your .pi domain to Droplink",
      status: "active"
    }
  ];

  if (compact) {
    return (
      <div className="space-y-4">
        {!isPiBrowser && <PiBrowserPrompt />}
        
        <div className="grid grid-cols-2 gap-3">
          {piFeatures.map((feature, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center gap-2">
                <feature.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{feature.title}</p>
                  <Badge 
                    variant={feature.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {feature.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {isPiBrowser && (
          <Button 
            onClick={handlePiAuth}
            disabled={authenticating}
            className="w-full"
          >
            {authenticating ? "Authenticating..." : "Connect Pi Network"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Pi Network Integration</h2>
          <p className="text-muted-foreground">
            Complete Pi ecosystem integration for seamless blockchain experience
          </p>
        </div>
      )}

      {!isPiBrowser && <PiBrowserPrompt />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {piFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className={`p-2 rounded-lg ${
                  feature.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                {feature.title}
                <Badge 
                  variant={feature.status === "active" ? "default" : "secondary"}
                  className="ml-auto"
                >
                  {feature.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold">Pi Network Status</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {isPiBrowser ? "✓" : "✗"}
            </div>
            <p className="text-sm text-muted-foreground">Pi Browser</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {piInitialized ? "✓" : "✗"}
            </div>
            <p className="text-sm text-muted-foreground">SDK Initialized</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Integration Ready</p>
          </div>
        </div>

        {isPiBrowser ? (
          <Button 
            onClick={handlePiAuth}
            disabled={authenticating}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            size="lg"
          >
            {authenticating ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Authenticating with Pi Network...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Pi className="h-5 w-5" />
                Connect Pi Network Account
              </div>
            )}
          </Button>
        ) : (
          <Button 
            onClick={() => window.open('https://minepi.com/download', '_blank')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Download Pi Browser
          </Button>
        )}
      </div>
    </div>
  );
};

export default PiNetworkIntegration;
