
const Features = () => {
  return (
    <section className="py-20 px-6" id="features">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Droplink?</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Tools to connect, monetize, and grow with Pi Network.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="feature-icon group-hover:scale-110">
              🎨
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Themes</h3>
            <p className="text-gray-600">
              Modern, water-inspired templates to match your brand.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon group-hover:scale-110">
              📊
            </div>
            <h3 className="text-xl font-bold mb-3">Analytics</h3>
            <p className="text-gray-600">
              Real-time insights on clicks, earnings, and engagement.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon group-hover:scale-110">
              💰
            </div>
            <h3 className="text-xl font-bold mb-3">Pi Payments</h3>
            <p className="text-gray-600">
              Accept Pi for tips and products with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
