
import React from 'react';
import { motion } from 'framer-motion';
import { EvolutionStage } from '@/hooks/usePetProgression';

interface EvolutionStageRendererProps {
  stage: EvolutionStage;
  mood: string;
  size?: number;
  isAnimated?: boolean;
}

const EvolutionStageRenderer: React.FC<EvolutionStageRendererProps> = ({
  stage,
  mood,
  size = 120,
  isAnimated = true
}) => {
  const getStageColor = () => {
    switch (stage) {
      case 'baby': return '#3B82F6'; // Blue
      case 'teen': return '#10B981'; // Green
      case 'adult': return '#8B5CF6'; // Purple
      case 'elder': return '#F59E0B'; // Gold
      default: return '#3B82F6';
    }
  };

  const getStageSize = () => {
    switch (stage) {
      case 'baby': return size * 0.8;
      case 'teen': return size * 0.9;
      case 'adult': return size * 1.0;
      case 'elder': return size * 1.1;
      default: return size;
    }
  };

  const getStageDecorations = () => {
    switch (stage) {
      case 'baby':
        return (
          <g>
            {/* Baby sparkles */}
            <text x="50" y="40" fontSize="12" fill="gold">✨</text>
            <text x="150" y="45" fontSize="10" fill="gold">⭐</text>
          </g>
        );
      case 'teen':
        return (
          <g>
            {/* Teen energy aura */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.3" />
            <text x="45" y="35" fontSize="14" fill="#10B981">⚡</text>
            <text x="155" y="40" fontSize="12" fill="#10B981">💨</text>
          </g>
        );
      case 'adult':
        return (
          <g>
            {/* Adult wisdom symbols */}
            <circle cx="100" cy="100" r="98" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.4" />
            <text x="40" y="30" fontSize="16" fill="#8B5CF6">🔮</text>
            <text x="160" y="35" fontSize="14" fill="#8B5CF6">⭐</text>
            <text x="50" y="180" fontSize="12" fill="#8B5CF6">💎</text>
          </g>
        );
      case 'elder':
        return (
          <g>
            {/* Elder legendary aura */}
            <circle cx="100" cy="100" r="100" fill="none" stroke="#F59E0B" strokeWidth="4" opacity="0.6" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.4" />
            <text x="35" y="25" fontSize="18" fill="#F59E0B">👑</text>
            <text x="165" y="30" fontSize="16" fill="#F59E0B">🏆</text>
            <text x="45" y="185" fontSize="14" fill="#F59E0B">💫</text>
            <text x="155" y="180" fontSize="14" fill="#FBBF24">⭐</text>
          </g>
        );
      default:
        return null;
    }
  };

  const gradientId = `evolutionGradient_${stage}`;
  const actualSize = getStageSize();
  const color = getStageColor();

  const animationProps = isAnimated ? {
    animate: { 
      scale: [1, 1.02, 1],
      y: [0, -2, 0]
    },
    transition: { 
      duration: stage === 'elder' ? 2 : 3, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  } : {};

  return (
    <motion.div {...animationProps}>
      <svg width={actualSize} height={actualSize * 1.2} viewBox="0 0 200 240" className="drop-shadow-lg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Stage decorations (background) */}
        {getStageDecorations()}
        
        {/* Main droplet body */}
        <path
          d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
          fill={`url(#${gradientId})`}
          filter={stage === 'elder' ? 'url(#glow)' : undefined}
          stroke={stage === 'elder' ? '#F59E0B' : undefined}
          strokeWidth={stage === 'elder' ? '2' : '0'}
        />
        
        {/* Highlight based on stage */}
        <ellipse
          cx="75"
          cy="70"
          rx={stage === 'baby' ? "10" : stage === 'elder' ? "15" : "12"}
          ry={stage === 'baby' ? "15" : stage === 'elder' ? "20" : "18"}
          fill="rgba(255, 255, 255, 0.7)"
          opacity={stage === 'elder' ? '0.8' : '0.6'}
        />
        
        {/* Eyes based on stage and mood */}
        <g className="character-eyes">
          {stage === 'baby' ? (
            // Bigger, more innocent eyes
            <>
              <circle cx="85" cy="85" r="10" fill="#333" />
              <circle cx="115" cy="85" r="10" fill="#333" />
              <circle cx="87" cy="83" r="3" fill="white" />
              <circle cx="117" cy="83" r="3" fill="white" />
            </>
          ) : stage === 'elder' ? (
            // Wise, knowing eyes
            <>
              <circle cx="85" cy="85" r="8" fill="#333" />
              <circle cx="115" cy="85" r="8" fill="#333" />
              <circle cx="87" cy="83" r="2" fill="white" />
              <circle cx="117" cy="83" r="2" fill="white" />
              <path d="M77 78 Q85 75 93 78" stroke="#333" strokeWidth="2" fill="none" />
              <path d="M107 78 Q115 75 123 78" stroke="#333" strokeWidth="2" fill="none" />
            </>
          ) : (
            // Normal eyes
            <>
              <circle cx="85" cy="85" r="8" fill="#333" />
              <circle cx="115" cy="85" r="8" fill="#333" />
              <circle cx="87" cy="83" r="2" fill="white" />
              <circle cx="117" cy="83" r="2" fill="white" />
            </>
          )}
        </g>
        
        {/* Mouth based on mood */}
        <g className="character-mouth">
          <path
            d="M85 120 Q100 135 115 120"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        
        {/* Stage indicator badge */}
        <g className="stage-badge">
          <circle cx="170" cy="50" r="18" fill="white" stroke={color} strokeWidth="2" />
          <text x="170" y="55" fontSize="20" textAnchor="middle" fill={color}>
            {stage === 'baby' ? '🍼' : stage === 'teen' ? '⚡' : stage === 'adult' ? '⭐' : '👑'}
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default EvolutionStageRenderer;
