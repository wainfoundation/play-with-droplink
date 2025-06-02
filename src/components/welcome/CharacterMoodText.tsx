
import React from 'react';
import { motion } from 'framer-motion';

interface CharacterMoodTextProps {
  mood: string;
  characterName?: string;
}

const facialExpressionsText = {
  happy: "😄 Smiling happily!",
  excited: "🤩 So excited and energetic!",
  calm: "😌 Feeling peaceful and content",
  hungry: "😟 Looks hungry and needs food...",
  sleepy: "😴 Feeling sleepy and tired...",
  tired: "😪 Low on energy...",
  sick: "🤒 Feeling sick and needs care...",
  sad: "😢 Feeling sad and lonely...",
  dirty: "😅 Needs a good bath...",
  neutral: "😐 Just chilling and relaxed",
  angry: "😠 Not happy right now!"
};

const CharacterMoodText: React.FC<CharacterMoodTextProps> = ({ mood, characterName }) => {
  const faceText = facialExpressionsText[mood as keyof typeof facialExpressionsText] || facialExpressionsText.neutral;
  
  return (
    <motion.div
      key={mood}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="character-mood-text text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg border-2 border-blue-200 shadow-sm"
    >
      <div className="text-lg font-semibold text-gray-800">
        {characterName && <span className="text-primary">{characterName}: </span>}
        {faceText}
      </div>
    </motion.div>
  );
};

export default CharacterMoodText;
