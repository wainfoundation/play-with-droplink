
export const sounds = {
  click: '/sounds/ui/click.mp3',
  hover: '/sounds/ui/hover.mp3',
  buttonPress: '/sounds/ui/button-press.mp3',
  success: '/sounds/game/success.mp3',
  error: '/sounds/game/error.mp3',
  collect: '/sounds/game/collect.mp3',
  loadingComplete: '/sounds/game/level-complete.mp3',
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
