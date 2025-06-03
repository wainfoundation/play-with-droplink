
// Simple sound utilities for the app
export const sounds = {
  loadingComplete: '/sounds/ui/success.mp3',
  buttonClick: '/sounds/ui/click.mp3',
  hover: '/sounds/ui/hover.mp3',
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
