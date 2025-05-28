
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, Zap, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us - Droplink</title>
        <meta name="description" content="Learn about Droplink's mission to empower creators on Pi Network with powerful link-in-bio tools and monetization features." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Droplink
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're building the future of creator economy on Pi Network. Droplink empowers creators, 
              entrepreneurs, and businesses to monetize their audience and drive Pi Network adoption.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link to="/signup" className="flex items-center gap-2">
                Join Our Mission <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We believe in the power of Pi Network to revolutionize the digital economy. 
                  Droplink bridges the gap between creators and their audience by providing 
                  powerful tools that work seamlessly within the Pi ecosystem.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform enables creators to build their brand, monetize their content, 
                  and contribute to Pi Network's mass adoption through innovative features 
                  like Pi payments, custom domains, and community building tools.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-2xl mb-2">10,000+</h3>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-2xl mb-2">50+</h3>
                  <p className="text-gray-600">Countries</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-2xl mb-2">100π+</h3>
                  <p className="text-gray-600">Processed</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-2xl mb-2">99%</h3>
                  <p className="text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Community First</h3>
                <p className="text-gray-600">
                  We prioritize the Pi Network community and work to create tools that 
                  benefit everyone in the ecosystem.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to provide cutting-edge features that 
                  help creators succeed in the Pi economy.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in open communication and transparency in everything 
                  we do, from pricing to development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Built by Pi Pioneers</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team consists of Pi Network early adopters, blockchain enthusiasts, 
              and experienced developers who are passionate about building the future 
              of decentralized creator economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/careers">Join Our Team</Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
