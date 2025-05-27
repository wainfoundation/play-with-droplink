
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PiDomainSetupGuide = () => {
  const steps = [
    {
      number: 1,
      title: "Access Your Pi Domain Settings",
      description: "Log into your Pi Network account and navigate to your domain management panel.",
      action: "Go to Pi Network Dashboard"
    },
    {
      number: 2,
      title: "Add DNS TXT Record",
      description: "Add a TXT record to your domain's DNS settings with the validation key provided by Droplink support.",
      action: "Contact Support for Key"
    },
    {
      number: 3,
      title: "Wait for DNS Propagation",
      description: "DNS changes can take 24-48 hours to propagate worldwide.",
      action: "Check DNS Status"
    },
    {
      number: 4,
      title: "Verify Domain Connection",
      description: "Use the verification tool to confirm your domain is properly connected.",
      action: "Verify Now"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Pi Domain Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* DNS Setup Instructions */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              DNS Configuration Required
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              To connect your .pi domain to Droplink, you'll need to add a TXT record to your domain's DNS settings.
            </p>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs font-medium mb-1">Record Type: TXT</p>
              <p className="text-xs font-medium mb-1">Name: @ (or your domain)</p>
              <p className="text-xs font-medium mb-2">Value: [Provided by Droplink Support]</p>
              <p className="text-xs text-muted-foreground">
                Contact our support team to receive your unique validation key.
              </p>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Setup Steps:</h3>
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {step.action}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> DNS changes can take up to 48 hours to propagate. 
              If verification fails initially, please wait and try again later.
            </AlertDescription>
          </Alert>

          {/* External Resources */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Need Help?</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://docs.minepi.com/domains" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Pi Domain Docs <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://support.minepi.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Pi Support <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiDomainSetupGuide;
