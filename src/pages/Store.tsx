import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const Store = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Store - Droplink</title>
        <meta name="description" content="Explore and purchase digital products, templates, and resources to enhance your Droplink experience." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Droplink Store</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Discover a variety of digital products, templates, and resources to enhance your Droplink experience.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example Product Card */}
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Product Title</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the product goes here.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">10 Pi</span>
                    <button className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              {/* End Example Product Card */}

              {/* Add more product cards here */}
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Product Title</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the product goes here.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">15 Pi</span>
                    <button className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Product Title</h3>
                  <p className="text-gray-600 mb-4">
                    Short description of the product goes here.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">20 Pi</span>
                    <button className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Store;
