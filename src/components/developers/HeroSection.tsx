
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-muted py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Droplink Developer Platform</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Build powerful applications with our APIs and integrate Pi Network payments into your services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="#api-docs">View API Docs</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#get-started">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
