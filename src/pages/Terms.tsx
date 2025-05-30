import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service - Droplink</title>
        <meta name="description" content="Read the terms and conditions for using Droplink." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

              <div className="space-y-6">
                <p>
                  Welcome to Droplink! These terms of service ("Terms") govern your use of our website and services. By accessing or using Droplink, you agree to be bound by these Terms.
                </p>

                <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                <p>
                  By using Droplink, you agree to these Terms, our Privacy Policy, and any additional terms applicable to certain programs or services.
                </p>

                <h2 className="text-xl font-semibold">2. Description of Service</h2>
                <p>
                  Droplink provides a platform for users to create and share links, profiles, and other content. We offer both free and paid subscription plans with varying features.
                </p>

                <h2 className="text-xl font-semibold">3. User Accounts</h2>
                <p>
                  You must create an account to use certain features of Droplink. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>

                <h2 className="text-xl font-semibold">4. User Content</h2>
                <p>
                  You retain ownership of any content you submit to Droplink. However, by submitting content, you grant us a license to use, display, and distribute your content on Droplink.
                </p>

                <h2 className="text-xl font-semibold">5. Prohibited Conduct</h2>
                <p>
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc list-inside">
                  <li>Violating any laws or regulations</li>
                  <li>Infringing on the intellectual property rights of others</li>
                  <li>Distributing spam or malicious software</li>
                  <li>Interfering with the operation of Droplink</li>
                </ul>

                <h2 className="text-xl font-semibold">6. Subscription Fees</h2>
                <p>
                  Certain features of Droplink are offered on a subscription basis. You agree to pay all applicable fees for your subscription.
                </p>

                <h2 className="text-xl font-semibold">7. Termination</h2>
                <p>
                  We may terminate your access to Droplink at any time for any reason, with or without notice.
                </p>

                <h2 className="text-xl font-semibold">8. Disclaimer of Warranties</h2>
                <p>
                  Droplink is provided "as is" without any warranties, express or implied.
                </p>

                <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
                <p>
                  We will not be liable for any damages arising out of your use of Droplink.
                </p>

                <h2 className="text-xl font-semibold">10. Governing Law</h2>
                <p>
                  These Terms shall be governed by the laws of [Your Jurisdiction].
                </p>

                <h2 className="text-xl font-semibold">11. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. Your continued use of Droplink after any such changes constitutes your acceptance of the new Terms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Terms;
