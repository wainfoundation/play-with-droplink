import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy - Droplink</title>
        <meta name="description" content="Read our Privacy Policy to understand how we handle your data on Droplink." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
              
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. It is Droplink's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://droplink.space" className="text-blue-500 hover:underline">https://droplink.space</a>, and other sites we own and operate.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>
                  <strong>Information you directly provide to us:</strong> This includes your email address, username, and any other information you choose to provide when you register, create a profile, or contact us.
                </li>
                <li>
                  <strong>Automatically collected information:</strong> We automatically collect certain information when you visit our website, such as your IP address, browser type, operating system, referring URLs, and browsing behavior.
                </li>
                <li>
                  <strong>Information from third parties:</strong> We may receive information about you from third-party services, such as Pi Network, when you use their services in connection with our platform.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>
                  Providing, maintaining, and improving our services.
                </li>
                <li>
                  Personalizing your experience on our platform.
                </li>
                <li>
                  Communicating with you, including responding to your inquiries and providing customer support.
                </li>
                <li>
                  Sending you updates, newsletters, and promotional materials (you can opt-out at any time).
                </li>
                <li>
                  Analyzing usage trends and patterns to optimize our platform.
                </li>
                <li>
                  Preventing fraud, abuse, and other prohibited activities.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sharing Your Information</h2>
              <p className="text-gray-700 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>
                  <strong>Service providers:</strong> We share information with third-party service providers who help us operate, maintain, and improve our platform (e.g., hosting providers, analytics providers, email marketing providers).
                </li>
                <li>
                  <strong>Pi Network:</strong> We may share information with Pi Network to facilitate your use of their services in connection with our platform.
                </li>
                <li>
                  <strong>Legal authorities:</strong> We may disclose information to legal authorities if required by law or legal process.
                </li>
                <li>
                  <strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, so we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>
                  <strong>Access:</strong> You have the right to access the information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> You have the right to correct any inaccurate or incomplete information we hold about you.
                </li>
                <li>
                  <strong>Deletion:</strong> You have the right to request the deletion of your information, subject to certain exceptions.
                </li>
                <li>
                  <strong>Opt-out:</strong> You have the right to opt-out of receiving marketing communications from us.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@droplink.space" className="text-blue-500 hover:underline">support@droplink.space</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Privacy;
