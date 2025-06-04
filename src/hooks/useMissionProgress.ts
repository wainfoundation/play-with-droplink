
import { useMissions } from './useMissions';

// Hook to integrate mission progress with pet care actions
export const useMissionProgress = () => {
  const { updateProgress } = useMissions();

  const trackFeedAction = () => {
    updateProgress('feed');
  };

  const trackPlayAction = () => {
    updateProgress('play');
  };

  const trackCleanAction = () => {
    updateProgress('clean');
  };

  const trackSleepAction = () => {
    updateProgress('sleep');
  };

  const trackMiniGameAction = () => {
    updateProgress('mini_game');
  };

  const trackComboAction = () => {
    updateProgress('combo');
  };

  return {
    trackFeedAction,
    trackPlayAction,
    trackCleanAction,
    trackSleepAction,
    trackMiniGameAction,
    trackComboAction
  };
};
