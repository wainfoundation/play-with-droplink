
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import { Code, FileJson, ArrowRight, Book, Database, Lock } from "lucide-react";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("api");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Developers - Droplink.space API Documentation</title>
        <meta name="description" content="Access the Droplink.space API to integrate Pi Network payments and user data into your applications." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Droplink Developer Platform</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Build powerful applications with our APIs and integrate Pi Network payments into your services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#api-docs">View API Docs</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#get-started">Get Started</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* API Overview */}
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
              
              <TabsContent value="sdks" className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Software Development Kits</h3>
                <p className="mb-6">
                  We provide official SDKs for several popular programming languages to make integration easier.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
                        <Code size={24} />
                      </div>
                      <h4 className="text-lg font-semibold">JavaScript</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      JavaScript SDK for browser and Node.js applications.
                    </p>
                    <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
                      npm install @droplink/js-sdk
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href="#" className="flex items-center justify-center gap-1">
                        <Book size={14} /> Documentation
                      </a>
                    </Button>
                  </Card>
                  
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
                        <Code size={24} />
                      </div>
                      <h4 className="text-lg font-semibold">Python</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Python SDK for backend applications and scripts.
                    </p>
                    <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
                      pip install droplink-python
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href="#" className="flex items-center justify-center gap-1">
                        <Book size={14} /> Documentation
                      </a>
                    </Button>
                  </Card>
                  
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
                        <Code size={24} />
                      </div>
                      <h4 className="text-lg font-semibold">PHP</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      PHP SDK for web applications and CMS plugins.
                    </p>
                    <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
                      composer require droplink/php-sdk
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href="#" className="flex items-center justify-center gap-1">
                        <Book size={14} /> Documentation
                      </a>
                    </Button>
                  </Card>
                </div>
                
                <div className="text-center mt-8">
                  <p className="mb-4">Looking for another language? Check our GitHub repositories.</p>
                  <Button asChild>
                    <a href="https://github.com/droplink" target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Get Started */}
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
        
        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-hero text-white rounded-xl p-8 md:p-10 shadow-xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Join our developer community and start integrating Pi Network payments into your applications today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/signup?developer=true" className="flex items-center gap-2">
                      Create Developer Account <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                    <a href="https://github.com/droplink" target="_blank" rel="noopener noreferrer">
                      View Sample Projects
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Developers;
