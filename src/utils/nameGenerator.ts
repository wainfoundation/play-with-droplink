
const firstNames = [
  'Aqua', 'Bubbles', 'Crystal', 'Dewdrop', 'Echo', 'Flow', 'Glimmer', 'Hydro',
  'Iris', 'Jet', 'Koi', 'Luna', 'Mist', 'Nemo', 'Ocean', 'Pearl', 'Quartz',
  'Rain', 'Splash', 'Tide', 'Uno', 'Vortex', 'Wave', 'Xenon', 'Yuki', 'Zephyr'
];

const suffixes = [
  'drop', 'flow', 'splash', 'wave', 'mist', 'tide', 'rain', 'dew',
  'spring', 'brook', 'river', 'lake', 'sea', 'ocean', 'pool', 'stream'
];

let usedNames = new Set<string>();

export const generateRandomName = (): string => {
  let attempts = 0;
  let name = '';
  
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    name = Math.random() > 0.5 ? `${firstName}${suffix}` : firstName;
    attempts++;
    
    if (attempts > 50) {
      // Add a number if we can't find a unique name
      name = `${firstName}${Math.floor(Math.random() * 999) + 1}`;
      break;
    }
  } while (usedNames.has(name));
  
  usedNames.add(name);
  return name;
};

export const resetUsedNames = () => {
  usedNames.clear();
};
