
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts = {
    "maximize-droplink-profile": {
      title: "How to Maximize Your Droplink Profile",
      content: `
        <p>Your Droplink profile is your digital business card on the Pi Network. Here's how to make it work harder for you.</p>
        
        <h2>1. Choose the Right Template</h2>
        <p>Your template sets the first impression. Free users get access to our basic template, but upgrading to Starter (10π/month) unlocks 20+ professional designs that can increase click-through rates by up to 40%.</p>
        
        <h2>2. Optimize Your Bio</h2>
        <p>Keep it concise but compelling. Include:</p>
        <ul>
          <li>What you do in one clear sentence</li>
          <li>Your unique value proposition</li>
          <li>A call-to-action</li>
        </ul>
        
        <h2>3. Strategic Link Placement</h2>
        <p>Free users get 1 link, so make it count! Pro users (15π/month) get unlimited links and can use our analytics to see which perform best.</p>
        
        <h2>4. Enable Pi Tips</h2>
        <p>Pi Network integration is seamless with paid plans. Users can tip you directly, and you can withdraw earnings immediately.</p>
        
        <h2>5. Use QR Codes</h2>
        <p>Available with Starter plans and above. QR codes increase offline-to-online conversion by 30%.</p>
        
        <p>Ready to upgrade? <a href="/pricing" class="text-primary hover:underline">Check our pricing plans</a> and start maximizing your potential today!</p>
      `,
      author: "Jane Doe",
      date: "May 15, 2025",
      readTime: "5 min read",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    "pi-network-integration-guide": {
      title: "Pi Network Integration: What You Need to Know",
      content: `
        <p>Droplink's Pi Network integration is revolutionary for creators. Here's everything you need to know about earning Pi through your content.</p>
        
        <h2>Understanding Pi Domains</h2>
        <p><strong>Important:</strong> Free users cannot access .pi domain integration. This feature requires at least a Starter plan (10π/month) to ensure quality and prevent spam.</p>
        
        <h2>Setting Up Pi Payments</h2>
        <p>With paid plans, you can:</p>
        <ul>
          <li>Receive tips directly in Pi</li>
          <li>Sell digital products for Pi</li>
          <li>Withdraw earnings immediately</li>
          <li>Track all transactions in real-time</li>
        </ul>
        
        <h2>Maximizing Pi Earnings</h2>
        <p>Our data shows creators on Premium plans (22π/month) earn 300% more than those on basic plans, thanks to advanced features like:</p>
        <ul>
          <li>Digital store integration</li>
          <li>Booking systems</li>
          <li>Advanced analytics</li>
          <li>Custom automation</li>
        </ul>
        
        <h2>Best Practices</h2>
        <p>1. <strong>Engage your community:</strong> Regular updates keep followers active
        2. <strong>Use analytics:</strong> Understand what content performs best
        3. <strong>Diversify income streams:</strong> Tips, products, and services
        4. <strong>Stay consistent:</strong> Regular posting increases earnings by 60%</p>
        
        <p>The Pi Network creator economy is booming. <a href="/signup" class="text-primary hover:underline">Join thousands of creators</a> already earning Pi with Droplink!</p>
      `,
      author: "John Smith",
      date: "May 10, 2025",
      readTime: "7 min read",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1616077168712-fc6c79cd8133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    "creators-tripled-audience": {
      title: "5 Creators Who Tripled Their Audience with Droplink",
      content: `
        <p>Real success stories from real creators who transformed their Pi Network presence with Droplink.</p>
        
        <h2>1. Sarah Chen - Content Creator</h2>
        <p>Started with 200 followers, now has 2,500+ and earns 500π monthly. Her secret? Upgrading to Pro for unlimited links and analytics.</p>
        <blockquote>"The analytics showed me exactly what content my audience wanted. Game-changer!" - Sarah</blockquote>
        
        <h2>2. Marcus Rodriguez - Digital Artist</h2>
        <p>Grew from 500 to 8,900 followers in 6 months using Premium's digital store features.</p>
        <blockquote>"Selling my art directly for Pi has been incredible. No middleman, instant payments." - Marcus</blockquote>
        
        <h2>3. Emily Watson - Entrepreneur</h2>
        <p>Leveraged QR codes and custom domains to grow her business by 300%.</p>
        <blockquote>"The professional appearance with custom domains built immediate trust with clients." - Emily</blockquote>
        
        <h2>4. David Kim - Tech Influencer</h2>
        <p>Used advanced themes and Pi domain integration to stand out in the crowded tech space.</p>
        <blockquote>"My .pi domain makes me memorable. People find me instantly on Pi Network." - David</blockquote>
        
        <h2>5. Lisa Park - Musician</h2>
        <p>The booking system and tip features created multiple revenue streams for her music career.</p>
        <blockquote>"I book gigs directly through my Droplink profile. It's my entire business in one place." - Lisa</blockquote>
        
        <h2>Common Success Factors</h2>
        <ul>
          <li>All upgraded from free plans within their first month</li>
          <li>Used analytics to optimize content strategy</li>
          <li>Integrated multiple revenue streams</li>
          <li>Maintained consistent posting schedules</li>
          <li>Engaged actively with their communities</li>
        </ul>
        
        <p><a href="/pricing" class="text-primary hover:underline">Ready to write your success story?</a> Join these creators and thousands of others growing with Droplink.</p>
      `,
      author: "Anna Taylor",
      date: "May 5, 2025",
      readTime: "6 min read",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <article className="container mx-auto py-8 px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex gap-3 mb-8">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>
          </header>
          
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.8',
            }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-gray-600 mb-4">
                Join thousands of creators building their success on Pi Network with Droplink.
              </p>
              <div className="flex gap-3">
                <Link to="/signup">
                  <Button>Start Free</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline">View Plans</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
