
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-20 px-6" id="faq">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Got Questions?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Everything you need to know about Droplink.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">What is Droplink?</AccordionTrigger>
              <AccordionContent>
                Droplink is a link-in-bio platform for Pi Network, enabling creators to share links, 
                sell products, and earn Pi tips seamlessly.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">How do I earn with Pi?</AccordionTrigger>
              <AccordionContent>
                Sell digital products or collect tips via Pi Network, with seamless transactions on your Droplink page.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">What are Droplink's plans?</AccordionTrigger>
              <AccordionContent>
                Starter (10π/month): Basic features. Pro (15π/month): Advanced tools like analytics. 
                Premium (22π/month): Pro features plus priority support. Billed annually.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">Can I customize my page?</AccordionTrigger>
              <AccordionContent>
                Yes! Choose water-inspired templates and customize links and products, 
                with advanced options in Pro/Premium.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-medium">What's in the Pro trial?</AccordionTrigger>
              <AccordionContent>
                The 7-day Pro trial includes all Pro features (analytics, themes, QR codes). 
                Post-trial, it's 6π/month, billed annually.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-medium">How does Droplink support Pi?</AccordionTrigger>
              <AccordionContent>
                Droplink integrates Pi payments and fosters a creator community with tools to grow your presence.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
