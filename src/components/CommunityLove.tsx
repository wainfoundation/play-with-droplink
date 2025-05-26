
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart } from "lucide-react";

const CommunityLove = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "SC",
      rating: 5,
      text: "Droplink transformed my Pi Network presence! I've earned over 500π in tips since switching. The analytics help me understand my audience better.",
      earnings: "500π earned",
      followers: "2.5K followers"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Digital Artist",
      avatar: "MR",
      rating: 5,
      text: "The template customization is incredible. My art portfolio has never looked better, and the Pi payment integration is seamless for selling my work.",
      earnings: "1.2K π earned",
      followers: "8.9K followers"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Entrepreneur",
      avatar: "EW",
      rating: 5,
      text: "Droplink Pro gave me everything I needed to grow my business. The QR codes and analytics features have boosted my customer engagement by 300%.",
      earnings: "2.8K π earned",
      followers: "15K followers"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Influencer",
      avatar: "DK",
      rating: 5,
      text: "Started with the free plan and upgraded within a week! The Pi domain integration and custom themes make my profile stand out in the Pi Network.",
      earnings: "890π earned",
      followers: "5.7K followers"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Musician",
      avatar: "LP",
      rating: 5,
      text: "My music has reached more fans than ever! The booking system and tip features have created new revenue streams I never thought possible.",
      earnings: "650π earned",
      followers: "4.2K followers"
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Coach",
      avatar: "AT",
      rating: 5,
      text: "The Premium plan's automation features save me hours every week. My coaching business has grown 200% since using Droplink for client management.",
      earnings: "3.5K π earned",
      followers: "12K followers"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Community Love
            </h2>
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from creators thriving with Droplink. Join thousands of Pi Network users building their success stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-5">"{testimonial.text}"</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-green-600">{testimonial.earnings}</p>
                    <p className="text-xs text-gray-500">Total Earnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-blue-600">{testimonial.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start Your Success Story?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of creators earning Pi and building their audience on the most creator-friendly platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform font-semibold">
                Start Free Today
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                View Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityLove;
