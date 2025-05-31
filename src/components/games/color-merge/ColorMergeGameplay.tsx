
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, SkipForward, Eye, Crown } from 'lucide-react';

interface Color {
  r: number;
  g: number;
  b: number;
}

interface ColorMergeGameplayProps {
  targetColor: Color;
  currentColor: Color;
  availableColors: Color[];
  showHint: boolean;
  hintColor: Color | null;
  colorToHex: (color: Color) => string;
  onMergeColor: (color: Color) => void;
  onResetColor: () => void;
  onBuyHint: () => void;
  onSkipLevel: () => void;
  isPremium?: boolean;
}

const ColorMergeGameplay: React.FC<ColorMergeGameplayProps> = ({
  targetColor,
  currentColor,
  availableColors,
  showHint,
  hintColor,
  colorToHex,
  onMergeColor,
  onResetColor,
  onBuyHint,
  onSkipLevel,
  isPremium = false
}) => {
  return (
    <div className="space-y-6">
      {/* Target and Current Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Target Color</p>
          <div 
            className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: colorToHex(targetColor) }}
          ></div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Your Color</p>
          <div 
            className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: colorToHex(currentColor) }}
          ></div>
        </div>
      </div>

      {/* Available Colors */}
      <div className="text-center">
        <p className="text-sm font-medium mb-3">Mix with these colors:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {availableColors.map((color, index) => (
            <button
              key={index}
              onClick={() => onMergeColor(color)}
              className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${
                showHint && hintColor && 
                color.r === hintColor.r && color.g === hintColor.g && color.b === hintColor.b
                  ? 'border-yellow-400 ring-2 ring-yellow-300 animate-pulse' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}
              style={{ backgroundColor: colorToHex(color) }}
            />
          ))}
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          onClick={onResetColor}
          variant="outline"
          size="sm"
        >
          Reset Color
        </Button>
        <Button 
          onClick={onBuyHint}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          {isPremium ? (
            <>
              <Crown className="w-3 h-3" />
              <Lightbulb className="w-3 h-3" />
              Premium Hint
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" />
              <Lightbulb className="w-3 h-3" />
              Watch Ad for Hint
            </>
          )}
        </Button>
        <Button 
          onClick={onSkipLevel}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          {isPremium ? (
            <>
              <Crown className="w-3 h-3" />
              <SkipForward className="w-3 h-3" />
              Premium Skip
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" />
              <SkipForward className="w-3 h-3" />
              Watch Ad to Skip
            </>
          )}
        </Button>
      </div>

      {showHint && (
        <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 The highlighted color will get you closer to the target!
            {isPremium && " (Premium Feature)"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorMergeGameplay;
