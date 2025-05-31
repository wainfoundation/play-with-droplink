
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game
            </Button>
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
                Play with Droplink provides an interactive gaming platform featuring 50+ games across multiple categories including puzzles, action games, trivia, creative activities, and premium challenges. Our platform integrates with Pi Network for authentication, payments, and rewards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You must authenticate through Pi Network to access certain features of our gaming platform. You are responsible for:
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
                <li>Create multiple accounts to circumvent game limitations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Pi Network Integration</h2>
              <p className="text-gray-700 mb-4">
                Our platform integrates with Pi Network for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Authentication:</strong> Secure login through Pi SDK</li>
                <li><strong>Payments:</strong> Premium game purchases using Pi cryptocurrency</li>
                <li><strong>Rewards:</strong> Gaming achievements and tips distributed in Pi</li>
                <li><strong>Advertising:</strong> Rewarded ads through Pi Ad Network</li>
              </ul>
              <p className="text-gray-700 mt-4">
                All Pi-based transactions are subject to Pi Network's terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibled text-gray-900 mb-4">6. Subscription and Payments</h2>
              <p className="text-gray-700 mb-4">
                Our gaming platform offers different subscription tiers:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Free:</strong> Access to basic games and features</li>
                <li><strong>Starter:</strong> Additional games and features for Pi payment</li>
                <li><strong>Pro:</strong> Premium games and advanced features</li>
                <li><strong>Premium:</strong> Full access to all games and exclusive content</li>
              </ul>
              <p className="text-gray-700 mt-4">
                All payments are processed through Pi Network's payment system. Refunds are subject to Pi Network's refund policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Game Content and Scores</h2>
              <p className="text-gray-700">
                All game progress, scores, and achievements are stored securely. We reserve the right to reset or adjust scores if we detect cheating or system errors. Your gaming data belongs to you, but we retain the right to use anonymized gameplay data for platform improvement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Platform Availability</h2>
              <p className="text-gray-700">
                While we strive to maintain 24/7 availability, our gaming platform may occasionally be unavailable due to maintenance, updates, or technical issues. We are not liable for any disruption to your gaming experience during these periods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700">
                All games, graphics, sounds, and other content on our platform are protected by intellectual property laws. You may not copy, distribute, or create derivative works based on our gaming content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access to our gaming platform at any time for violations of these Terms, including but not limited to cheating, disruptive behavior, or fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700">
                Play with Droplink is provided "as is" without warranties. We are not liable for any damages arising from your use of our gaming platform, including loss of game progress or virtual rewards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700">
                We may modify these Terms at any time. Continued use of our gaming platform after changes constitutes acceptance of the new Terms. We will notify users of significant changes through in-game notifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms or our gaming platform, please contact us through the in-game support system or Pi Network messaging.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
