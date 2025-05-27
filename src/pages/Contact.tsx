import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Save contact submission to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Have questions about Droplink? We're here to help. Reach out to our team and we'll
                get back to you as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div className="bg-muted p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-muted-foreground mb-2">Our friendly team is here to help.</p>
                      <a href="mailto:support@droplink.space" className="text-primary hover:underline">support@droplink.space</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Chat on Pi Network</h3>
                      <p className="text-muted-foreground mb-2">Connect with us through the Pi Network app.</p>
                      <p className="text-primary">@droplink</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M3 7h7"/><path d="M13 7h7"/><path d="M12 18a2 2 0 0 0-2 2v1"/><path d="M7 15v-1a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"/></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Support Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday</p>
                      <p className="text-muted-foreground">9:00 AM - 5:00 PM UTC</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="https://twitter.com/droplink_space" className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                    <a href="https://facebook.com/droplink.space" className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://instagram.com/droplink.space" className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
