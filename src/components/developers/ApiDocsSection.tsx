
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, FileJson, Lock } from "lucide-react";

interface ApiDocsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ApiDocsSection = ({ activeTab, setActiveTab }: ApiDocsSectionProps) => {
  return (
    <section className="py-16 px-4" id="api-docs">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">API Documentation</h2>
        
        <Tabs defaultValue={activeTab} className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="pi-integration">Pi Integration</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">RESTful API</h3>
                <p className="mb-4">
                  Our RESTful API allows you to access your Droplink data and integrate with Pi Network. All requests use HTTPS and are authenticated using API keys.
                </p>
                <h4 className="text-lg font-semibold mt-6 mb-2">Authentication</h4>
                <p className="mb-4">
                  All API requests require authentication. You can obtain an API key from your developer dashboard.
                </p>
                <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm mb-4">
                  <code>
                    Authorization: Bearer your_api_key_here
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Available Endpoints</h4>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium">
                      <span className="flex items-center gap-2">
                        <Database size={16} />
                        Profile Data
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-2">
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/profile</code> - Get profile information</p>
                      <p><code className="bg-muted p-1 rounded">PUT /api/v1/profile</code> - Update profile information</p>
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/links</code> - Get all links</p>
                      <p><code className="bg-muted p-1 rounded">POST /api/v1/links</code> - Create new link</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium">
                      <span className="flex items-center gap-2">
                        <FileJson size={16} />
                        Analytics
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-2">
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/overview</code> - Get analytics overview</p>
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/links</code> - Get link analytics</p>
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/visitors</code> - Get visitor analytics</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium">
                      <span className="flex items-center gap-2">
                        <Lock size={16} />
                        Pi Payments
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-2">
                      <p><code className="bg-muted p-1 rounded">POST /api/v1/payments/create</code> - Create payment intent</p>
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/payments/:id</code> - Get payment status</p>
                      <p><code className="bg-muted p-1 rounded">GET /api/v1/payments/history</code> - Get payment history</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">Example Request</h4>
              <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <code>
                  curl -X GET https://api.droplink.space/v1/profile \<br />
                  -H "Authorization: Bearer your_api_key_here" \<br />
                  -H "Content-Type: application/json"
                </code>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ApiDocsSection;
