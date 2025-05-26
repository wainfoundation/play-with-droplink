import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CommunityLove from "@/components/CommunityLove";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Maximize Your Droplink Profile",
      excerpt: "Learn the top strategies for optimizing your Droplink profile to get more clicks, engagement, and Pi earnings.",
      author: "Jane Doe",
      date: "May 15, 2025",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "maximize-droplink-profile",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Pi Network Integration: What You Need to Know",
      excerpt: "A comprehensive guide to integrating Pi Network payments with your Droplink account and maximizing your earnings.",
      author: "John Smith",
      date: "May 10, 2025",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1616077168712-fc6c79cd8133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "pi-network-integration-guide",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "5 Creators Who Tripled Their Audience with Droplink",
      excerpt: "Discover how these 5 creators used Droplink to triple their audience and significantly increase their Pi earnings.",
      author: "Anna Taylor",
      date: "May 5, 2025",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "creators-tripled-audience",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Introducing New Analytics Features",
      excerpt: "Explore our new analytics dashboard that helps you understand your audience better and optimize your content.",
      author: "Mark Wilson",
      date: "April 28, 2025",
      category: "Product Updates",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "new-analytics-features",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "The Future of Creator Economy on Pi Network",
      excerpt: "Our thoughts on how the creator economy is evolving on Pi Network and what it means for digital entrepreneurs.",
      author: "Sarah Johnson",
      date: "April 20, 2025",
      category: "Insights",
      image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "future-creator-economy-pi",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Custom Themes: Showcase Your Brand Identity",
      excerpt: "Learn how to use custom themes to create a unique brand identity that resonates with your audience.",
      author: "David Brown",
      date: "April 15, 2025",
      category: "Design",
      image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "custom-themes-brand-identity",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">The Droplink Blog</h1>
              <p className="text-xl text-gray-600">
                Insights, updates, and tips to help you grow your online presence with Pi Network
              </p>
            </header>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <button className="px-4 py-2 bg-primary text-white rounded-full">All Posts</button>
              <button className="px-4 py-2 hover:bg-muted rounded-full transition-colors">Tips & Tricks</button>
              <button className="px-4 py-2 hover:bg-muted rounded-full transition-colors">Tutorials</button>
              <button className="px-4 py-2 hover:bg-muted rounded-full transition-colors">Success Stories</button>
              <button className="px-4 py-2 hover:bg-muted rounded-full transition-colors">Product Updates</button>
              <button className="px-4 py-2 hover:bg-muted rounded-full transition-colors">Insights</button>
            </div>
            
            {/* Featured Post */}
            <div className="mb-16 bg-muted rounded-xl overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Featured post" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <span className="text-sm font-semibold text-primary mb-2">FEATURED POST</span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Droplink Pro: Unlocking Premium Features for Pi Network Creators
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Discover how Droplink Pro is helping creators maximize their presence on Pi Network with advanced analytics, 
                    custom themes, and seamless product selling capabilities.
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center mr-3">
                      <span className="text-white font-bold">MT</span>
                    </div>
                    <div>
                      <p className="font-semibold">Michael Thompson</p>
                      <p className="text-sm text-gray-500">May 18, 2025 • 6 min read</p>
                    </div>
                  </div>
                  <Link 
                    to="/blog/droplink-pro-premium-features" 
                    className="text-primary font-semibold hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <article key={post.id} className="bg-background rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <Link to={`/blog/${post.slug}`}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-primary">{post.category}</span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">{post.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">{post.author}</span>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-primary text-sm font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Load More Articles
              </button>
            </div>
            
            <div className="mt-20 bg-muted rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-6">Get the latest Droplink news, tips, and updates delivered to your inbox</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <CommunityLove />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
