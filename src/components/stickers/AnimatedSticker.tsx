
import React from "react";
import Lottie from "lottie-react";

interface AnimatedStickerProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  isLottie?: boolean;
  animationData?: any;
}

const AnimatedSticker = ({ 
  src, 
  alt, 
  className = "", 
  style,
  isLottie = false,
  animationData
}: AnimatedStickerProps) => {
  // Check if the URL is a LottieFiles URL or JSON
  const isLottieUrl = src.includes('lottiefiles.com') || src.endsWith('.json') || isLottie;

  if (isLottieUrl && animationData) {
    return (
      <Lottie
        animationData={animationData}
        className={className}
        style={style}
        loop={true}
        autoplay={true}
      />
    );
  }

  if (isLottieUrl && !animationData) {
    // For Lottie URLs, we'll fetch the animation data
    return <LottieFromUrl src={src} className={className} style={style} alt={alt} />;
  }

  // Regular image/GIF
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

const LottieFromUrl = ({ src, className, style, alt }: { src: string; className: string; style?: React.CSSProperties; alt: string }) => {
  const [animationData, setAnimationData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchLottieData = async () => {
      try {
        let jsonUrl = src;
        
        // Convert LottieFiles share URL to JSON URL if needed
        if (src.includes('lottiefiles.com/animations/')) {
          const animationId = src.split('/animations/')[1].split('/')[0];
          jsonUrl = `https://lottie.host/${animationId}.json`;
        }

        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLottieData();
  }, [src]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded`} style={style}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded text-xs text-gray-500`} style={style}>
        Failed to load
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      className={className}
      style={style}
      loop={true}
      autoplay={true}
    />
  );
};

export default AnimatedSticker;
