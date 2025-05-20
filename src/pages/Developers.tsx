import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Developers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto text-center relative z-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Developers</h1>
            <p className="text-xl mb-8">
              Build powerful applications for creators using our API, webhooks, and tools.
              Extend the Droplink platform with your custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-opacity-90">
                API Documentation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Get API Key
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="api" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="api">API Reference</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="sdks">SDKs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api" className="mt-8">
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Droplink API</h2>
                  <p className="mb-4">
                    Our RESTful API gives you programmatic access to Droplink's features, 
                    allowing you to integrate our services with your application.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Base URL: <code className="bg-background px-2 py-1 rounded">https://api.droplink.io/v1</code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Authentication: API key via Bearer token
                  </p>
                </div>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="endpoints-profile">
                    <AccordionTrigger className="text-lg font-medium">Profile Endpoints</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 p-4 bg-card rounded-lg">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary text-white px-2 py-0.5 text-xs font-bold rounded mr-2">GET</span>
                            /profiles
                          </h3>
                          <p className="my-2 text-muted-foreground">List all profiles for the authenticated user</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X GET "https://api.droplink.io/v1/profiles" \
-H "Authorization: Bearer YOUR_API_KEY"</code>
                          </pre>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-green-600 text-white px-2 py-0.5 text-xs font-bold rounded mr-2">POST</span>
                            /profiles
                          </h3>
                          <p className="my-2 text-muted-foreground">Create a new profile</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X POST "https://api.droplink.io/v1/profiles" \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d {"{"}"username": "myusername", "title": "My Profile"{"}"}</code>
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="endpoints-links">
                    <AccordionTrigger className="text-lg font-medium">Link Endpoints</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 p-4 bg-card rounded-lg">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary text-white px-2 py-0.5 text-xs font-bold rounded mr-2">GET</span>
                            /links
                          </h3>
                          <p className="my-2 text-muted-foreground">List all links for a profile</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X GET "https://api.droplink.io/v1/links?profile_id=123" \
-H "Authorization: Bearer YOUR_API_KEY"</code>
                          </pre>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-green-600 text-white px-2 py-0.5 text-xs font-bold rounded mr-2">POST</span>
                            /links
                          </h3>
                          <p className="my-2 text-muted-foreground">Create a new link</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X POST "https://api.droplink.io/v1/links" \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d {"{"}"profile_id": "123", "title": "My Link", "url": "https://example.com"{"}"}</code>
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="endpoints-analytics">
                    <AccordionTrigger className="text-lg font-medium">Analytics Endpoints</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 p-4 bg-card rounded-lg">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary text-white px-2 py-0.5 text-xs font-bold rounded mr-2">GET</span>
                            /analytics/profiles/{"{"}"profile_id"{"}"}
                          </h3>
                          <p className="my-2 text-muted-foreground">Get analytics for a specific profile</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X GET "https://api.droplink.io/v1/analytics/profiles/123" \
-H "Authorization: Bearer YOUR_API_KEY"</code>
                          </pre>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            <span className="bg-primary text-white px-2 py-0.5 text-xs font-bold rounded mr-2">GET</span>
                            /analytics/links/{"{"}"link_id"{"}"}
                          </h3>
                          <p className="my-2 text-muted-foreground">Get analytics for a specific link</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                            <code>curl -X GET "https://api.droplink.io/v1/analytics/links/456" \
