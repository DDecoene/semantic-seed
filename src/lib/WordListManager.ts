import categorizedBIP39 from './categorizedWordlist';
import officialWordList from '@/data/officialBIP39wordlist.json';

interface CategorizedWordList {
  determiners: string[];
  adjectives: {
    descriptive: string[];
    quality: string[];
  };
  nouns: {
    people: string[];
    places: string[];
  };
  verbs: {
    action: string[];
  };
  directions: string[];
  timeWords: string[];
  conjunctions: string[];
}

export interface CategoryWordLists {
  [key: string]: string[];
}

class WordListManager {
  private static instance: WordListManager;
  private wordLists: CategoryWordLists;
  private allValidWords: Set<string>;
  private categoryNames: { [key: string]: string };
  private categorizedData: CategorizedWordList;

  private constructor() {
    this.categorizedData = categorizedBIP39 as CategorizedWordList;

    // Initialize with the basic categories from categorizedBIP39
    this.wordLists = {
      article: this.categorizedData.determiners,
      adjective: [...new Set([
        ...this.categorizedData.adjectives.descriptive,
        ...this.categorizedData.adjectives.quality
      ])],
      person: this.categorizedData.nouns.people,
      action: this.categorizedData.verbs.action,
      direction: this.categorizedData.directions,
      place: this.categorizedData.nouns.places,
      timeWord: this.categorizedData.timeWords,
      conjunction: this.categorizedData.conjunctions
    };

    // Create a Set of all valid BIP39 words for efficient lookup
    this.allValidWords = new Set(officialWordList);
    
    // Create a Set of all categorized words
    const categorizedWords = new Set([
      ...this.categorizedData.determiners,
      ...this.categorizedData.adjectives.descriptive,
      ...this.categorizedData.adjectives.quality,
      ...this.categorizedData.nouns.people,
      ...this.categorizedData.verbs.action,
      ...this.categorizedData.directions,
      ...this.categorizedData.nouns.places,
      ...this.categorizedData.timeWords,
      ...this.categorizedData.conjunctions
    ]);

    // Check for uncategorized BIP39 words
    const uncategorizedWords = Array.from(this.allValidWords)
      .filter(word => !categorizedWords.has(word));

    if (uncategorizedWords.length > 0) {
      console.warn('Found uncategorized BIP39 words:', uncategorizedWords);
      console.warn(`Total uncategorized words: ${uncategorizedWords.length}`);
    }

    // Filter out any words that aren't in the official BIP39 wordlist
    for (const category in this.wordLists) {
      this.wordLists[category] = this.wordLists[category].filter(word => 
        this.allValidWords.has(word)
      );
    }

    // Create human-readable category names
    this.categoryNames = {
      article: 'Article',
      adjective: 'Adjective',
      person: 'Person',
      action: 'Action',
      direction: 'Direction',
      place: 'Place',
      timeWord: 'Time Word',
      conjunction: 'Conjunction'
    };
  }

  public static getInstance(): WordListManager {
    if (!WordListManager.instance) {
      WordListManager.instance = new WordListManager();
    }
    return WordListManager.instance;
  }

  public getWordLists(): CategoryWordLists {
    return this.wordLists;
  }

  public getAllValidWords(): Set<string> {
    return this.allValidWords;
  }

  public getCategoryNames(): { [key: string]: string } {
    return this.categoryNames;
  }

  public getWordsForCategory(category: string): string[] {
    return this.wordLists[category] || [];
  }

  public isValidWord(word: string): boolean {
    return this.allValidWords.has(word.toLowerCase());
  }

  // Get list of uncategorized BIP39 words
  public getUncategorizedWords(): string[] {
    const categorizedWords = new Set([
      ...this.wordLists.article,
      ...this.wordLists.adjective,
      ...this.wordLists.person,
      ...this.wordLists.action,
      ...this.wordLists.direction,
      ...this.wordLists.place,
      ...this.wordLists.timeWord,
      ...this.wordLists.conjunction
    ]);

    return Array.from(this.allValidWords)
      .filter(word => !categorizedWords.has(word))
      .sort();
  }

  // Helper method to get coverage statistics
  public getCoverageStats(): {
    total: number;
    categorized: number;
    uncategorized: number;
    percentage: number;
  } {
    const total = this.allValidWords.size;
    const uncategorized = this.getUncategorizedWords().length;
    const categorized = total - uncategorized;
    const percentage = (categorized / total) * 100;

    return {
      total,
      categorized,
      uncategorized,
      percentage
    };
  }

  // Helper method to validate words
  public validateWords(words: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    words.forEach(word => {
      if (this.isValidWord(word)) {
        valid.push(word);
      } else {
        invalid.push(word);
      }
    });

    return { valid, invalid };
  }

  // Get all categories that contain a specific word
  public getCategoriesForWord(word: string): string[] {
    const categories: string[] = [];
    for (const [category, words] of Object.entries(this.wordLists)) {
      if (words.includes(word.toLowerCase())) {
        categories.push(category);
      }
    }
    return categories;
  }
}

export default WordListManager;