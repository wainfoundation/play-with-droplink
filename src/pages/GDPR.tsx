
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const GDPR = () => {
  const [dataRequestType, setDataRequestType] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally connect to a backend service
    console.log("GDPR request submitted:", {
      type: dataRequestType,
      email,
      message
    });
    
    toast({
      title: "Request Submitted",
      description: "We'll process your request within 30 days as required by GDPR."
    });
    
    // Reset form
    setDataRequestType(null);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">GDPR Compliance</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: May 21, 2025</p>
              
              <div className="my-8 p-4 bg-muted rounded-lg text-sm">
                <p className="font-medium">Summary:</p>
                <p>
                  This GDPR Policy explains how Droplink collects, uses, and protects your personal data in accordance with the General Data Protection Regulation (GDPR). 
                  We collect only necessary information, process it lawfully, and respect your rights to access, correct, delete, and port your data. 
                  You may withdraw consent at any time, and we maintain appropriate security measures to protect your information.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                At Droplink, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This General Data Protection Regulation (GDPR) Policy outlines how we collect, process, and handle personal data 
                of European Union (EU) residents and citizens in compliance with the GDPR.
              </p>
              <p>
                The GDPR is a regulation that requires businesses to protect the personal data and privacy of EU citizens for transactions that occur within EU member states. 
                This policy applies to all our operations, including our website, products, and services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Controller</h2>
              <p>
                For the purposes of the GDPR, Droplink Inc. is the data controller responsible for your personal information. 
                If you have any questions about this policy or our data practices, please contact us at:
              </p>
              <p>
                <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a><br />
                Droplink Inc.<br />
                1234 Privacy Lane<br />
                San Francisco, CA 94105<br />
                USA
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Principles of Data Processing</h2>
              <div className="space-y-4 mt-6">
                <p>We process personal data in accordance with the following principles:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Lawfulness, fairness, and transparency</strong>: We process data lawfully, fairly, and in a transparent manner.</li>
                  <li><strong>Purpose limitation</strong>: We collect data for specified, explicit, and legitimate purposes.</li>
                  <li><strong>Data minimization</strong>: We limit data collection to what is necessary for the purposes for which it is processed.</li>
                  <li><strong>Accuracy</strong>: We take reasonable steps to ensure personal data is accurate and kept up to date.</li>
                  <li><strong>Storage limitation</strong>: We keep data for no longer than necessary for the purposes for which it is processed.</li>
                  <li><strong>Integrity and confidentiality</strong>: We process data in a manner that ensures appropriate security.</li>
                  <li><strong>Accountability</strong>: We are responsible for and can demonstrate compliance with these principles.</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Types of Data We Collect</h2>
              <p>We may collect the following personal data from you:</p>
              <div className="space-y-4 mt-6">
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Account Data</h3>
                  <p>
                    Information you provide when you create an account with us, such as your name, email address, username, and profile picture.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Profile Data</h3>
                  <p>
                    Information you add to your public profile, such as biography, social media links, and other content you choose to share.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Usage Data</h3>
                  <p>
                    Information about how you use our website, products, and services, including links you create, clicks, views, and engagement metrics.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Technical Data</h3>
                  <p>
                    Information about your device, browser, IP address, time zone, and cookies when you visit our website.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Transaction Data</h3>
                  <p>
                    Information related to payments and transactions you make on our platform, including Pi cryptocurrency transactions.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Legal Basis for Processing</h2>
              <p>We process your personal data based on one or more of the following legal grounds:</p>
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Consent</h3>
                  <p>Where you have given us explicit consent to process your data for specific purposes.</p>
                </div>
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Contractual Necessity</h3>
                  <p>Where processing is necessary to fulfill our contractual obligations to you.</p>
                </div>
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Legal Obligation</h3>
                  <p>Where processing is necessary for compliance with legal obligations.</p>
                </div>
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Legitimate Interests</h3>
                  <p>Where processing is necessary for our legitimate interests, provided they do not override your rights and interests.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights Under GDPR</h2>
              <p>As an EU citizen or resident, you have the following rights regarding your personal data:</p>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Access</h3>
                  <p>You have the right to request a copy of the personal information we hold about you.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Rectification</h3>
                  <p>You have the right to request that we correct any inaccurate or incomplete personal information about you.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Erasure (Right to be Forgotten)</h3>
                  <p>You have the right to request the deletion of your personal data when it is no longer necessary for the purposes for which it was collected.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Restrict Processing</h3>
                  <p>You have the right to request that we restrict the processing of your personal data under certain circumstances.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Data Portability</h3>
                  <p>You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Right to Object</h3>
                  <p>You have the right to object to the processing of your personal data in certain circumstances.</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Rights Related to Automated Decision-Making</h3>
                  <p>You have the right not to be subject to a decision based solely on automated processing that produces legal effects concerning you.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Exercising Your Rights</h2>
              <p>
                To exercise any of your rights regarding your personal data, please submit a request through our data subject request form below or contact us at <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a>.
              </p>
              <p>
                We will respond to your request within 30 days. In some cases, we may need to verify your identity before processing your request.
              </p>
              
              <div className="p-6 mt-8 bg-muted rounded-lg">
                <h3 className="text-xl font-bold mb-4">Data Subject Request Form</h3>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Request Type</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="access" 
                          name="requestType" 
                          className="mr-2" 
                          checked={dataRequestType === 'access'} 
                          onChange={() => setDataRequestType('access')}
                        />
                        <label htmlFor="access">Access my data</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="rectification" 
                          name="requestType" 
                          className="mr-2" 
                          checked={dataRequestType === 'rectification'} 
                          onChange={() => setDataRequestType('rectification')}
                        />
                        <label htmlFor="rectification">Correct my data</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="erasure" 
                          name="requestType" 
                          className="mr-2" 
                          checked={dataRequestType === 'erasure'} 
                          onChange={() => setDataRequestType('erasure')}
                        />
                        <label htmlFor="erasure">Delete my data</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="portability" 
                          name="requestType" 
                          className="mr-2" 
                          checked={dataRequestType === 'portability'} 
                          onChange={() => setDataRequestType('portability')}
                        />
                        <label htmlFor="portability">Export my data</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="restriction" 
                          name="requestType" 
                          className="mr-2" 
                          checked={dataRequestType === 'restriction'} 
                          onChange={() => setDataRequestType('restriction')}
                        />
                        <label htmlFor="restriction">Restrict processing of my data</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Details of Your Request</label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      rows={4} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" disabled={!dataRequestType || !email}>Submit Request</Button>
                </form>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, 
                including encryption of personal data, regular security assessments, and secure access controls.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Data Transfers</h2>
              <p>
                We may transfer your personal data to countries outside the European Economic Area (EEA). 
                When we do so, we ensure that appropriate safeguards are in place to protect your data, 
                such as Standard Contractual Clauses approved by the European Commission.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Data Breach Notification</h2>
              <p>
                In the event of a personal data breach, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, 
                where feasible. If the breach is likely to result in a high risk to your rights and freedoms, 
                we will notify you without undue delay.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Data Protection Officer</h2>
              <p>
                We have appointed a Data Protection Officer (DPO) responsible for overseeing our data protection strategy and implementation. 
                You can contact our DPO at <a href="mailto:dpo@droplink.io" className="text-primary hover:underline">dpo@droplink.io</a>.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">12. Complaints</h2>
              <p>
                If you have concerns about how we process your personal data, please contact us at <a href="mailto:privacy@droplink.io" className="text-primary hover:underline">privacy@droplink.io</a>. 
                You also have the right to lodge a complaint with a supervisory authority in the EU member state where you reside, work, or where an alleged infringement of the GDPR has occurred.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to This Policy</h2>
              <p>
                We may update this GDPR Policy from time to time. The date at the top of this policy indicates when it was last updated. 
                We will notify you of any material changes to this policy as required by law.
              </p>
              
              <div className="mt-12 p-4 border border-muted rounded-lg">
                <p className="font-medium mb-2">For more information about how we protect your data, please see our:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;
