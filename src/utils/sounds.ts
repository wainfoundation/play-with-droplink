
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

// Game sound effects library
export const gameSounds = {
  // UI Sounds
  click: "/sounds/ui/click.mp3",
  hover: "/sounds/ui/hover.mp3",
  buttonPress: "/sounds/ui/button-press.mp3",
  
  // Game Events
  levelComplete: "/sounds/game/level-complete.mp3",
  gameOver: "/sounds/game/game-over.mp3",
  victory: "/sounds/game/victory.mp3",
  newLevel: "/sounds/game/new-level.mp3",
  
  // Color Merge Specific
  colorMerge: "/sounds/color-merge/merge.mp3",
  correctMatch: "/sounds/color-merge/correct-match.mp3",
  wrongMove: "/sounds/color-merge/wrong-move.mp3",
  perfectMatch: "/sounds/color-merge/perfect-match.mp3",
  
  // Block Connect Specific
  blockPlace: "/sounds/block-connect/block-place.mp3",
  lineComplete: "/sounds/block-connect/line-complete.mp3",
  blockDrop: "/sounds/block-connect/block-drop.mp3",
  
  // General Game Sounds
  collect: "/sounds/game/collect.mp3",
  powerUp: "/sounds/game/power-up.mp3",
  unlock: "/sounds/game/unlock.mp3",
  error: "/sounds/game/error.mp3",
  success: "/sounds/game/success.mp3",
  
  // Lives and Hearts
  loseLife: "/sounds/game/lose-life.mp3",
  gainLife: "/sounds/game/gain-life.mp3",
  
  // Pi Related
  piPayment: "/sounds/pi/payment.mp3",
  piEarn: "/sounds/pi/earn.mp3",
  
  // Background Music
  calmBackground: "/sounds/background/calm-ambient.mp3",
  gameplayMusic: "/sounds/background/gameplay-music.mp3",
  mainTheme: "/assets/background_loop/PlayDroplink Main Theme Song.mp3",
  
  // System sounds from before
  loadingComplete: "/sounds/loading-complete.mp3",
  setupComplete: "/sounds/setup-complete.mp3",
};

// Enhanced background music manager with persistence and autoplay handling
class BackgroundMusicManager {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: string | null = null;
  private volume: number = 0.3;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private hasUserInteracted: boolean = false;
  private pendingPlay: string | null = null;

  constructor() {
    // Load mute state from localStorage
    const savedMuteState = localStorage.getItem('droplet-music-muted');
    this.isMuted = savedMuteState === 'true';
    
    // Listen for first user interaction to enable autoplay
    this.setupUserInteractionListener();
  }

  private setupUserInteractionListener() {
    const enableAudio = () => {
      this.hasUserInteracted = true;
      console.log('User interaction detected, enabling audio');
      
      // If there's a pending play request, execute it now
      if (this.pendingPlay && !this.isMuted) {
        this.play(this.pendingPlay);
        this.pendingPlay = null;
      }
      
      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
    
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
  }

  play(track: string, loop: boolean = true) {
    console.log('Attempting to play music:', track, 'Muted:', this.isMuted, 'User interacted:', this.hasUserInteracted);
    
    if (this.isMuted) {
      console.log('Music is muted, not playing');
      return;
    }
    
    if (this.currentTrack === track && this.isPlaying) {
      console.log('Music already playing');
      return;
    }
    
    // If user hasn't interacted yet, store the request for later
    if (!this.hasUserInteracted) {
      console.log('No user interaction yet, storing play request');
      this.pendingPlay = track;
      return;
    }
    
    this.stop();
    
    this.audio = new Audio(track);
    this.audio.volume = this.volume;
    this.audio.loop = loop;
    this.currentTrack = track;
    
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        console.log('Music started successfully');
      }).catch((error) => {
        console.error("Background music playback error:", error);
        // Try again in a moment if it failed
        setTimeout(() => {
          if (this.audio && !this.isMuted) {
            this.audio.play().catch(e => console.log('Retry play failed:', e));
          }
        }, 1000);
      });
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  toggle() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('droplet-music-muted', this.isMuted.toString());
    console.log('Music toggled, muted:', this.isMuted);
    
    if (this.isMuted) {
      this.stop();
    } else if (this.currentTrack || this.pendingPlay) {
      // Try to play the current track or pending track
      const trackToPlay = this.currentTrack || this.pendingPlay || gameSounds.mainTheme;
      this.play(trackToPlay);
    }
    
    return this.isMuted;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  fadeOut(duration: number = 1000) {
    if (!this.audio) return;
    
    const startVolume = this.audio.volume;
    const fadeStep = startVolume / (duration / 50);
    
    const fadeInterval = setInterval(() => {
      if (this.audio && this.audio.volume > 0) {
        this.audio.volume = Math.max(0, this.audio.volume - fadeStep);
      } else {
        this.stop();
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  getMuted() {
    return this.isMuted;
  }

  getIsPlaying() {
    return this.isPlaying && !this.isMuted;
  }
}

export const backgroundMusic = new BackgroundMusicManager();

// Auto-start main theme (will wait for user interaction)
export const startMainTheme = () => {
  console.log('startMainTheme called');
  backgroundMusic.play(gameSounds.mainTheme);
};

// Sound effects with categories
export const playSoundEffect = (soundKey: keyof typeof gameSounds, volume?: number) => {
  playSound(gameSounds[soundKey], volume);
};

// Predefined sound effects (backward compatibility)
export const sounds = {
  loadingComplete: gameSounds.loadingComplete,
  setupComplete: gameSounds.setupComplete,
};
