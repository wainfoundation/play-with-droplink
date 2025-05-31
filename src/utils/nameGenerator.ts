// Random name parts for generating unique character names
const firstNames = [
  'Luna', 'Nova', 'Zara', 'Echo', 'Iris', 'Sage', 'Kai', 'Orion', 
  'Atlas', 'Phoenix', 'River', 'Sky', 'Storm', 'Blaze', 'Frost',
  'Ember', 'Dawn', 'Dusk', 'Star', 'Moon', 'Sol', 'Rain', 'Snow',
  'Wind', 'Ocean', 'Forest', 'Meadow', 'Canyon', 'Vale', 'Peak'
];

const suffixes = [
  'walker', 'runner', 'jumper', 'dancer', 'dreamer', 'seeker',
  'finder', 'keeper', 'maker', 'player', 'winner', 'hero',
  'champion', 'explorer', 'adventurer', 'guardian', 'warrior',
  'mage', 'sage', 'scout', 'pilot', 'rider', 'glider', 'swimmer'
];

// Keep track of used names to prevent duplicates
const usedNames = new Set<string>();

export const generateRandomName = (): string => {
  let attempts = 0;
  let newName = '';
  
  // Try to generate a unique name, with fallback after 50 attempts
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    newName = `${firstName} ${suffix}`;
    attempts++;
  } while (usedNames.has(newName) && attempts < 50);
  
  // If we couldn't find a unique name after 50 attempts, add a number
  if (usedNames.has(newName)) {
    let counter = 1;
    let numberedName = `${newName} ${counter}`;
    while (usedNames.has(numberedName)) {
      counter++;
      numberedName = `${newName} ${counter}`;
    }
    newName = numberedName;
  }
  
  usedNames.add(newName);
  return newName;
};

export const resetUsedNames = () => {
  usedNames.clear();
};
