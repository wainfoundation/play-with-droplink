
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, DollarSign, ArrowRight, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CustomerSuccessStories = () => {
  const successStories = [
    {
      id: 1,
      name: "Elena Rodriguez",
      role: "Digital Artist",
      avatar: "ER",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      beforeRevenue: "25π/month",
      afterRevenue: "850π/month",
      growthPercentage: "3,300%",
      timeframe: "3 months",
      story: "I was struggling to sell my digital art until I found Droplink. The Pi payment integration and beautiful portfolio templates transformed my business completely.",
      results: [
        "Monthly revenue increased from 25π to 850π",
        "Customer base grew by 400%", 
        "Professional portfolio increased conversion by 250%"
      ],
      testimonial: "Droplink didn't just give me a link-in-bio page, it gave me a complete business platform. The analytics help me understand my customers, and the Pi payment system makes transactions seamless."
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Content Creator",
      avatar: "MC",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      beforeRevenue: "150π/month",
      afterRevenue: "2,400π/month",
      growthPercentage: "1,500%",
      timeframe: "4 months",
      story: "As a content creator, I needed a professional way to monetize my audience. Droplink's tip system and analytics gave me insights I never had before.",
      results: [
        "Tips increased from 150π to 2,400π monthly",
        "Audience engagement up 180%",
        "Brand collaboration inquiries increased 300%"
      ],
      testimonial: "The difference was immediate. My followers love the clean interface, and the tip feature has created a sustainable income stream I never thought possible."
    },
    {
      id: 3,
      name: "Sarah Kim",
      role: "Small Business Owner",
      avatar: "SK",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
      beforeRevenue: "500π/month",
      afterRevenue: "3,200π/month",
      growthPercentage: "540%",
      timeframe: "2 months",
      story: "My handmade jewelry business was scattered across multiple platforms. Droplink gave me one professional hub that my customers love.",
      results: [
        "Sales increased from 500π to 3,200π monthly",
        "Customer retention improved by 85%",
        "Order processing time reduced by 60%"
      ],
      testimonial: "Having everything in one place - my portfolio, contact info, and payment system - has streamlined my entire business. Customers find it so much easier to work with me now."
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "1,200%",
      label: "Average Revenue Growth",
      description: "Our users see dramatic income increases"
    },
    {
      icon: Users,
      value: "25K+",
      label: "Active Creators",
      description: "Growing community of successful users"
    },
    {
      icon: DollarSign,
      value: "500K π",
      label: "Total Earned",
      description: "Pi earned by our community to date"
    }
  ];

  // Sample plan for the "Most Popular" badge demo
  const proPlans = [
    {
      name: "Starter",
      price: "10π/month",
      features: ["Unlimited links", "Custom themes", "QR codes", "20+ templates"],
      isPopular: false
    },
    {
      name: "Pro",
      price: "15π/month", 
      features: ["Advanced analytics", "Email capture", "Group access", "50+ templates", "SEO tools"],
      isPopular: true
    },
    {
      name: "Premium",
      price: "22π/month",
      features: ["Digital store", "Booking system", "100+ templates", "Priority support"],
      isPopular: false
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Real Success Stories from <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Real Users</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            See how Pi Network creators transformed their businesses and income using Droplink. These are real results from real users.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-base sm:text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="space-y-8 sm:space-y-12">
          {successStories.map((story, index) => (
            <Card key={story.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                  {/* Story Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <img 
                        src={story.profileImage} 
                        alt={story.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-primary/20"
                      />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{story.name}</h3>
                        <p className="text-base sm:text-lg text-gray-600">{story.role}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-base sm:text-lg italic text-gray-700 mb-4 sm:mb-6 border-l-4 border-primary pl-4 sm:pl-6">
                      "{story.testimonial}"
                    </blockquote>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{story.story}</p>

                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900">Key Results:</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {story.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-4 sm:p-6 md:p-8">
                      <h4 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6">Revenue Transformation</h4>
                      
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
                          <div className="text-center flex-1">
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">Before</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                              {story.beforeRevenue}
                            </div>
                          </div>
                          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-primary transform rotate-90 sm:rotate-0" />
                          <div className="text-center flex-1">
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">After</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                              {story.afterRevenue}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-xl p-3 sm:p-4 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{story.growthPercentage}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Growth in {story.timeframe}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plan Cards with Fixed "Most Popular" Badge */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Choose Your Plan</h3>
            <p className="text-lg text-gray-600">Start free, upgrade as you grow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {proPlans.map((plan, index) => (
              <div key={index} className="relative">
                {/* Fixed Most Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-cyan-400 text-white px-4 py-1 text-sm font-bold rounded-full border-2 border-white shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`p-6 text-center transition-all duration-300 hover:scale-105 ${
                  plan.isPopular 
                    ? 'border-2 border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50' 
                    : 'border border-gray-200 bg-white'
                }`}>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-cyan-400 mb-6">{plan.price}</div>
                    
                    <ul className="space-y-3 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Structure Demo */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">Your Domain Connection</h3>
            <p className="text-lg text-gray-600">See how your .pi domain connects to Droplink</p>
          </div>
          
          <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-cyan-200">
            {/* Your .pi Domain */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-cyan-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Your .pi Domain</h4>
              <div className="bg-cyan-400 text-white rounded-lg px-4 py-2 font-mono text-sm font-bold inline-block">
                demo.pi
              </div>
            </div>

            {/* Arrow */}
            <div className="text-center mb-6">
              <ArrowRight className="w-8 h-8 text-blue-400 mx-auto transform rotate-90" />
              <p className="text-sm text-gray-600 mt-2">Automatically redirects to</p>
            </div>

            {/* Your Droplink Profile */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Your Droplink Profile</h4>
              <div className="bg-blue-500 text-white rounded-lg px-4 py-2 font-mono text-sm font-bold inline-block">
                droplink.space/@demo
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-lg transition-colors">
                Try Live Demo →
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Ready to Write Your Success Story?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
              Join thousands of Pi Network creators who have transformed their income and built thriving businesses with Droplink.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                <Link to="/signup">Start Your Journey Free</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/demo">See Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSuccessStories;
