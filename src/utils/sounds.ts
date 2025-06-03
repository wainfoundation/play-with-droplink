
// Enhanced sound utilities for the app
export const sounds = {
  loadingComplete: '/sounds/ui/success.mp3',
  buttonClick: '/sounds/ui/click.mp3',
  hover: '/sounds/ui/hover.mp3',
  setupComplete: '/sounds/ui/success.mp3', // Added missing setupComplete sound
};

export const playSound = (soundPath: string, volume: number = 0.5) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently fail if sound can't be played
      console.log('Sound playback failed, continuing without sound');
    });
  } catch (error) {
    // Silently fail if sound loading fails
    console.log('Sound loading failed, continuing without sound');
  }
};

// Background music manager
export const backgroundMusic = {
  currentAudio: null as HTMLAudioElement | null,
  
  play: (soundPath: string, volume: number = 0.3) => {
    try {
      // Stop current music if playing
      if (backgroundMusic.currentAudio) {
        backgroundMusic.currentAudio.pause();
        backgroundMusic.currentAudio = null;
      }
      
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.loop = true;
      audio.play().catch(() => {
        console.log('Background music playback failed');
      });
      backgroundMusic.currentAudio = audio;
    } catch (error) {
      console.log('Background music loading failed');
    }
  },
  
  stop: () => {
    if (backgroundMusic.currentAudio) {
      backgroundMusic.currentAudio.pause();
      backgroundMusic.currentAudio = null;
    }
  },
  
  setVolume: (volume: number) => {
    if (backgroundMusic.currentAudio) {
      backgroundMusic.currentAudio.volume = volume;
    }
  }
};

// Sound effect player with predefined effects
export const playSoundEffect = (effectName: string, volume: number = 0.5) => {
  const soundMap: Record<string, string> = {
    // UI sounds
    'click': '/sounds/ui/click.mp3',
    'hover': '/sounds/ui/hover.mp3',
    'success': '/sounds/ui/success.mp3',
    
    // Game sounds
    'collect': '/sounds/game/collect.mp3',
    'error': '/sounds/game/error.mp3',
    'gameOver': '/sounds/game/game-over.mp3',
    'levelComplete': '/sounds/game/level-complete.mp3',
    'newLevel': '/sounds/game/new-level.mp3',
    'victory': '/sounds/game/victory.mp3',
    'loseLife': '/sounds/game/lose-life.mp3',
    'gainLife': '/sounds/game/gain-life.mp3',
    
    // Color merge specific
    'colorMerge': '/sounds/color-merge/merge.mp3',
    'correctMatch': '/sounds/color-merge/correct-match.mp3',
    'perfectMatch': '/sounds/color-merge/perfect-match.mp3',
    'wrongMove': '/sounds/color-merge/wrong-move.mp3',
    
    // Block connect specific
    'blockPlace': '/sounds/block-connect/block-place.mp3',
    'blockDrop': '/sounds/block-connect/block-drop.mp3',
    'lineComplete': '/sounds/block-connect/line-complete.mp3',
    
    // Pi sounds
    'piEarn': '/sounds/pi/earn.mp3',
    'piPayment': '/sounds/pi/payment.mp3',
  };
  
  const soundPath = soundMap[effectName];
  if (soundPath) {
    playSound(soundPath, volume);
  } else {
    console.log(`Sound effect '${effectName}' not found`);
  }
};
