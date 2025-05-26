
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserSticker {
  id: string;
  sticker_id: string;
  stickers_effects: {
    id: string;
    name: string;
    animation_url: string;
    category: string;
  };
}

interface ProfileStickersProps {
  userId: string;
  activeStickers?: string[];
  isOwnProfile?: boolean;
}

const ProfileStickers = ({ userId, activeStickers = [], isOwnProfile = false }: ProfileStickersProps) => {
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(activeStickers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStickers();
  }, [userId]);

  useEffect(() => {
    setSelectedStickers(activeStickers);
  }, [activeStickers]);

  const fetchUserStickers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stickers')
        .select(`
          id,
          sticker_id,
          stickers_effects (
            id,
            name,
            animation_url,
            category
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;
      setUserStickers(data || []);
    } catch (error) {
      console.error('Error fetching user stickers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActiveStickers = async (stickers: string[]) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ active_sticker_ids: stickers })
        .eq('id', userId);

      if (error) throw error;
      setSelectedStickers(stickers);
    } catch (error) {
      console.error('Error updating active stickers:', error);
    }
  };

  const toggleSticker = (stickerId: string) => {
    const newSelection = selectedStickers.includes(stickerId)
      ? selectedStickers.filter(id => id !== stickerId)
      : [...selectedStickers, stickerId];
    
    setSelectedStickers(newSelection);
  };

  const saveChanges = () => {
    updateActiveStickers(selectedStickers);
  };

  // Display active stickers on profile
  const displayStickers = userStickers.filter(us => 
    selectedStickers.includes(us.sticker_id)
  );

  if (!isOwnProfile && displayStickers.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Display Active Stickers */}
      {displayStickers.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {displayStickers.map((userSticker) => (
            <div
              key={userSticker.id}
              className="relative group"
            >
              <img
                src={userSticker.stickers_effects.animation_url}
                alt={userSticker.stickers_effects.name}
                className="w-8 h-8 object-contain animate-pulse hover:animate-bounce cursor-pointer"
                title={userSticker.stickers_effects.name}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>
      )}

      {/* Sticker Management for Own Profile */}
      {isOwnProfile && userStickers.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mb-4">
              <Settings className="h-4 w-4 mr-2" />
              Manage Stickers
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Profile Stickers</DialogTitle>
              <DialogDescription>
                Choose which stickers to display on your profile
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : userStickers.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  You don't have any stickers yet. Visit the Stickers page to purchase some!
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {userStickers.map((userSticker) => (
                      <div
                        key={userSticker.id}
                        className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedStickers.includes(userSticker.sticker_id)
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleSticker(userSticker.sticker_id)}
                      >
                        <div className="text-center">
                          <img
                            src={userSticker.stickers_effects.animation_url}
                            alt={userSticker.stickers_effects.name}
                            className="w-8 h-8 object-contain mx-auto mb-1 animate-pulse"
                          />
                          <p className="text-xs font-medium truncate">
                            {userSticker.stickers_effects.name}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {userSticker.stickers_effects.category}
                          </Badge>
                        </div>
                        {selectedStickers.includes(userSticker.sticker_id) && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedStickers([])}
                      className="flex-1"
                    >
                      Clear All
                    </Button>
                    <Button onClick={saveChanges} className="flex-1">
                      Save Changes
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Selected stickers will appear on your profile. You can select multiple stickers.
                  </p>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileStickers;