-H "Authorization: Bearer YOUR_API_KEY"</code>
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="webhooks" className="mt-8">
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Webhooks</h2>
                  <p>
                    Receive real-time notifications about events that happen in your Droplink account.
                    Configure webhooks to notify your application when certain events occur.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Available Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">profile.created</h4>
                        <p className="text-sm text-muted-foreground">Triggered when a new profile is created</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">profile.updated</h4>
                        <p className="text-sm text-muted-foreground">Triggered when a profile is updated</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">link.created</h4>
                        <p className="text-sm text-muted-foreground">Triggered when a new link is added</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">link.clicked</h4>
                        <p className="text-sm text-muted-foreground">Triggered when a link is clicked</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">payment.received</h4>
                        <p className="text-sm text-muted-foreground">Triggered when a Pi payment is received</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-medium">subscriber.added</h4>
                        <p className="text-sm text-muted-foreground">Triggered when someone subscribes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Example Payload</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>{`{
  "id": "evt_123456789",
  "event_type": "link.clicked",
  "created_at": "2025-05-20T12:34:56Z",
  "data": {
    "profile_id": "prof_123",
    "link_id": "link_456",
    "link_title": "My YouTube Channel",
    "clicked_at": "2025-05-20T12:34:56Z",
    "referrer": "https://twitter.com",
    "user_agent": "Mozilla/5.0...",
    "location": {
      "country": "United States",
      "city": "San Francisco"
    }
  }
}`}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Setting Up a Webhook</h3>
                    <ol className="space-y-4 ml-6 list-decimal">
                      <li>Go to your Developer Dashboard</li>
                      <li>Navigate to Webhooks section</li>
                      <li>Click "Add Endpoint"</li>
                      <li>Enter your endpoint URL</li>
                      <li>Select the events you want to receive</li>
                      <li>Save your webhook configuration</li>
                    </ol>
                    <Button className="mt-6">Open Developer Dashboard</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sdks" className="mt-8">
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h2 className="text-2xl font-semibold mb-4">Software Development Kits</h2>
                  <p>
                    Use our SDKs to integrate Droplink functionality directly into your applications.
                    Available in multiple languages for seamless integration.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.5,15.97L5.71,10.18C5.32,9.79 5.32,9.14 5.71,8.76C6.1,8.37 6.75,8.37 7.14,8.76L11.5,13.12L15.86,8.76C16.25,8.37 16.9,8.37 17.29,8.76C17.68,9.14 17.68,9.79 17.29,10.18L11.5,15.97Z" />
                      </svg>
                      <h3 className="text-xl font-semibold">JavaScript</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Perfect for web applications, our JavaScript SDK makes it easy to integrate Droplink features.
                    </p>
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm mb-4">
                      <code>npm install droplink-sdk</code>
                    </pre>
                    <div className="flex justify-between">
                      <Button variant="outline">Documentation</Button>
                      <Button>Download</Button>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.5,15.97L5.71,10.18C5.32,9.79 5.32,9.14 5.71,8.76C6.1,8.37 6.75,8.37 7.14,8.76L11.5,13.12L15.86,8.76C16.25,8.37 16.9,8.37 17.29,8.76C17.68,9.14 17.68,9.79 17.29,10.18L11.5,15.97Z" />
                      </svg>
                      <h3 className="text-xl font-semibold">Python</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Build server-side applications with our Python SDK, ideal for backend integrations.
                    </p>
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm mb-4">
                      <code>pip install droplink-python</code>
                    </pre>
                    <div className="flex justify-between">
                      <Button variant="outline">Documentation</Button>
                      <Button>Download</Button>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.5,15.97L5.71,10.18C5.32,9.79 5.32,9.14 5.71,8.76C6.1,8.37 6.75,8.37 7.14,8.76L11.5,13.12L15.86,8.76C16.25,8.37 16.9,8.37 17.29,8.76C17.68,9.14 17.68,9.79 17.29,10.18L11.5,15.97Z" />
                      </svg>
                      <h3 className="text-xl font-semibold">React Native</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Create mobile applications with our React Native SDK for iOS and Android.
                    </p>
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm mb-4">
                      <code>npm install droplink-react-native</code>
                    </pre>
                    <div className="flex justify-between">
                      <Button variant="outline">Documentation</Button>
                      <Button>Download</Button>
                    </div>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.5,15.97L5.71,10.18C5.32,9.79 5.32,9.14 5.71,8.76C6.1,8.37 6.75,8.37 7.14,8.76L11.5,13.12L15.86,8.76C16.25,8.37 16.9,8.37 17.29,8.76C17.68,9.14 17.68,9.79 17.29,10.18L11.5,15.97Z" />
                      </svg>
                      <h3 className="text-xl font-semibold">PHP</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Integrate Droplink with PHP applications for web development.
                    </p>
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm mb-4">
                      <code>composer require droplink/droplink-php</code>
                    </pre>
                    <div className="flex justify-between">
                      <Button variant="outline">Documentation</Button>
                      <Button>Download</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="mb-4 text-muted-foreground">
                    Don't see your preferred language? Check out our GitHub repository for more SDKs.
                  </p>
                  <Button variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    View on GitHub
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Developer Community</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect with other developers building on Droplink. Share ideas, get help, and collaborate on projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">GitHub</h3>
                <p className="mb-4 text-muted-foreground">
                  Contribute to our open-source projects and examples
                </p>
                <Button variant="outline">GitHub Repository</Button>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">Developer Forum</h3>
                <p className="mb-4 text-muted-foreground">
                  Ask questions and share your knowledge with other developers
                </p>
                <Button variant="outline">Join Forum</Button>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">Discord</h3>
                <p className="mb-4 text-muted-foreground">
                  Chat in real-time with the Droplink developer community
                </p>
                <Button variant="outline">Join Discord</Button>
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
