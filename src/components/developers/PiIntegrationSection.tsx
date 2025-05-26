
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pi, Code, Shield, Zap } from "lucide-react";

const PiIntegrationSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Pi className="h-8 w-8" />
            Pi Network Integration
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Seamlessly integrate Pi Network payments and authentication into your applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Pi SDK Integration
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Authentication</h4>
                <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono">
                  <code>{`window.Pi.authenticate(scopes, onIncompletePaymentFound)`}</code>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Processing</h4>
                <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono">
                  <code>{`window.Pi.createPayment(paymentData, callbacks)`}</code>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Frontend</Badge>
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">TypeScript</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Backend Verification
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Token Verification</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Verify Pi authentication tokens server-side for security.
                </p>
                <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono">
                  <code>{`GET https://api.minepi.com/v2/me`}</code>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Validation</h4>
                <p className="text-sm text-muted-foreground">
                  Validate payment completion using Pi Network's payment API.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="destructive">Backend</Badge>
                <Badge variant="outline">REST API</Badge>
                <Badge variant="outline">HTTPS</Badge>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Integration Example
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Initialize Pi SDK</h4>
                <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <code>
                    {`// Include Pi SDK in your HTML
<script src="https://sdk.minepi.com/pi-sdk.js"></script>

// Initialize in your JavaScript
await window.Pi.init({
  version: "2.0",
  sandbox: true // Use false for production
});`}
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">2. Authenticate User</h4>
                <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <code>
                    {`const authResult = await window.Pi.authenticate(
  ["payments", "username"], 
  onIncompletePaymentFound
);

// Verify token with your backend
const response = await fetch('/api/verify-pi-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ accessToken: authResult.accessToken })
});`}
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">3. Process Payment</h4>
                <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <code>
                    {`const payment = window.Pi.createPayment({
  amount: 10.0,
  memo: "Purchase from Droplink Store",
  metadata: { productId: "123" }
}, {
  onReadyForServerApproval: (paymentId) => {
    // Submit to your backend for approval
    approvePayment(paymentId);
  },
  onReadyForServerCompletion: (paymentId) => {
    // Complete payment on your backend
    completePayment(paymentId);
  }
});`}
                  </code>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PiIntegrationSection;
