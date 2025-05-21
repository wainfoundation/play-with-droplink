
// Helper function to play sounds with volume control
export const playSound = (audioUrl: string, volume = 1): void => {
  const audio = new Audio(audioUrl);
  audio.volume = volume;
  
  // Handle Safari/iOS requirement for user interaction
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.error("Audio playback error:", error);
    });
  }
};

// Predefined sound effects
export const sounds = {
  loadingComplete: "/sounds/loading-complete.mp3",
  setupComplete: "/sounds/setup-complete.mp3",
};
