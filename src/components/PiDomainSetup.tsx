
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, Settings, Globe, CheckCircle, ArrowRight, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PiDomainVerification from './PiDomainVerification';
import PiDomainSetupGuide from './PiDomainSetupGuide';

const PiDomainSetup = () => {
  const [activeTab, setActiveTab] = useState("verify");

  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Droplink Profile',
      description: 'Sign up for free and personalize your profile with your content, links, and Pi payment options.',
      detail: 'Takes less than 2 minutes'
    },
    {
      icon: Settings,
      title: 'Configure DNS Settings',
      description: 'Add the validation TXT record to your .pi domain DNS settings using your domain provider.',
      detail: 'One-time setup'
    },
    {
      icon: Globe,
      title: 'Verify Your Domain',
      description: 'Use our verification tool to confirm your domain is properly configured and connected.',
      detail: 'Instant validation'
    },
    {
      icon: CheckCircle,
      title: 'Go Live',
      description: 'Your domain is now connected and ready to use. Share your memorable .pi URL with your audience.',
      detail: 'Live immediately'
    }
  ];

  const handleVerificationComplete = (domain: string) => {
    console.log('Domain verified:', domain);
    // You can add additional logic here, like updating user profile
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Connect Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">.pi Domain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect your Pi domain to Droplink and start building your presence in the Pi Network ecosystem.
          </p>
        </div>

        {/* Domain Verification Tabs */}
        <div className="mb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="verify" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Verify Domain
              </TabsTrigger>
              <TabsTrigger value="setup" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Setup Guide
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="verify" className="mt-8">
              <PiDomainVerification onVerificationComplete={handleVerificationComplete} />
            </TabsContent>
            
            <TabsContent value="setup" className="mt-8">
              <PiDomainSetupGuide />
            </TabsContent>
          </Tabs>
        </div>

        {/* Steps Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-primary/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="bg-primary/10 text-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center mt-4">
                <step.icon size={32} />
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{step.description}</p>
              <div className="text-xs text-primary font-medium bg-primary/10 rounded-full px-3 py-1 inline-block">
                {step.detail}
              </div>
            </Card>
          ))}
        </div>

        {/* Live Example */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">See It in Action</h3>
            <p className="text-lg text-muted-foreground">Here's how your connected .pi domain will work:</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="bg-primary/10 text-primary rounded-xl p-4 mb-4">
                    <Globe size={32} className="mx-auto" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Your .pi Domain</h4>
                  <div className="bg-primary text-white rounded-lg px-4 py-2 font-mono text-sm">
                    demo.pi
                  </div>
                </div>
                
                <div className="text-center">
                  <ArrowRight size={32} className="mx-auto text-muted-foreground mb-6" />
                  <p className="text-sm text-muted-foreground">Automatically redirects to</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-secondary/10 text-secondary rounded-xl p-4 mb-4">
                    <CheckCircle size={32} className="mx-auto" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Your Droplink Profile</h4>
                  <div className="bg-secondary text-white rounded-lg px-4 py-2 font-mono text-sm">
                    droplink.space/@demo
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                  <Link to="/demo" className="flex items-center gap-2">
                    Try Live Demo <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the Pi Network revolution. Connect your .pi domain today and start building your digital presence in the Pi ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform text-lg px-10 py-4">
              <Link to="/signup">Connect Your .pi Domain</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors text-lg px-10 py-4">
              <Link to="/features">Explore All Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainSetup;
