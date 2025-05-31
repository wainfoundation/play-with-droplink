
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

// Create simple sound effects using Web Audio API
export const playSynthSound = (frequency: number, duration: number, volume: number = 0.5): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log('Web Audio API not supported:', error);
  }
};

// Predefined sound effects (using synthesized sounds as fallback)
export const sounds = {
  loadingComplete: "/sounds/loading-complete.mp3",
  setupComplete: "/sounds/setup-complete.mp3",
  
  // Game sounds using synthesized audio
  click: () => playSynthSound(800, 0.1, 0.3),
  success: () => playSynthSound(523.25, 0.2, 0.4), // C5
  error: () => playSynthSound(196, 0.3, 0.4), // G3
  powerup: () => {
    playSynthSound(523.25, 0.1, 0.3); // C5
    setTimeout(() => playSynthSound(659.25, 0.1, 0.3), 100); // E5
    setTimeout(() => playSynthSound(783.99, 0.2, 0.3), 200); // G5
  },
  coin: () => {
    playSynthSound(1047, 0.1, 0.3); // C6
    setTimeout(() => playSynthSound(1319, 0.1, 0.3), 100); // E6
  },
  unlock: () => {
    playSynthSound(440, 0.1, 0.3); // A4
    setTimeout(() => playSynthSound(554.37, 0.1, 0.3), 100); // C#5
    setTimeout(() => playSynthSound(659.25, 0.1, 0.3), 200); // E5
    setTimeout(() => playSynthSound(880, 0.2, 0.3), 300); // A5
  }
};

// Background music controller
export const createBackgroundMusicController = () => {
  let isPlaying = false;
  let timeoutId: NodeJS.Timeout;

  const playAmbientLoop = () => {
    if (!isPlaying) return;

    const notes = [220, 246.94, 261.63, 293.66, 329.63]; // A, B, C, D, E
    let delay = 0;
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        if (isPlaying) {
          playSynthSound(note, 1.5, 0.05);
          playSynthSound(note * 2, 1.5, 0.03); // Octave
        }
      }, delay);
      delay += 2000;
    });

    timeoutId = setTimeout(playAmbientLoop, delay + 1000);
  };

  return {
    start: () => {
      isPlaying = true;
      playAmbientLoop();
    },
    stop: () => {
      isPlaying = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
    isPlaying: () => isPlaying
  };
};
