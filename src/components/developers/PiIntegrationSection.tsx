
import { TabsContent } from "@/components/ui/tabs";

const PiIntegrationSection = () => {
  return (
    <TabsContent value="pi-integration" className="border rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Pi Network Integration</h3>
      <p className="mb-6">
        Integrate Pi Network payments directly into your applications using our simplified API.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-3">Payment Flow</h4>
          <ol className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-medium">Create Payment Intent</p>
                <p className="text-sm text-muted-foreground">Initialize a payment with amount and memo</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-medium">Redirect to Pi Browser</p>
                <p className="text-sm text-muted-foreground">User completes payment in Pi Browser</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-medium">Receive Callback</p>
                <p className="text-sm text-muted-foreground">Payment status is sent to your callback URL</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="font-medium">Verify Payment</p>
                <p className="text-sm text-muted-foreground">Verify payment status using our API</p>
              </div>
            </li>
          </ol>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3">Example Code</h4>
          <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <code>
              {`// Create a payment intent
const createPayment = async () => {
  const response = await fetch(
    'https://api.droplink.space/v1/payments/create',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your_api_key',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 5.0,
        memo: 'Premium content access',
        callback_url: 'https://yourdomain.com/payments/callback'
      })
    }
  );
  
  const { payment_id, payment_url } = await response.json();
  
  // Redirect user to payment URL
  window.location.href = payment_url;
}`}
            </code>
          </div>
          
          <h4 className="text-lg font-semibold mt-6 mb-3">Testing</h4>
          <p className="text-sm">
            Use our sandbox environment for testing Pi payments without using real Pi. Set the <code className="bg-muted p-1 rounded">environment</code> parameter to <code className="bg-muted p-1 rounded">sandbox</code> in your API requests.
          </p>
        </div>
      </div>
    </TabsContent>
  );
};

export default PiIntegrationSection;
