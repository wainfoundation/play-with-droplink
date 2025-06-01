
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Terms = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Terms of Service - Play with Droplink</title>
        <meta name="description" content="Read the terms and conditions for using Play with Droplink gaming platform." />
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
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="flex items-center gap-2 text-primary font-medium"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <p className="text-gray-700">
              Welcome to Play with Droplink! These terms of service ("Terms") govern your use of our gaming platform. By accessing or using Play with Droplink, you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By using Play with Droplink, you agree to these Terms, our Privacy Policy, and any additional terms applicable to specific games or features within our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700">
                Play with Droplink provides an interactive gaming platform featuring pet care simulation, mini-games, and Pi Network integration for a fun and rewarding gaming experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You must authenticate through Pi Network to access our gaming platform. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Maintaining the security of your Pi Network account</li>
                <li>All gaming activities that occur under your account</li>
                <li>Ensuring fair play and following game rules</li>
                <li>Not sharing your account with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Gaming Conduct</h2>
              <p className="text-gray-700 mb-4">
                While using our gaming platform, you agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use cheats, hacks, or exploits to gain unfair advantages</li>
                <li>Attempt to manipulate game scores or progress artificially</li>
                <li>Disrupt the gaming experience for other players</li>
                <li>Use automated tools or bots to play games</li>
                <li>Reverse engineer or attempt to extract game code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Pi Network Integration</h2>
              <p className="text-gray-700 mb-4">
                Our platform integrates with Pi Network for authentication and payments. All Pi-based transactions are subject to Pi Network's terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700">
                All games, graphics, sounds, and other content on our platform are protected by intellectual property laws. You may not copy, distribute, or create derivative works based on our gaming content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700">
                Play with Droplink is provided "as is" without warranties. We are not liable for any damages arising from your use of our gaming platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms, please contact us through the in-game support system or Pi Network messaging.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
