
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Droplink</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl mb-6">
                Droplink is a community-powered platform built for creators on Pi Network, making it easier to share content, sell products, and connect with your audience.
              </p>
              
              <div className="my-12 bg-muted rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-4">
                  To empower creators with tools that simplify their digital presence while fostering a 
                  thriving ecosystem within the Pi Network community.
                </p>
                <p>
                  We believe that every creator deserves a professional online presence without technical barriers or high costs.
                  By leveraging the power of Pi Network, we're making it possible for anyone to monetize their content, 
                  showcase their work, and build meaningful connections.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Our Story</h2>
              <p className="mb-4">
                Droplink began in 2023 when a group of Pi enthusiasts recognized the need for better tools to help creators 
                thrive in the emerging Pi economy. We noticed that while social platforms were becoming increasingly 
                fragmented, there wasn't an easy way for Pi Network members to unify their online presence.
              </p>
              <p className="mb-4">
                Starting with a simple link-sharing tool, we've grown to offer a comprehensive platform that helps 
                thousands of creators showcase their work, engage their audiences, and earn Pi cryptocurrency through 
                a unified digital presence.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Community First</h3>
                  <p>We build for the Pi community, with the community. Your feedback shapes our platform.</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Accessibility</h3>
                  <p>Everyone deserves access to powerful tools, regardless of technical skill or budget.</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Innovation</h3>
                  <p>We're constantly exploring new ways to help creators connect, share, and earn.</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-2">Transparency</h3>
                  <p>We believe in honest communication and open collaboration with our community.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Meet The Team</h2>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">JD</span>
                  </div>
                  <h3 className="text-xl font-semibold">Jane Doe</h3>
                  <p className="text-muted-foreground">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">JS</span>
                  </div>
                  <h3 className="text-xl font-semibold">John Smith</h3>
                  <p className="text-muted-foreground">CTO</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">AT</span>
                  </div>
                  <h3 className="text-xl font-semibold">Anna Taylor</h3>
                  <p className="text-muted-foreground">Head of Community</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold mb-6">Join Our Journey</h2>
                <p className="mb-8">
                  We're just getting started, and we'd love for you to be part of our story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/signup">Create Your Droplink</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link to="/careers">Join Our Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
