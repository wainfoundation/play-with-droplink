
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "general",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleReasonChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      reason: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        reason: "general",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Our team is here to help.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="col-span-3 md:col-span-1 order-2 md:order-1">
                <div className="bg-muted rounded-xl p-6 md:p-8 shadow-sm h-full">
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                      <p className="text-primary hover:underline">
                        <a href="mailto:hello@droplink.io">hello@droplink.io</a>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">On Social Media</h3>
                      <div className="flex space-x-4">
                        <a href="https://twitter.com/droplink" className="text-muted-foreground hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                          <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://facebook.com/droplink" className="text-muted-foreground hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                          <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://instagram.com/droplink" className="text-muted-foreground hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                          <span className="sr-only">Instagram</span>
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Community</h3>
                      <p className="mb-2">Join our Pi Network pioneers in the community forums.</p>
                      <a href="https://community.droplink.io" className="text-primary hover:underline">
                        community.droplink.io
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
                      <p>Monday - Friday<br />9:00 AM - 5:00 PM (UTC)</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="/help" className="text-primary hover:underline">How do I get started?</a>
                      </li>
                      <li>
                        <a href="/help" className="text-primary hover:underline">Pricing and billing questions</a>
                      </li>
                      <li>
                        <a href="/help" className="text-primary hover:underline">Technical support</a>
                      </li>
                      <li>
                        <a href="/help" className="text-primary hover:underline">View all FAQs</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-span-3 md:col-span-2 order-1 md:order-2">
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>What can we help you with?</Label>
                      <RadioGroup 
                        value={formData.reason} 
                        onValueChange={handleReasonChange}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="cursor-pointer">General Inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support" className="cursor-pointer">Technical Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="billing" id="billing" />
                          <Label htmlFor="billing" className="cursor-pointer">Billing Question</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partnership" id="partnership" />
                          <Label htmlFor="partnership" className="cursor-pointer">Partnership Opportunity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="cursor-pointer">Something Else</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to our <a href="/privacy" className="underline">Privacy Policy</a> 
                      and consent to us using your information to respond to your inquiry.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
