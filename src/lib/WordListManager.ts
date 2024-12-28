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

export interface WordReplacement {
  originalWord: string;
  newWord: string;
  category: string;
  index: number;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  invalidWords: string[];
  suggestions?: Array<{
    sentence: string;
    replacements: WordReplacement[];
  }>;
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

    const uncategorizedWords = this.getUncategorizedWords();
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

  public getCategoriesForWord(word: string): string[] {
    const categories: string[] = [];
    for (const [category, words] of Object.entries(this.wordLists)) {
      if (words.includes(word.toLowerCase())) {
        categories.push(category);
      }
    }
    return categories;
  }

  public validateMnemonic(sentence: string): ValidationResult {
    // Clean and split the input sentence
    const words = sentence.toLowerCase().trim().split(/\s+/);
    
    // Check word count
    if (words.length !== 12 && words.length !== 24) {
      return {
        isValid: false,
        message: "Seed phrase must be exactly 12 or 24 words.",
        invalidWords: []
      };
    }
    
    // Check if all words are valid BIP39 words
    const invalidWords = words.filter(word => !this.isValidWord(word));
    if (invalidWords.length > 0) {
      return {
        isValid: false,
        message: "Some words are not in the BIP39 wordlist:",
        invalidWords
      };
    }

    // Check for duplicate words
    const uniqueWords = new Set(words);
    if (uniqueWords.size !== words.length) {
      // Find the duplicated words
      const duplicates = words.filter((word, index) => words.indexOf(word) !== index);
      return {
        isValid: false,
        message: "Seed phrase cannot contain duplicate words:",
        invalidWords: Array.from(new Set(duplicates)) // Only show each duplicate once
      };
    }

    return {
      isValid: true,
      message: "Valid seed phrase - all words are unique and from the BIP39 wordlist",
      invalidWords: []
    };
  }
}

export default WordListManager;