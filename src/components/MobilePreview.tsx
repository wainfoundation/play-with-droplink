
const MobilePreview = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Your Droplink Profile</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          One elegant page to showcase your links, products, and Pi earnings.
        </p>
        
        <div className="max-w-xs mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-3 shadow-2xl">
          <div className="bg-white rounded-[32px] h-[540px] overflow-hidden relative">
            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-1">@username</h3>
              <p className="text-sm text-gray-500 mb-6">Digital creator & Pi pioneer</p>
              
              <div className="w-full space-y-3">
                <a href="#" className="block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md">
                  <span className="flex items-center justify-center gap-2">
                    <span>💰</span> Tip in Pi
                  </span>
                </a>
                <a href="#" className="block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md">
                  <span className="flex items-center justify-center gap-2">
                    <span>📚</span> Buy eBook
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>📺</span> YouTube Channel
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>🐦</span> Twitter
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>📷</span> Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
