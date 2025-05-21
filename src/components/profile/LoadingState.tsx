
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-primary">Loading profile...</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;
