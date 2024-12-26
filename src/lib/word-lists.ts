export const wordLists = {
    article: [
      'a', 'an', 'the', 'this', 'that', 'these', 'those', 'any', 'all'
    ],
    adjective: [
      'ancient', 'basic', 'big', 'black', 'blue', 'bright', 'broad', 'brown', 'clean',
      'clear', 'close', 'cold', 'dark', 'deep', 'empty', 'entire', 'extra', 'fair',
      'fast', 'fine', 'firm', 'flat', 'fresh', 'full', 'gentle', 'good', 'great',
      'green', 'grey', 'hard', 'heavy', 'high', 'hollow', 'hot', 'huge', 'large',
      'left', 'light', 'little', 'long', 'loud', 'low', 'main', 'narrow', 'new',
      'nice', 'normal', 'old', 'open', 'outer', 'pink', 'plain', 'quick', 'quiet',
      'rare', 'raw', 'red', 'rich', 'right', 'rough', 'round', 'sharp', 'short',
      'silent', 'simple', 'small', 'smooth', 'soft', 'solid', 'spare', 'square',
      'steady', 'steep', 'still', 'straight', 'strange', 'strong', 'sweet', 'swift',
      'tall', 'thick', 'thin', 'tight', 'tiny', 'tired', 'tough', 'true', 'weak',
      'wet', 'white', 'whole', 'wide', 'wild', 'yellow', 'young'
    ],
    person: [
      'actor', 'adult', 'agent', 'artist', 'athlete', 'aunt', 'author', 'baby',
      'boy', 'brother', 'captain', 'chef', 'child', 'citizen', 'daughter', 'doctor',
      'enemy', 'expert', 'father', 'friend', 'genius', 'girl', 'guard', 'guide',
      'hero', 'human', 'husband', 'judge', 'king', 'lady', 'leader', 'master',
      'mother', 'nurse', 'parent', 'people', 'person', 'pilot', 'pioneer', 'police',
      'prince', 'princess', 'queen', 'rebel', 'sister', 'soldier', 'spirit', 'student',
      'teacher', 'uncle', 'warrior', 'wife', 'woman', 'worker', 'writer', 'youth'
    ],
    action: [
      'abandon', 'advance', 'arrive', 'bounce', 'climb', 'crawl', 'dance', 'dive',
      'drift', 'drive', 'drop', 'emerge', 'enter', 'escape', 'fade', 'fall', 'flee',
      'float', 'fly', 'follow', 'gather', 'glide', 'hover', 'jump', 'launch', 'leave',
      'march', 'move', 'pass', 'pull', 'push', 'race', 'return', 'ride', 'rise',
      'run', 'rush', 'scatter', 'seek', 'shift', 'slide', 'slip', 'swim', 'swing',
      'throw', 'travel', 'trip', 'walk', 'wander'
    ],
    direction: [
      'above', 'across', 'ahead', 'around', 'behind', 'below', 'beneath', 'between',
      'beyond', 'down', 'east', 'far', 'forth', 'forward', 'here', 'high', 'in',
      'inside', 'into', 'near', 'north', 'out', 'outside', 'over', 'south', 'through',
      'toward', 'under', 'up', 'west', 'within'
    ],
    place: [
      'airport', 'arena', 'beach', 'bridge', 'building', 'castle', 'cave', 'church',
      'city', 'clinic', 'coast', 'country', 'court', 'desert', 'earth', 'factory',
      'field', 'forest', 'garden', 'gate', 'harbor', 'heaven', 'hill', 'home',
      'hospital', 'hotel', 'house', 'island', 'jungle', 'lake', 'land', 'library',
      'market', 'meadow', 'mountain', 'museum', 'ocean', 'office', 'palace', 'park',
      'planet', 'pond', 'port', 'river', 'road', 'school', 'sea', 'shop', 'shore',
      'space', 'stadium', 'station', 'street', 'temple', 'theater', 'tower', 'town',
      'valley', 'village'
    ],
    timeWord: [
      'april', 'august', 'december', 'february', 'march', 'october', 'dawn',
      'morning', 'night', 'midnight', 'today', 'tomorrow', 'tonight', 'early',
      'soon', 'later', 'often', 'never', 'now', 'always', 'forever'
    ],
    conjunction: [
      'after', 'before', 'between', 'since', 'until', 'when', 'while', 'with'
    ]
  } as const;
  
  export const categoryNames = {
    article: 'Article',
    adjective: 'Adjective',
    person: 'Person',
    action: 'Action',
    direction: 'Direction',
    place: 'Place',
    timeWord: 'Time Word',
    conjunction: 'Conjunction'
  } as const;
  
  // Create a Set of all valid words for efficient lookup
  export const allValidWords = new Set<string>([
    ...Object.values(wordLists).flat()
  ]);