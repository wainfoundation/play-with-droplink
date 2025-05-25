
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const PiDomainTestimonials = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Pi Network Pioneer",
      domain: "alexchen.pi",
      content: "Connecting my .pi domain to Droplink was a game-changer. I went from scattered links to a professional hub that actually converts. My Pi tips increased 300% in the first month!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "127π earned",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Content Creator",
      domain: "maria.pi",
      content: "The seamless integration between my .pi domain and Droplink has revolutionized how I share content. Pi Browser users love the instant access, and I love the built-in analytics.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "89π earned",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Digital Entrepreneur",
      domain: "davidkim.pi",
      content: "Droplink made my .pi domain actually useful. Instead of just having a cool address, I now have a complete business platform. The Pi payment integration is absolutely perfect.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "234π earned",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Artist & Designer",
      domain: "sarahart.pi",
      content: "As an artist, presentation is everything. My .pi domain connected to Droplink gives me a beautiful, professional showcase that my clients and collectors love. The portfolio features are incredible.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "156π earned",
      rating: 5
    },
    {
      name: "Mike Thompson",
      role: "Tech Reviewer",
      domain: "mikereview.pi",
      content: "I've tried every link-in-bio tool out there. Droplink's .pi domain integration is the first that actually makes sense for Pi Network users. The setup was incredibly easy.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "78π earned",
      rating: 5
    },
    {
      name: "Jennifer Liu",
      role: "Educator",
      domain: "jenniferliu.pi",
      content: "Teaching about Pi Network is so much easier now. My .pi domain connected to Droplink serves as a one-stop resource for all my educational content and courses. Students love it!",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      earnings: "203π earned",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pi Pioneers Love Their <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">.pi Domains</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Pi Network pioneers are using their .pi domains connected to Droplink to build, grow, and earn in the Pi ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-primary/20 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote size={32} />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-mono text-primary">{testimonial.domain}</span>
                </div>
                <div className="text-sm font-bold text-green-600">
                  {testimonial.earnings}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Join 10,000+ Pi Network Pioneers</h3>
            <p className="text-muted-foreground mb-6">
              Connect your .pi domain to Droplink and start building your presence in the Pi ecosystem today.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>2,847π total earned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>156k profile visits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainTestimonials;
