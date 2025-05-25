
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: May 20, 2025</p>
              
              <div className="my-8 p-4 bg-muted rounded-lg text-sm">
                <p className="font-medium">Summary:</p>
                <p>
                  These Terms of Service govern your use of Droplink. By using our services, 
                  you agree to these terms. We provide tools for creating link-in-bio pages and 
                  accepting Pi payments, but we're not responsible for your content or transactions. 
                  We can terminate accounts that violate our terms. You retain ownership of your content, 
                  but grant us license to host and display it. These terms may change, and we'll notify you 
                  of significant updates.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to Droplink ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of 
                our website, applications, and services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you don't agree to these Terms, 
                you may not access or use the Services. Please read them carefully.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Using Our Services</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">2.1 Account Registration</h3>
              <p>
                To use certain features of our Services, you may need to create an account. You agree to provide accurate, 
                current, and complete information during the registration process and to update such information to keep it 
                accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for all activities that occur under your 
                account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">2.2 Age Restrictions</h3>
              <p>
                You must be at least 16 years old to use our Services. If you are under 18, you represent that you have your 
                parent or guardian's permission to use the Services and that they have read and agreed to these Terms.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">2.3 Pi Network Integration</h3>
              <p>
                Droplink integrates with Pi Network for authentication and payment processing. By using these features, you 
                agree to comply with Pi Network's terms of service and acknowledge that we are not affiliated with or endorsed 
                by Pi Network. We are not responsible for any issues related to Pi Network's services or cryptocurrency values.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Content and Conduct</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">3.1 Your Content</h3>
              <p>
                Our Services allow you to create, upload, store, and share content. You retain ownership of any intellectual 
                property rights that you hold in that content. By uploading content to our Services, you grant us a worldwide, 
                non-exclusive, royalty-free license to use, host, store, reproduce, modify, create derivative works, communicate, 
                publish, publicly perform, publicly display, and distribute such content for the purpose of operating and providing 
                our Services.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">3.2 Prohibited Conduct</h3>
              <p>
                You agree not to use our Services to:
              </p>
              <ul>
                <li>Violate any applicable law or regulation</li>
                <li>Infringe upon the rights of others, including intellectual property rights</li>
                <li>Upload or distribute malware, viruses, or other malicious code</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>Collect or store personal data about other users without their consent</li>
                <li>Impersonate any person or entity</li>
                <li>Engage in any activity that could be considered fraudulent, deceptive, or misleading</li>
                <li>Promote or facilitate illegal activities such as gambling, illegal substances, or scams</li>
                <li>Post content that is harassing, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Subscriptions and Payments</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">4.1 Billing</h3>
              <p>
                Some of our Services require payment of fees. You agree to pay all fees in Pi cryptocurrency as specified when you 
                select services. You will be charged on a recurring basis for subscription services until you cancel.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">4.2 Cancellation</h3>
              <p>
                You may cancel your subscription at any time. Upon cancellation, your subscription will remain active until the 
                end of your current billing period. We do not provide refunds for partial subscription periods.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">4.3 Price Changes</h3>
              <p>
                We may change the fees for our Services from time to time. Any price changes will be communicated to you in advance. 
                By continuing to use the Services after a price change goes into effect, you agree to pay the updated fees.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
              <p>
                We may suspend or terminate your access to the Services at any time, with or without cause, and with or without 
                notice. Upon termination, your right to use the Services will immediately cease. All provisions of these Terms 
                which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, 
                indemnity, and limitations of liability.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Disclaimers</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, 
                AND NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT 
                THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
                OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY 
                TO ACCESS OR USE THE SERVICES.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to These Terms</h2>
              <p>
                We may modify these Terms from time to time. If we make material changes to these Terms, we will notify you by email 
                or by posting a notice on our website. Your continued use of the Services after such notification indicates your 
                acceptance of the modified Terms.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@droplink.space" className="text-primary hover:underline">legal@droplink.space</a>.
              </p>
              
              <div className="mt-12 p-4 border border-muted rounded-lg">
                <p className="font-medium mb-2">By using Droplink, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
                <p>
                  If you have questions or concerns, please see our <Link to="/help" className="text-primary hover:underline">Help Center</Link> or 
                  contact us at <a href="mailto:support@droplink.space" className="text-primary hover:underline">support@droplink.space</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
