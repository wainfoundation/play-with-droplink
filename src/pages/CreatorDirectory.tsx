
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CreatorDirectory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Creator Directory</h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing Pi Network creators and their content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Creator profiles would be mapped here */}
            {[1, 2, 3, 4, 5, 6].map((creator) => (
              <div key={creator} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto -mt-8 mb-4"></div>
                  <h3 className="text-lg font-bold mb-2">Creator {creator}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pi Network content creator and entrepreneur
                  </p>
                  <button className="text-primary hover:text-primary/80 font-medium">
                    Visit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Want to be featured in our directory? Contact us!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorDirectory;
