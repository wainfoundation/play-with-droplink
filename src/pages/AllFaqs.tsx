
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const AllFaqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Droplink?",
          answer: "Droplink is a link-in-bio platform built specifically for the Pi Network ecosystem. It allows creators to share all their content in one place, sell products or services, and collect Pi cryptocurrency payments or tips."
        },
        {
          question: "How is Droplink different from other link-in-bio tools?",
          answer: "Droplink is specifically designed for the Pi Network ecosystem, offering native Pi payment integration, Pi tips, and other Pi-specific features that other link-in-bio tools don't provide."
        },
        {
          question: "Do I need a Pi Network account to use Droplink?",
          answer: "While you can create a basic Droplink account without Pi Network integration, many of our core features like payments and Pi authentication require a Pi Network account. We recommend connecting your Pi Network account to get the full Droplink experience."
        }
      ]
    },
    {
      category: "Account & Profile",
      questions: [
        {
          question: "How do I change my username?",
          answer: "You can change your username in Account Settings. Note that if you change your username, your profile URL will also change, which could affect existing links you've shared."
        },
        {
          question: "Can I use a custom domain with Droplink?",
          answer: "Yes, users on our Starter, Pro and Premium plans can connect a custom domain to their Droplink profile. This feature is not available on the Free plan."
        },
        {
          question: "How do I customize my profile appearance?",
          answer: "You can customize your profile appearance in the 'Appearance' tab of your dashboard. Free users get access to basic customization options, while paid plans unlock advanced themes, animations, and custom CSS."
        }
      ]
    },
    {
      category: "Payments & Subscriptions",
      questions: [
        {
          question: "How much does Droplink cost?",
          answer: "Droplink offers a Free plan and three paid subscription tiers: Starter (8π per month), Pro (12π per month), and Premium (18π per month). All plans are billed annually, and we offer a 7-day free trial of Pro features for new users."
        },
        {
          question: "How do Pi payments work in Droplink?",
          answer: "Droplink integrates directly with Pi Network's payment platform. When someone makes a payment or sends a tip through your Droplink profile, the Pi is transferred directly to your Pi wallet after transaction completion."
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to your current plan features until the end of your billing period."
        },
        {
          question: "Is there a transaction fee for receiving Pi payments?",
          answer: "Droplink doesn't charge any additional fees beyond the standard Pi Network transaction fees. What you receive is what was sent, minus the Pi Network blockchain fees."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Can I schedule links to appear at specific times?",
          answer: "Yes, Pro and Premium users can schedule links to appear and disappear at specific dates and times. This is useful for limited-time promotions or time-sensitive content."
        },
        {
          question: "How many links can I add to my profile?",
          answer: "Free users can add 1 link, while all paid plans (Starter, Pro, and Premium) allow unlimited links."
        },
        {
          question: "Does Droplink provide analytics?",
          answer: "Yes, all paid plans include analytics that show you page views, link clicks, geographic data, and referral sources. Free users do not have access to analytics."
        },
        {
          question: "Can I sell digital products through Droplink?",
          answer: "Yes, Premium users can sell digital products directly through their Droplink profile using Pi payments. This feature allows you to upload files and set access permissions based on payment."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "Is Droplink mobile-friendly?",
          answer: "Yes, Droplink is fully optimized for mobile devices, both for profile creators and visitors. The dashboard and all public profiles are responsive and work well on any screen size."
        },
        {
          question: "Can I integrate Droplink with other platforms?",
          answer: "Yes, Droplink offers API access for Pro and Premium users, allowing you to integrate with other platforms and services. Additionally, we provide webhooks for real-time notifications about profile activity."
        },
        {
          question: "Does Droplink work outside of Pi Browser?",
          answer: "Yes, Droplink works in any modern web browser, though Pi payment features require the Pi Browser to complete transactions. We show appropriate prompts for users to open links in Pi Browser when payment features are used."
        }
      ]
    },
    {
      category: "Pi Network Integration",
      questions: [
        {
          question: "How do I connect my Pi wallet to Droplink?",
          answer: "You can connect your Pi wallet during the signup process or later through your account settings by authorizing with Pi Network. This process is secure and requires your permission through the Pi Browser."
        },
        {
          question: "What happens if Pi Network is down?",
          answer: "If Pi Network services are temporarily unavailable, Droplink will continue to function normally except for payment features. Any pending transactions will be processed once Pi Network services resume."
        },
        {
          question: "Can visitors tip me without a Pi account?",
          answer: "No, visitors need a Pi Network account to send tips or make payments. However, they can still view your profile and click on your links without a Pi account."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() === "" ? faqs : faqs.map(category => {
    return {
      ...category,
      questions: category.questions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>All FAQs - Droplink Help Center</title>
        <meta name="description" content="Find answers to the most frequently asked questions about Droplink - the Pi Network link-in-bio platform." />
      </Helmet>
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to the most common questions about Droplink
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">Try a different search query or browse all categories below.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            filteredFaqs.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
          
          <div className="text-center mt-16">
            <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
            <p className="mb-6 text-muted-foreground">
              Can't find the answers you're looking for? Contact our friendly support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/community">Visit Community Forum</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllFaqs;
