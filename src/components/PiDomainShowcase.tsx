
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, CheckCircle, ExternalLink, Smartphone } from 'lucide-react';

const PiDomainShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your .pi Domain in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how your Pi Network domain transforms into a powerful business hub with Droplink
          </p>
        </div>

        {/* Demo Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Before */}
          <Card className="p-8 text-center bg-gray-50 border-2 border-gray-200">
            <div className="bg-gray-200 text-gray-500 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-600">Before Droplink</h3>
            <div className="space-y-3 text-base">
              <div className="bg-white rounded-lg p-3 border">
                <span className="font-mono text-gray-500">yourname.pi</span>
                <p className="text-sm text-gray-400 mt-2">Domain not connected</p>
              </div>
              <p className="text-gray-500">❌ No content</p>
              <p className="text-gray-500">❌ No Pi payments</p>
              <p className="text-gray-500">❌ No audience connection</p>
            </div>
          </Card>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4 shadow-lg">
              <ArrowRight size={32} className="text-white" />
            </div>
          </div>

          {/* After */}
          <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-primary">With Droplink</h3>
            <div className="space-y-3 text-base">
              <div className="bg-white rounded-lg p-3 border-2 border-primary/20">
                <span className="font-mono text-primary font-bold">yourname.pi</span>
                <p className="text-sm text-primary mt-2">✓ Fully connected</p>
              </div>
              <p className="text-green-600">✅ Professional profile</p>
              <p className="text-green-600">✅ Pi payment ready</p>
              <p className="text-green-600">✅ Engaged audience</p>
            </div>
          </Card>
        </div>

        {/* Live Example Showcase */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-primary/20 mb-16">
          <h3 className="text-2xl font-bold mb-10 text-center">Live Example</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mobile Preview */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-3xl p-3 shadow-2xl">
                  <div className="bg-white rounded-2xl overflow-hidden w-72 h-[600px]">
                    {/* Status Bar */}
                    <div className="bg-gray-900 text-white text-sm flex justify-between items-center px-6 py-2">
                      <span>9:41</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* URL Bar */}
                    <div className="bg-gray-100 px-6 py-4 border-b">
                      <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="font-mono text-lg font-bold text-primary">demo.pi</span>
                      </div>
                    </div>
                    
                    {/* Profile Content */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 h-full">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                          PD
                        </div>
                        <h4 className="text-lg font-bold mb-2">Pi Developer</h4>
                        <p className="text-sm text-gray-600 mb-4">Building the future of Pi Network</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl px-4 py-3 text-center font-medium">
                          🚀 My Pi App
                        </div>
                        <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-center">
                          💰 Tip me in Pi
                        </div>
                        <div className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-center">
                          📱 Download App
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating indicators */}
                <div className="absolute -right-8 top-20 bg-primary text-white rounded-full px-3 py-1 text-sm font-medium shadow-lg">
                  Your .pi domain!
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-xl p-3 flex-shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Custom .pi Domain</h4>
                  <p className="text-base text-muted-foreground">Your memorable Pi Network address that redirects to your Droplink profile</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 text-secondary rounded-xl p-3 flex-shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Mobile Optimized</h4>
                  <p className="text-base text-muted-foreground">Perfect viewing experience in Pi Browser and all mobile devices</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-xl p-3 flex-shrink-0">
                  <ExternalLink size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Instant Redirect</h4>
                  <p className="text-base text-muted-foreground">Seamless connection from your .pi domain to your professional profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Connect Your .pi Domain?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Pi Network pioneers who have already connected their domains to Droplink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform text-base px-8 py-3">
              <Link to="/signup">Connect Your Domain Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-base px-8 py-3">
              <Link to="/demo">Try Live Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainShowcase;
