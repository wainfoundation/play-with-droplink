
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your Pi Network journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-bold text-primary mb-4">0π</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Unlimited links</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Pi Tip button</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Basic analytics</span>
                </li>
              </ul>
            </div>
            
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl font-bold text-primary mb-4">6π/month</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Everything in Free</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Custom themes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">QR codes</span>
                </li>
              </ul>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-primary text-white rounded-2xl p-6 shadow-lg border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 pt-4">Pro</h3>
              <div className="text-3xl font-bold mb-4">10π/month</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Everything in Starter</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Email capture</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Advanced analytics</span>
                </li>
              </ul>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-3xl font-bold text-primary mb-4">15π/month</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Digital store</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              All plans include our core features and Pi Network integration
            </p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default Pricing;
