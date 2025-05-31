
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Privacy Policy - Play with Droplink</title>
        <meta name="description" content="Read our Privacy Policy to understand how we handle your data in Play with Droplink gaming platform." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <p className="text-gray-700">
              Your privacy is important to us. This Privacy Policy explains how Play with Droplink ("we," "our," or "us") collects, uses, and protects your information when you use our gaming platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Gaming Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Game scores and progress</li>
                    <li>Character selection and customization</li>
                    <li>Gaming preferences and statistics</li>
                    <li>In-game achievements and rewards</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Pi Network Integration</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Pi Network username and profile information</li>
                    <li>Pi payment transaction data for premium features</li>
                    <li>Pi wallet address for gaming rewards and tips</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Device type and browser information</li>
                    <li>Game performance and crash reports</li>
                    <li>Usage analytics for game improvement</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain the gaming experience</li>
                <li>Track your game progress and scores</li>
                <li>Process Pi payments for premium games and features</li>
                <li>Deliver gaming rewards and achievements</li>
                <li>Improve game performance and add new features</li>
                <li>Provide customer support for gaming issues</li>
                <li>Prevent cheating and maintain fair gameplay</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pi Network Integration</h2>
              <p className="text-gray-700 mb-4">
                Play with Droplink integrates with Pi Network to provide:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Secure authentication through Pi SDK</li>
                <li>Pi-based payments for premium games</li>
                <li>Gaming rewards distributed in Pi</li>
                <li>Tip functionality between players</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Your Pi Network data is handled according to Pi Network's own privacy policies. We only access information necessary for gaming functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your gaming data and Pi Network information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your gaming data and progress</li>
                <li>Request deletion of your gaming account</li>
                <li>Opt-out of data collection for analytics</li>
                <li>Export your game achievements and scores</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700">
                Our gaming platform integrates with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Pi Network:</strong> For authentication and payments</li>
                <li><strong>Pi Ad Network:</strong> For rewarded advertisements</li>
                <li><strong>Analytics services:</strong> For improving game performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy within the gaming platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy or our gaming platform, please contact us through the in-game support system or Pi Network messaging.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
