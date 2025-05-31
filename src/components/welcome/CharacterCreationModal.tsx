
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Sparkles } from 'lucide-react';
import { CharacterCustomization } from '@/components/character/types';

interface CharacterCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCharacterCreated: (character: CharacterCustomization) => void;
}

const CharacterCreationModal: React.FC<CharacterCreationModalProps> = ({
  isOpen,
  onClose,
  onCharacterCreated
}) => {
  const [characterName, setCharacterName] = useState('My Droplink');
  const [selectedColor, setSelectedColor] = useState('#00aaff');

  const colors = [
    '#00aaff', // Default blue
    '#ff6b6b', // Red
    '#4ecdc4', // Teal
    '#45b7d1', // Light blue
    '#96ceb4', // Green
    '#feca57', // Yellow
    '#ff9ff3', // Pink
    '#54a0ff', // Blue
    '#5f27cd'  // Purple
  ];

  const handleCreateCharacter = () => {
    const newCharacter: CharacterCustomization = {
      id: crypto.randomUUID(),
      name: characterName,
      color: selectedColor,
      clothes: [],
      accessories: [],
      background: 'default',
      room: 'default',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onCharacterCreated(newCharacter);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Create Your Droplink Character
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Character Preview */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <svg
                  width="120"
                  height="144"
                  viewBox="0 0 200 240"
                  className="mx-auto animate-bounce-gentle"
                >
                  <defs>
                    <linearGradient id="characterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor} />
                      <stop offset="50%" stopColor={selectedColor} />
                      <stop offset="100%" stopColor="#0077cc" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                    fill="url(#characterGradient)"
                    className="transition-all duration-300"
                  />
                  
                  <ellipse
                    cx="75"
                    cy="70"
                    rx="12"
                    ry="18"
                    fill="rgba(255, 255, 255, 0.6)"
                  />
                  
                  <circle cx="80" cy="110" r="6" fill="#fff" />
                  <circle cx="120" cy="110" r="6" fill="#fff" />
                  <circle cx="82" cy="112" r="3" fill="#333" />
                  <circle cx="122" cy="112" r="3" fill="#333" />
                  <circle cx="83" cy="111" r="1" fill="#fff" />
                  <circle cx="123" cy="111" r="1" fill="#fff" />
                  
                  <path
                    d="M80 140 Q100 155 120 140"
                    stroke="#fff"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">{characterName || 'Your Character'}</h3>
            </CardContent>
          </Card>

          {/* Character Name */}
          <div className="space-y-2">
            <Label htmlFor="characterName">Character Name</Label>
            <Input
              id="characterName"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name..."
              maxLength={20}
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Choose Color
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                    selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateCharacter} 
              className="flex-1"
              disabled={!characterName.trim()}
            >
              Create Character
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterCreationModal;
