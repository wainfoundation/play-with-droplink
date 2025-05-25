
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, ExternalLink, Bookmark, Award, Star, Activity } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Community Forum - Droplink</title>
        <meta name="description" content="Join the Droplink community to connect with other creators, share tips, and get help with your link-in-bio page." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to the Droplink Community</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with other creators, share your experience, get help, and stay up to date with the latest Droplink features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#forums" className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  Browse Forums
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <a href="#featured" className="flex items-center gap-2">
                  <Star size={18} />
                  Featured Discussions
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-12 px-4 bg-muted">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">5,280+</p>
                <p className="text-sm text-muted-foreground">Community Members</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">12,450+</p>
                <p className="text-sm text-muted-foreground">Topics Discussed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">3,200+</p>
                <p className="text-sm text-muted-foreground">Questions Solved</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-2 text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Discussions */}
        <section className="py-16 px-4" id="featured">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Featured Discussions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">Tips for Maximizing Pi Tips</CardTitle>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Popular</span>
                  </div>
                  <CardDescription>Started by @pi_pioneer · 3 days ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">
                    I've been experimenting with different approaches to encourage Pi tips on my Droplink profile. Here's what's working for me: First, make sure your content provides real value...
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare size={14} /> 48 replies
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Activity size={14} /> 1.2k views
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ExternalLink size={14} /> View
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">Custom Domain Setup Guide</CardTitle>
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">Guide</span>
                  </div>
                  <CardDescription>Started by @techhelper · 1 week ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">
                    I've created a step-by-step guide for setting up custom domains with Droplink. This works for any domain registrar and includes screenshots for the most popular ones like GoDaddy, Namecheap, and Google Domains...
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare size={14} /> 36 replies
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Activity size={14} /> 853 views
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ExternalLink size={14} /> View
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Forum Categories */}
        <section className="py-16 px-4 bg-muted" id="forums">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Browse Our Forums</h2>
            
            <Tabs defaultValue="all" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="help">Help & Support</TabsTrigger>
                <TabsTrigger value="showcase">Showcase</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <MessageSquare size={20} />
                      </div>
                      <CardTitle>Announcements & Updates</CardTitle>
                    </div>
                    <CardDescription>Official announcements from the Droplink team</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>34 topics</span> · <span>Latest: 2 hours ago</span>
                      </div>
                      <Button variant="outline" size="sm">Browse</Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                        <Users size={20} />
                      </div>
                      <CardTitle>General Discussion</CardTitle>
                    </div>
                    <CardDescription>Chat about anything Droplink related</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>128 topics</span> · <span>Latest: 35 minutes ago</span>
                      </div>
                      <Button variant="outline" size="sm">Browse</Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                        <Bookmark size={20} />
                      </div>
                      <CardTitle>Tips & Tutorials</CardTitle>
                    </div>
                    <CardDescription>Learn how to get the most from your Droplink page</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>73 topics</span> · <span>Latest: Yesterday</span>
                      </div>
                      <Button variant="outline" size="sm">Browse</Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                        <Award size={20} />
                      </div>
                      <CardTitle>Showcase Your Page</CardTitle>
                    </div>
                    <CardDescription>Share your Droplink page and get feedback</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>92 topics</span> · <span>Latest: 5 hours ago</span>
                      </div>
                      <Button variant="outline" size="sm">Browse</Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-700 p-2 rounded-lg">
                        <Star size={20} />
                      </div>
                      <CardTitle>Feature Requests</CardTitle>
                    </div>
                    <CardDescription>Suggest new features for Droplink</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>56 topics</span> · <span>Latest: 3 days ago</span>
                      </div>
                      <Button variant="outline" size="sm">Browse</Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="announcements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <CardTitle>Droplink v2.0 Release Notes</CardTitle>
                        <CardDescription>Posted by Admin · 2 days ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">
                      We're excited to announce the release of Droplink v2.0 with improved Pi Network integration, custom domains, and more!
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">Read More</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <CardTitle>Planned Maintenance - May 25th</CardTitle>
                        <CardDescription>Posted by Admin · 1 week ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">
                      Droplink will be undergoing scheduled maintenance on May 25th from 2:00 AM to 4:00 AM UTC. Service may be intermittently unavailable during this time.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">Read More</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="help" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Help Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border-b pb-2">
                      <Link to="#" className="text-blue-600 hover:underline">How do I connect my Pi Wallet?</Link>
                      <p className="text-sm text-muted-foreground">12 replies · Updated 3 days ago</p>
                    </div>
                    <div className="border-b pb-2">
                      <Link to="#" className="text-blue-600 hover:underline">Custom domain not working correctly</Link>
                      <p className="text-sm text-muted-foreground">26 replies · Updated yesterday</p>
                    </div>
                    <div className="border-b pb-2">
                      <Link to="#" className="text-blue-600 hover:underline">How to track link clicks?</Link>
                      <p className="text-sm text-muted-foreground">8 replies · Updated 5 days ago</p>
                    </div>
                    <div>
                      <Link to="#" className="text-blue-600 hover:underline">Can't save changes to my profile</Link>
                      <p className="text-sm text-muted-foreground">15 replies · Updated today</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View All Help Topics</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="showcase" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>@creative_pioneer</CardTitle>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">New</span>
                      </div>
                      <CardDescription>Digital artist & Pi enthusiast</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        [Profile Preview]
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="ml-auto">Visit Profile</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>@tech_tutorials</CardTitle>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Featured</span>
                      </div>
                      <CardDescription>Tech educator & content creator</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        [Profile Preview]
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="ml-auto">Visit Profile</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Community Guidelines */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-lg mb-8">
              Our community thrives on respect, collaboration, and sharing knowledge. We ask all members to follow these simple guidelines:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Do's</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Be respectful and supportive to other members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Share your knowledge and experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Ask clear questions with relevant details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Use descriptive titles for your topics</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Don'ts</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Spam or post promotional content without permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Share personal information of others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Post offensive, inappropriate, or harmful content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Create multiple accounts or impersonate others</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button className="mt-8" asChild>
              <Link to="/terms">Read Full Community Guidelines</Link>
            </Button>
          </div>
        </section>
        
        {/* Join CTA */}
        <section className="py-16 px-4 bg-gradient-hero text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-xl mb-8">
              Connect with other Droplink users, share your experiences, and get help when you need it.
            </p>
            <Button size="lg" variant="secondary">
              Create Account & Join
            </Button>
            <p className="mt-4 text-sm">
              Already have an account? <Link to="/login" className="underline">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
