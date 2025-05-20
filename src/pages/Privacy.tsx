
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: May 20, 2025</p>
              
              <div className="my-8 p-4 bg-muted rounded-lg text-sm">
                <p className="font-medium">Summary:</p>
                <p>
                  This Privacy Policy explains what information we collect when you use Droplink, 
                  how we use it, and how you can control your data. We collect account information, 
                  profile content, usage data, and information from Pi Network integration. We use this 
                  information to provide our services, improve user experience, and ensure security. 
                  We don't sell your data but may share it with service providers or for legal compliance. 
                  You can access, correct, or delete your data through your account settings.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                At Droplink ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, store, and share information when you use our website, 
                applications, and services (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully to understand our practices regarding your personal data. By accessing 
                or using our Services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">2.1 Information You Provide to Us</h3>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul>
                <li><strong>Account Information:</strong> When you register for an account, we collect your username, email address, password, and optionally your name and profile picture.</li>
                <li><strong>Profile Content:</strong> Information you add to your Droplink profile, including links, descriptions, images, and other content you choose to share.</li>
                <li><strong>Communications:</strong> Information you provide when you contact us for support or communicate with us for any reason.</li>
                <li><strong>Payment Information:</strong> If you subscribe to a paid plan, we collect Pi Network payment information necessary to process your transaction.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">2.2 Information We Collect Automatically</h3>
              <p>
                When you use our Services, we automatically collect certain information, including:
              </p>
              <ul>
                <li><strong>Usage Information:</strong> Details of your use of our Services, including log data, clicks, page views, and traffic sources.</li>
                <li><strong>Device Information:</strong> Information about the device you use to access our Services, including hardware model, operating system, unique device identifiers, and mobile network information.</li>
                <li><strong>Location Information:</strong> General location data based on your IP address.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect information about how you interact with our Services. For more information, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">2.3 Information from Pi Network Integration</h3>
              <p>
                When you connect your Pi Network account to Droplink, we may receive information from Pi Network, including:
              </p>
              <ul>
                <li>Your Pi Network username</li>
                <li>Account verification status</li>
                <li>Payment transaction details when you make or receive payments through our Services</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                <li>Detect, prevent, and address technical issues, fraud, or illegal activities</li>
                <li>Personalize and improve your experience with our Services</li>
                <li>Develop new products, services, features, and functionality</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. How We Share Your Information</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                <li><strong>Analytics Partners:</strong> We may share aggregated or de-identified information with third parties for industry analysis, demographic profiling, and other purposes.</li>
                <li><strong>Compliance with Laws:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, user information may be transferred as part of the transaction.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your consent or at your direction.</li>
              </ul>
              <p>
                We do not sell your personal information to third parties for their own marketing purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide you with our Services and for other essential purposes 
                such as complying with our legal obligations, resolving disputes, and enforcing our agreements.
              </p>
              <p>
                If you delete your account, we will delete or anonymize your personal information, but we may retain certain information 
                if necessary for legitimate business or legal purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">6.1 Account Information</h3>
              <p>
                You can update, correct, or delete your account information at any time by logging into your account and accessing your 
                account settings. If you cannot access certain information through your account settings, you may contact us for assistance.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">6.2 Marketing Communications</h3>
              <p>
                You may opt out of receiving promotional communications from us by following the instructions in those communications. 
                Even if you opt out, you will continue to receive non-promotional communications from us regarding our Services.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">6.3 Cookies</h3>
              <p>
                You can manage your cookie preferences through your browser settings. For more information, please see our 
                <Link to="/cookies" className="text-primary hover:underline ml-1">Cookie Policy</Link>.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">6.4 Data Protection Rights</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal data, such as:
              </p>
              <ul>
                <li>The right to access your personal data</li>
                <li>The right to rectify inaccurate personal data</li>
                <li>The right to request the deletion of your personal data</li>
                <li>The right to restrict or object to the processing of your personal data</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a>.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Security</h2>
              <p>
                We take reasonable measures to help protect your personal data from loss, theft, misuse, and unauthorized access, 
                disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage 
                is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
              <p>
                Our Services are not directed to children under the age of 16. We do not knowingly collect personal data from children 
                under 16. If you become aware that a child has provided us with personal information without parental consent, please 
                contact us. If we become aware that we have collected personal data from a child under 16 without verification of 
                parental consent, we will take steps to remove that information from our servers.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. International Data Transfers</h2>
              <p>
                We may transfer your personal data to countries other than the country in which you initially provided the information. 
                These countries may not have the same data protection laws as your country. By using our Services, you consent to the 
                transfer of your data as described in this Privacy Policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, 
                or regulatory reasons. If we make material changes, we will notify you by email or through a notice on our website prior 
                to the changes becoming effective. Your continued use of our Services after any changes indicates your acceptance of the 
                new Privacy Policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact 
                us at:
              </p>
              <p>
                <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a><br />
                Droplink Inc.<br />
                1234 Privacy Lane<br />
                San Francisco, CA 94105<br />
                USA
              </p>
              
              <div className="mt-12 p-4 border border-muted rounded-lg">
                <p className="font-medium mb-2">By using Droplink, you acknowledge that you have read, understood, and agree to this Privacy Policy.</p>
                <p>
                  For more information about how we protect your data, please see our 
                  <Link to="/help/data-security" className="text-primary hover:underline mx-1">Data Security Guide</Link> 
                  or contact us at <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a>.
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

export default Privacy;
