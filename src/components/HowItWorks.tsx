
const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-muted" id="how-it-works">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">How It Works</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Launch your Pi-powered presence in three easy steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="step-card" data-step="1" aria-label="Step 1">
            <div className="feature-icon group-hover:scale-110">
              👤
            </div>
            <h3 className="text-xl font-bold mb-3">Sign Up</h3>
            <p className="text-gray-600">
              Create your @username and go live in seconds.
            </p>
          </div>
          
          <div className="step-card" data-step="2" aria-label="Step 2">
            <div className="feature-icon group-hover:scale-110">
              🎨
            </div>
            <h3 className="text-xl font-bold mb-3">Customize</h3>
            <p className="text-gray-600">
              Add links, products, and style with stunning templates.
            </p>
          </div>
          
          <div className="step-card" data-step="3" aria-label="Step 3">
            <div className="feature-icon group-hover:scale-110">
              💰
            </div>
            <h3 className="text-xl font-bold mb-3">Earn</h3>
            <p className="text-gray-600">
              Sell products and collect Pi tips effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
