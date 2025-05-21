
import { TabsContent } from "@/components/ui/tabs";

const WebhooksSection = () => {
  return (
    <TabsContent value="webhooks" className="border rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Webhooks</h3>
      <p className="mb-6">
        Droplink webhooks allow your application to receive real-time notifications about events that happen in your account.
      </p>
      
      <h4 className="text-lg font-semibold mb-2">Events</h4>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded p-4">
          <h5 className="font-medium mb-2">link.created</h5>
          <p className="text-sm text-muted-foreground">Triggered when a new link is created</p>
        </div>
        <div className="border rounded p-4">
          <h5 className="font-medium mb-2">link.clicked</h5>
          <p className="text-sm text-muted-foreground">Triggered when a link is clicked</p>
        </div>
        <div className="border rounded p-4">
          <h5 className="font-medium mb-2">payment.completed</h5>
          <p className="text-sm text-muted-foreground">Triggered when a Pi payment is completed</p>
        </div>
        <div className="border rounded p-4">
          <h5 className="font-medium mb-2">profile.updated</h5>
          <p className="text-sm text-muted-foreground">Triggered when profile information is updated</p>
        </div>
      </div>
      
      <h4 className="text-lg font-semibold mb-2">Setting up Webhooks</h4>
      <p className="mb-4">
        Configure webhook endpoints in your developer dashboard. We recommend using HTTPS for all webhook URLs.
      </p>
      
      <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm mb-6 overflow-x-auto">
        <code>
          // Example webhook payload<br />
          {`{
  "event": "payment.completed",
  "created": 1683547689,
  "data": {
    "id": "pay_123456789",
    "amount": 5.0,
    "currency": "PI",
    "status": "completed",
    "created_at": "2025-05-08T10:28:09Z"
  }
}`}
        </code>
      </div>
    </TabsContent>
  );
};

export default WebhooksSection;
