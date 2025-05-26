
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Webhook, Shield, Zap } from "lucide-react";

const WebhooksSection = () => {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Webhook className="h-8 w-8" />
            Webhooks
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with real-time events from Droplink using webhooks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Available Events
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <code className="text-sm bg-muted p-1 rounded">payment.completed</code>
                <Badge variant="secondary">Payment</Badge>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm bg-muted p-1 rounded">payment.failed</code>
                <Badge variant="secondary">Payment</Badge>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm bg-muted p-1 rounded">user.created</code>
                <Badge variant="outline">User</Badge>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm bg-muted p-1 rounded">profile.updated</code>
                <Badge variant="outline">User</Badge>
              </div>
              <div className="flex justify-between items-center">
                <code className="text-sm bg-muted p-1 rounded">product.purchased</code>
                <Badge variant="destructive">Store</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Signature Verification</h4>
                <p className="text-sm text-muted-foreground">
                  All webhook payloads are signed with HMAC-SHA256 using your webhook secret.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Retry Logic</h4>
                <p className="text-sm text-muted-foreground">
                  Failed webhooks are retried up to 3 times with exponential backoff.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Timeout</h4>
                <p className="text-sm text-muted-foreground">
                  Webhook endpoints must respond within 30 seconds.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-3">Example Webhook Payload</h4>
          <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <code>
              {`{
  "id": "evt_1234567890",
  "type": "payment.completed",
  "created": 1640995200,
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 10.5,
      "currency": "PI",
      "status": "completed",
      "user_id": "user_1234567890",
      "metadata": {
        "product_id": "prod_123"
      }
    }
  }
}`}
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebhooksSection;
