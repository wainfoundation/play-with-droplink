
const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Community Love</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Hear from creators thriving with Droplink.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="testimonial-card">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" 
              alt="Jane Avatar" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex mb-2 text-primary">
                ★★★★★
              </div>
              <blockquote className="italic text-gray-700 mb-4 border-l-4 border-primary pl-3">
                "Droplink simplifies my art sales with Pi!"
              </blockquote>
              <h4 className="font-medium text-primary">— @CreatorJane, Artist</h4>
            </div>
          </div>
          
          <div className="testimonial-card">
            <img 
              src="https://images.unsplash.com/photo-1519227355628-82731f3a4d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" 
              alt="Mike Avatar" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex mb-2 text-primary">
                ★★★★★
              </div>
              <blockquote className="italic text-gray-700 mb-4 border-l-4 border-primary pl-3">
                "Pi payments make earning a breeze!"
              </blockquote>
              <h4 className="font-medium text-primary">— @ArtistMike, Musician</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
