import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import ForumCategoryList from '@/components/forums/ForumCategoryList';
import ForumTopicList from '@/components/forums/ForumTopicList';
import ForumTopicView from '@/components/forums/ForumTopicView';
import { MessageSquare, Users, Star } from 'lucide-react';

type ViewState = 
  | { type: 'categories' }
  | { type: 'topics'; categoryId: string; categoryName: string }
  | { type: 'topic'; topicId: string; topicTitle: string };

const Forums = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'categories' });

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    setViewState({ type: 'topics', categoryId, categoryName });
  };

  const handleTopicSelect = (topicId: string, topicTitle: string) => {
    setViewState({ type: 'topic', topicId, topicTitle });
  };

  const handleBackToCategories = () => {
    setViewState({ type: 'categories' });
  };

  const handleBackToTopics = () => {
    if (viewState.type === 'topic') {
      // This shouldn't happen in normal flow, but handle gracefully
      setViewState({ type: 'categories' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Community Forums - Droplink</title>
        <meta name="description" content="Join discussions, ask questions, and connect with the Droplink community in our forums." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Community Forums</h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Connect with other creators, share knowledge, get help, and discuss everything Droplink.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5.2K+</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1.2K+</div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8.5K+</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Forum Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {viewState.type === 'categories' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Browse Forum Categories</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose a category to explore topics and join conversations
                  </p>
                </div>
                <ForumCategoryList onCategorySelect={handleCategorySelect} />
              </div>
            )}

            {viewState.type === 'topics' && (
              <ForumTopicList
                categoryId={viewState.categoryId}
                onTopicSelect={handleTopicSelect}
                onCreateTopic={() => {}}
              />
            )}

            {viewState.type === 'topic' && (
              <ForumTopicView
                topicId={viewState.topicId}
                topicTitle={viewState.topicTitle}
                onBack={handleBackToTopics}
              />
            )}
          </div>
        </section>

        {/* Community Guidelines */}
        {viewState.type === 'categories' && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
                <p className="text-lg text-muted-foreground">
                  Help us maintain a welcoming and productive community
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    Do's
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Be respectful and constructive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Search before posting to avoid duplicates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Use clear, descriptive titles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Share knowledge and help others</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                    <span className="text-2xl">❌</span>
                    Don'ts
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Post spam or promotional content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Share personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Use offensive or inappropriate language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Harass or bully other members</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Forums;
