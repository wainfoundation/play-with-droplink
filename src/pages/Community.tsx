
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Join Our Community</h1>
            <p className="text-xl text-muted-foreground">
              Connect with Pi Network creators and entrepreneurs worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Discord Community</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of Pi Network creators sharing tips, strategies, and success stories.
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                Join Discord
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Creator Spotlight</h2>
              <p className="text-muted-foreground mb-6">
                Get featured in our monthly creator spotlight and inspire others in the community.
              </p>
              <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <p className="text-muted-foreground">• Be respectful and supportive of fellow creators</p>
              <p className="text-muted-foreground">• Share valuable insights and experiences</p>
              <p className="text-muted-foreground">• No spam or excessive self-promotion</p>
              <p className="text-muted-foreground">• Help newcomers learn and grow</p>
            </div>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default Community;
