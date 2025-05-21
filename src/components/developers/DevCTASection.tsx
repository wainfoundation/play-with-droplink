
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DevCTASection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-hero text-white rounded-xl p-8 md:p-10 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our developer community and start integrating Pi Network payments into your applications today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup?developer=true" className="flex items-center gap-2">
                  Create Developer Account <ArrowRight size={16} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <a href="https://github.com/droplink" target="_blank" rel="noopener noreferrer">
                  View Sample Projects
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevCTASection;
