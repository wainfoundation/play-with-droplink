
import { 
  Link2, 
  Palette, 
  BarChart3, 
  Coins, 
  Store, 
  Users, 
  Calendar, 
  Sparkles, 
  Shield, 
  Globe, 
  Zap, 
  MessageCircle,
  Download,
  QrCode,
  Mail,
  Target,
  Crown,
  Smartphone
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Smart Link Management",
      description: "Unlimited links with scheduling, analytics, and custom animations. Perfect for creators and businesses."
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Pi Network Payments", 
      description: "Accept tips and payments in Pi cryptocurrency. Integrated Pi Wallet for seamless transactions."
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Digital Products Store",
      description: "Sell eBooks, templates, music, and courses with automatic Pi payment processing and delivery."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Paid Groups & Chat",
      description: "Create premium communities with real-time messaging, admin tools, and Pi-powered memberships."
    }
  ];

  const creatorFeatures = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "100+ Templates",
      description: "Professional designs for every niche"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Link Animations",
      description: "Eye-catching hover effects and transitions"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Generator",
      description: "Instant QR codes for offline sharing"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Capture",
      description: "Build your audience with smart forms"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Spotlight Links",
      description: "Highlight your most important content"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Creator Rewards",
      description: "Earn through our creator program"
    }
  ];

  const businessFeatures = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Booking",
      description: "Appointment scheduling with Pi payments"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Lead Forms",
      description: "Capture inquiries and contact information"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track performance and engagement"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: ".pi Domain Support",
      description: "Connect your Pi Network domain"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Badges",
      description: "Build trust with verification"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Perfect on all devices"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "0π",
      features: ["Unlimited links", "Pi Tip button", "Basic analytics", "1 template", "Community support"]
    },
    {
      name: "Starter",
      price: "10π/month",
      features: ["Custom themes", "Link animations", "QR codes", "20+ templates", "Email support"]
    },
    {
      name: "Pro", 
      price: "15π/month",
      features: ["Email capture", "Advanced analytics", "Group access", "50+ templates", "SEO tools"],
      isPopular: true
    },
    {
      name: "Premium",
      price: "22π/month",
      features: ["Digital store", "Booking system", "100+ templates", "Priority support", "Whitelabel"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30 scroll-mt-20" id="features">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Droplink combines the best of Linktree, Ko-fi, and Beacons into one powerful Pi Network-native platform
          </p>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary/10">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Creator vs Business Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Creator Tools */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Creator Tools</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creatorFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/80 rounded-xl hover:bg-white transition-colors duration-200">
                  <div className="text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Tools */}
          <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-8 border border-secondary/20">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-secondary" />
              <h3 className="text-2xl font-bold">Business Tools</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/80 rounded-xl hover:bg-white transition-colors duration-200">
                  <div className="text-secondary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Overview */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">Choose Your Plan</h3>
            <p className="text-muted-foreground text-lg">Start free, upgrade as you grow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.isPopular 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted bg-background'
              }`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6 pt-2">
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Coming Soon</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "AI Content Assistant",
              "Template Marketplace", 
              "Affiliate System",
              "Merch Integration",
              "Advanced Automations",
              "Multi-language Support"
            ].map((feature, index) => (
              <div key={index} className="bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm border border-muted">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
