
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Globe, Coins, Zap, Users, Shield } from 'lucide-react';

const PiDomainFeatures = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Connect Your .pi Domain?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your Pi Network identity into a powerful business tool. Make your .pi domain work for you with professional features and Pi-native integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">One Memorable URL</h3>
            <p className="text-muted-foreground mb-4">
              Replace complex links with a clean, shareable address. Your .pi domain redirects seamlessly to your Droplink profile.
            </p>
            <div className="bg-muted/50 rounded-lg p-3 text-sm font-mono">
              yourname.pi → droplink.space/@yourname
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-secondary/10 text-secondary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Coins size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Pi Payments Ready</h3>
            <p className="text-muted-foreground mb-4">
              Accept Pi cryptocurrency payments directly through your domain. Monetize content, services, and products with native Pi integration.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check size={16} />
              <span>Instant Pi Transactions</span>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Pi Browser Optimized</h3>
            <p className="text-muted-foreground mb-4">
              Works instantly in Pi Browser with no redirects or setup. Your audience can access your content seamlessly within the Pi ecosystem.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check size={16} />
              <span>Zero Configuration</span>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-secondary/10 text-secondary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Mass Adoption Ready</h3>
            <p className="text-muted-foreground mb-4">
              Position yourself for Pi Network's mass adoption. Your .pi domain becomes a valuable digital asset as the network grows.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check size={16} />
              <span>Future-Proof Investment</span>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Secure & Reliable</h3>
            <p className="text-muted-foreground mb-4">
              Built on Pi Network's secure infrastructure with enterprise-grade reliability. Your domain and data are protected.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check size={16} />
              <span>Enterprise Security</span>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="bg-secondary/10 text-secondary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Cross-Platform Access</h3>
            <p className="text-muted-foreground mb-4">
              Your .pi domain works everywhere - Pi Browser, regular browsers, mobile apps. Reach your audience wherever they are.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check size={16} />
              <span>Universal Compatibility</span>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to Connect Your .pi Domain?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Pi Network pioneers who are already using their .pi domains to build, connect, and earn in the Pi ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform text-lg px-8 py-3">
                <Link to="/signup">Connect Your Domain</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg px-8 py-3">
                <Link to="/demo">See Live Example</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainFeatures;
