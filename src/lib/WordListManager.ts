import wordListsData from '@/data/word-lists.json';

export interface WordLists {
  [key: string]: string[];
}

class WordListManager {
  private static instance: WordListManager;
  private wordLists: WordLists;
  private allValidWords: Set<string>;
  private categoryNames: { [key: string]: string };

  private constructor() {
    this.wordLists = wordListsData;
    this.allValidWords = new Set(
      Object.values(this.wordLists).flat()
    );
    this.categoryNames = Object.keys(this.wordLists).reduce((acc, key) => {
      // Convert camelCase to Title Case
      const title = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      acc[key] = title;
      return acc;
    }, {} as { [key: string]: string });
  }

  public static getInstance(): WordListManager {
    if (!WordListManager.instance) {
      WordListManager.instance = new WordListManager();
    }
    return WordListManager.instance;
  }

  public getWordLists(): WordLists {
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
}

export default WordListManager;
