import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const GroupChat = () => {
  return (
    <>
      <Helmet>
        <title>Group Chat - Droplink</title>
        <meta name="description" content="Engage in real-time conversations with members of your groups on Droplink." />
      </Helmet>
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Group Chat</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Connect with other members of your group in real-time.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Chat Area</h2>
              <p>This is where the group chat messages would appear.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTop />
    </>
  );
};

export default GroupChat;
