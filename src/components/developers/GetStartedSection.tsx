
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GetStartedSection = () => {
  return (
    <section className="py-16 px-4 bg-muted" id="get-started">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started with Development</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Follow these steps to start integrating Droplink into your applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">For Frontend Developers</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Create a Developer Account</p>
                  <p className="text-sm text-muted-foreground">Sign up for a Droplink developer account</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Generate API Key</p>
                  <p className="text-sm text-muted-foreground">Create an API key in your developer dashboard</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Install SDK</p>
                  <p className="text-sm text-muted-foreground">Add our JavaScript SDK to your project</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <div>
                  <p className="font-medium">Implement Pi Payments</p>
                  <p className="text-sm text-muted-foreground">Add Pi Network payment functionality</p>
                </div>
              </li>
            </ul>
            
            <Button className="w-full mt-6" asChild>
              <Link to="/signup?developer=true">Create Developer Account</Link>
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">For Backend Developers</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Create a Developer Account</p>
                  <p className="text-sm text-muted-foreground">Sign up for a Droplink developer account</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Set Up Webhooks</p>
                  <p className="text-sm text-muted-foreground">Configure webhook endpoints to receive events</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Implement Payment Verification</p>
                  <p className="text-sm text-muted-foreground">Verify Pi payments on your server</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <div>
                  <p className="font-medium">Store User Data</p>
                  <p className="text-sm text-muted-foreground">Securely store and manage user information</p>
                </div>
              </li>
            </ul>
            
            <Button className="w-full mt-6" variant="outline" asChild>
              <a href="#api-docs">View API Documentation</a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
