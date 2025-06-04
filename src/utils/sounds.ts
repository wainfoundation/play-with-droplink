
export const sounds = {
  click: '/sounds/ui/click.mp3',
  hover: '/sounds/ui/hover.mp3',
  buttonPress: '/sounds/ui/button-press.mp3',
  success: '/sounds/game/success.mp3',
  error: '/sounds/game/error.mp3',
  collect: '/sounds/game/collect.mp3',
  loadingComplete: '/sounds/game/level-complete.mp3',
  setupComplete: '/sounds/game/success.mp3',
  backgroundMusic: '/sounds/background/PlayDroplink Main Theme Song.mp3'
};

export const playSound = (soundPath: string, volume: number = 1.0) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch(() => {
      // Ignore errors if sound can't play (user hasn't interacted yet)
    });
  } catch (error) {
    // Ignore sound errors in development/production
  }
};

export const playSoundEffect = (soundKey: string, volume: number = 1.0) => {
  const soundMap: { [key: string]: string } = {
    click: '/sounds/ui/click.mp3',
    hover: '/sounds/ui/hover.mp3',
    buttonPress: '/sounds/ui/button-press.mp3',
    success: '/sounds/game/success.mp3',
    error: '/sounds/game/error.mp3',
    collect: '/sounds/game/collect.mp3',
    levelComplete: '/sounds/game/level-complete.mp3',
    gameOver: '/sounds/game/game-over.mp3',
    newLevel: '/sounds/game/new-level.mp3',
    victory: '/sounds/game/victory.mp3',
    loseLife: '/sounds/game/lose-life.mp3',
    gainLife: '/sounds/game/gain-life.mp3',
    colorMerge: '/sounds/color-merge/merge.mp3',
    correctMatch: '/sounds/color-merge/correct-match.mp3',
    perfectMatch: '/sounds/color-merge/perfect-match.mp3',
    wrongMove: '/sounds/color-merge/wrong-move.mp3',
    setupComplete: '/sounds/game/success.mp3'
  };

  const soundPath = soundMap[soundKey];
  if (soundPath) {
    playSound(soundPath, volume);
  }
};

export const backgroundMusic = {
  currentAudio: null as HTMLAudioElement | null,
  
  play: (musicPath: string, volume: number = 0.3) => {
    try {
      if (backgroundMusic.currentAudio) {
        backgroundMusic.stop();
      }
      
      const audio = new Audio(musicPath);
      audio.loop = true;
      audio.volume = volume;
      backgroundMusic.currentAudio = audio;
      
      audio.play().catch(() => {
        // Ignore errors if music can't play (user hasn't interacted yet)
      });
    } catch (error) {
      // Ignore music errors in development/production
    }
  },
  
  stop: () => {
    if (backgroundMusic.currentAudio) {
      backgroundMusic.currentAudio.pause();
      backgroundMusic.currentAudio.src = '';
      backgroundMusic.currentAudio = null;
    }
  },
  
  setVolume: (volume: number) => {
    if (backgroundMusic.currentAudio) {
      backgroundMusic.currentAudio.volume = volume;
    }
  }
};

export const startMainTheme = () => {
  backgroundMusic.play(sounds.backgroundMusic, 0.3);
};
