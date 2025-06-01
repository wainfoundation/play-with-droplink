
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Privacy Policy - Play with Droplink</title>
        <meta name="description" content="Learn about how Play with Droplink protects your privacy and handles your data." />
      </Helmet>
      
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Game
            </Button>
            <nav className="flex items-center gap-6">
              <Link 
                to="/help" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <p className="text-gray-700">
              At Play with Droplink, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our pet care gaming platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Pi Network Authentication Data</h3>
                  <p className="text-gray-700">
                    When you authenticate through Pi Network, we receive your Pi Network username, display name, and profile information that you have made available through the Pi SDK.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Game Progress and Pet Data</h3>
                  <p className="text-gray-700">
                    We store your pet's status, level, happiness, hunger, cleanliness levels, game scores, achievements, and in-game purchases to provide a continuous gaming experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Usage Analytics</h3>
                  <p className="text-gray-700">
                    We collect anonymized data about game usage, feature popularity, and performance metrics to improve our gaming platform.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain your pet care gaming experience</li>
                <li>Save your game progress and pet status across sessions</li>
                <li>Process Pi cryptocurrency transactions for in-game purchases</li>
                <li>Improve our games and develop new features</li>
                <li>Ensure fair play and prevent cheating</li>
                <li>Provide customer support when needed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pi Network Integration</h2>
              <p className="text-gray-700 mb-4">
                Our platform integrates with Pi Network for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Authentication:</strong> Secure login without storing passwords</li>
                <li><strong>Payments:</strong> Pi cryptocurrency transactions for premium features</li>
                <li><strong>Identity:</strong> Username and profile information for personalization</li>
              </ul>
              <p className="text-gray-700 mt-4">
                All Pi Network data is handled according to Pi Network's privacy policies and terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Encrypted data transmission using HTTPS</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Game analytics and improvement</li>
                <li>Research on gaming behavior and preferences</li>
                <li>Marketing our gaming platform (without personal identifiers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal data stored in our systems</li>
                <li>Request correction of inaccurate information</li>
                <li>Delete your account and associated game data</li>
                <li>Export your game progress and pet data</li>
                <li>Opt out of analytics data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700">
                Our gaming platform is designed to be family-friendly. We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Local Storage</h2>
              <p className="text-gray-700">
                We use browser local storage to save your game preferences, character selection, and progress. This data remains on your device and helps provide a seamless gaming experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. We will notify users of significant changes through in-game notifications or the Pi Network messaging system.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or how we handle your data, please contact us through the in-game support system or Pi Network messaging.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
