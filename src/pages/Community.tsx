import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, ExternalLink, Bookmark, Award, Star, Activity, Search, Plus, Heart, TrendingUp } from "lucide-react";
import GoToTop from '@/components/GoToTop';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredDiscussions = [
    {
      id: 1,
      title: "Tips for Maximizing Pi Tips",
      author: "pi_pioneer",
      timeAgo: "3 days ago",
      category: "Popular",
      excerpt: "I've been experimenting with different approaches to encourage Pi tips on my Droplink profile. Here's what's working for me: First, make sure your content provides real value...",
      replies: 48,
      views: 1200,
      tags: ["tips", "monetization", "pi"]
    },
    {
      id: 2,
      title: "Custom Domain Setup Guide",
      author: "techhelper",
      timeAgo: "1 week ago",
      category: "Guide",
      excerpt: "I've created a step-by-step guide for setting up custom domains with Droplink. This works for any domain registrar and includes screenshots for the most popular ones...",
      replies: 36,
      views: 853,
      tags: ["domains", "setup", "tutorial"]
    },
    {
      id: 3,
      title: "New Template Design Trends 2024",
      author: "design_pro",
      timeAgo: "2 days ago",
      category: "Design",
      excerpt: "Let's discuss the latest design trends for link-in-bio pages. I've noticed minimalist layouts are becoming more popular...",
      replies: 24,
      views: 567,
      tags: ["design", "templates", "trends"]
    },
    {
      id: 4,
      title: "Pi Browser Integration Best Practices",
      author: "pi_developer",
      timeAgo: "5 days ago",
      category: "Technical",
      excerpt: "Sharing some insights on optimizing your Droplink page for the Pi Browser. These techniques have helped improve my page load times...",
      replies: 31,
      views: 892,
      tags: ["pi-browser", "optimization", "technical"]
    }
  ];

  const forumCategories = [
    {
      title: "Announcements & Updates",
      description: "Official announcements from the Droplink team",
      icon: MessageSquare,
      topics: 34,
      latestActivity: "2 hours ago",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "General Discussion",
      description: "Chat about anything Droplink related",
      icon: Users,
      topics: 128,
      latestActivity: "35 minutes ago",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Tips & Tutorials",
      description: "Learn how to get the most from your Droplink page",
      icon: Bookmark,
      topics: 73,
      latestActivity: "Yesterday",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Showcase Your Page",
      description: "Share your Droplink page and get feedback",
      icon: Award,
      topics: 92,
      latestActivity: "5 hours ago",
      color: "bg-orange-100 text-orange-700"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features for Droplink",
      icon: Star,
      topics: 56,
      latestActivity: "3 days ago",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Pi Network Integration",
      description: "Discuss Pi Network features and integration",
      icon: TrendingUp,
      topics: 67,
      latestActivity: "1 day ago",
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  const recentActivity = [
    {
      user: "sarah_creator",
      action: "replied to",
      topic: "How to increase engagement on my profile?",
      timeAgo: "5 minutes ago"
    },
    {
      user: "mike_designer",
      action: "created topic",
      topic: "New color scheme suggestions",
      timeAgo: "1 hour ago"
    },
    {
      user: "alex_dev",
      action: "liked",
      topic: "Pi wallet integration tutorial",
      timeAgo: "2 hours ago"
    }
  ];

  const filteredDiscussions = featuredDiscussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Community Forum - Droplink</title>
        <meta name="description" content="Join the Droplink community to connect with other creators, share tips, and get help with your link-in-bio page." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 text-gray-900 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl md:text-5xl font-bold">Welcome to the Droplink Community</h1>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Connect with other creators, share your experience, get help, and stay up to date with the latest Droplink features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2" asChild>
                <a href="#forums">
                  <MessageSquare size={18} />
                  Browse Forums
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2" asChild>
                <a href="#featured">
                  <Star size={18} />
                  Featured Discussions
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-12 px-4 bg-white border-b">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">5,280+</p>
                <p className="text-sm text-muted-foreground">Community Members</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">12,450+</p>
                <p className="text-sm text-muted-foreground">Topics Discussed</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">3,200+</p>
                <p className="text-sm text-muted-foreground">Questions Solved</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search discussions, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Discussions */}
        <section className="py-16 px-4" id="featured">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">
              {searchQuery ? `Search Results (${filteredDiscussions.length})` : 'Featured Discussions'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">{discussion.title}</CardTitle>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {discussion.category}
                      </Badge>
                    </div>
                    <CardDescription>
                      Started by @{discussion.author} · {discussion.timeAgo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 mb-4 text-sm">
                      {discussion.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare size={14} /> {discussion.replies} replies
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Activity size={14} /> {discussion.views.toLocaleString()} views
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ExternalLink size={14} /> View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {searchQuery && filteredDiscussions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No discussions found matching your search.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Forum Categories */}
        <section className="py-16 px-4 bg-muted/30" id="forums">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse Our Forums</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join conversations in different categories and connect with community members
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forumCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <category.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {category.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{category.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{category.topics} topics</span> · 
                        <span className="ml-1">Latest: {category.latestActivity}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-white transition-colors"
                        asChild
                      >
                        <Link to="/forums">Browse</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link to="/forums">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Enter Forums
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Recent Community Activity</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Latest Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                        {activity.user.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">@{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.action} </span>
                          <span className="font-medium">"{activity.topic}"</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        {/* Community Guidelines */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
              <p className="text-lg text-muted-foreground">
                Our community thrives on respect, collaboration, and sharing knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    Community Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">Be respectful and supportive to other members</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">Share your knowledge and experiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">Ask clear questions with relevant details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">Use descriptive titles for your topics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">Help others and contribute positively</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                    <span className="text-2xl">❌</span>
                    Community Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-sm">✗</span>
                      <span className="text-sm">Spam or post promotional content without permission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-sm">✗</span>
                      <span className="text-sm">Share personal information of others</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-sm">✗</span>
                      <span className="text-sm">Post offensive, inappropriate, or harmful content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-sm">✗</span>
                      <span className="text-sm">Create multiple accounts or impersonate others</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 mt-1 text-sm">✗</span>
                      <span className="text-sm">Engage in harassment or bullying behavior</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button className="mr-4" asChild>
                <Link to="/terms">Read Full Community Guidelines</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Report an Issue</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Join CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with other Droplink users, share your experiences, and get help when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                <Plus size={18} />
                Create Account & Join
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Browse as Guest
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              Already have an account? <Link to="/login" className="underline hover:no-underline">Sign in here</Link>
            </p>
          </div>
        </section>
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Community;
