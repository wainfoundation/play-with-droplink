
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StickerEffect {
  id: string;
  name: string;
  animation_url: string;
  category: 'sticker' | 'profile_effect' | 'animation';
}

interface ActiveStickersProps {
  activeStickerIds: string[];
  className?: string;
}

const ActiveStickers = ({ activeStickerIds, className = "" }: ActiveStickersProps) => {
  const [stickers, setStickers] = useState<StickerEffect[]>([]);

  useEffect(() => {
    const fetchActiveStickers = async () => {
      if (!activeStickerIds.length) {
        setStickers([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('stickers_effects')
          .select('id, name, animation_url, category')
          .in('id', activeStickerIds);

        if (error) throw error;
        setStickers(data || []);
      } catch (error) {
        console.error('Error fetching active stickers:', error);
      }
    };

    fetchActiveStickers();
  }, [activeStickerIds]);

  if (!stickers.length) return null;

  const profileEffects = stickers.filter(s => s.category === 'profile_effect');
  const regularStickers = stickers.filter(s => s.category !== 'profile_effect');

  return (
    <div className={`relative ${className}`}>
      {/* Profile effects as background/overlay */}
      {profileEffects.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `url(${sticker.animation_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
      ))}
      
      {/* Regular stickers as floating elements */}
      {regularStickers.map((sticker, index) => (
        <div
          key={sticker.id}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${10 + (index * 15)}%`,
            right: `${5 + (index * 10)}%`,
            transform: 'translate(50%, -50%)',
          }}
        >
          <img
            src={sticker.animation_url}
            alt={sticker.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveStickers;
