import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";
import WordListManager from "@/lib/WordListManager";
import WordSuggestions from "./WordSuggestions";
import { BitcoinAddressChecker } from "@/lib/BitcoinAddressChecker";
import _ from 'lodash';

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

interface SentenceValidatorProps {
  sentenceToValidate?: string;
  onValidationComplete?: (result: ValidationResult, validatedText: string) => void;
  onSuggestionApplied?: (sentence: string) => void;
}

const SentenceValidator: React.FC<SentenceValidatorProps> = ({
  sentenceToValidate,
  onValidationComplete,
  onSuggestionApplied
}) => {
  const [inputSentence, setInputSentence] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [lastValidatedSentence, setLastValidatedSentence] = useState<string | undefined>(undefined);
  const [isValidating, setIsValidating] = useState(false);
  const [wordListManager] = useState(() => WordListManager.getInstance());

  const handleValidate = useCallback(async (sentence?: string) => {
    const textToValidate = sentence || inputSentence;
    if (!textToValidate.trim()) {
      setValidationResult(null);
      return;
    }

    setIsValidating(true);

    try {
      // First check against our wordlist
      const result = wordListManager.validateMnemonic(textToValidate);
      
      // If valid in our wordlist, check BIP39 validity
      if (result.isValid) {
        try {
          const isBIP39Valid = await BitcoinAddressChecker.validateMnemonic(textToValidate);
          if (!isBIP39Valid) {
            result.isValid = false;
            result.message = "Seed phrase is not a valid BIP39 mnemonic";
          }
        } catch (error) {
          console.warn('Error validating BIP39:', error);
        }
      }

      // Find alternatives if invalid
      if (!result.isValid) {
        const findAlternatives = async (sentence: string) => {
          try {
            const words = sentence.toLowerCase().trim().split(/\s+/);
            const alternatives: Array<{
              sentence: string;
              replacements: WordReplacement[];
            }> = [];

            // First try BIP39 alternatives
            try {
              const bip39Alternatives = await BitcoinAddressChecker.findValidVariations(sentence);
              alternatives.push(...bip39Alternatives);
            } catch (error) {
              console.warn('Error finding BIP39 alternatives:', error);
            }

            // Then try category-based alternatives if needed
            if (alternatives.length < 3) {
              for (let i = 0; i < words.length; i++) {
                const originalWord = words[i];
                const categories = wordListManager.getCategoriesForWord(originalWord);

                for (const category of categories) {
                  const alternativeWords = wordListManager.getWordsForCategory(category);
                  
                  for (const newWord of alternativeWords) {
                    if (newWord !== originalWord) {
                      const newWords = [...words];
                      newWords[i] = newWord;
                      const newSentence = newWords.join(' ');
                      
                      // Validate both as BIP39 and against our wordlist
                      const validation = wordListManager.validateMnemonic(newSentence);
                      if (validation.isValid) {
                        try {
                          const isBIP39Valid = await BitcoinAddressChecker.validateMnemonic(newSentence);
                          if (isBIP39Valid) {
                            alternatives.push({
                              sentence: newSentence,
                              replacements: [{
                                originalWord,
                                newWord,
                                category,
                                index: i
                              }]
                            });
                          }
                        } catch (error) {
                          console.warn('Error validating BIP39:', error);
                        }
                      }
                    }
                  }
                }
              }
            }

            // Sort by minimal changes and uniqueness
            return _.uniqBy(alternatives, 'sentence')
              .sort((a, b) => a.replacements.length - b.replacements.length)
              .slice(0, 3);
          } catch (error) {
            console.error('Error finding alternatives:', error);
            return [];
          }
        };

        const alternatives = await findAlternatives(textToValidate);
        result.suggestions = alternatives;
      }

      setValidationResult(result);
      
      if (onValidationComplete) {
        onValidationComplete(result, textToValidate);
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: error instanceof Error ? error.message : 'Validation failed',
        invalidWords: [],
      });
    } finally {
      setIsValidating(false);
    }
  }, [inputSentence, onValidationComplete, wordListManager]);

  useEffect(() => {
    if (sentenceToValidate && sentenceToValidate !== lastValidatedSentence) {
      setInputSentence(sentenceToValidate);
      handleValidate(sentenceToValidate);
      setLastValidatedSentence(sentenceToValidate);
    }
  }, [sentenceToValidate, handleValidate, lastValidatedSentence]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputSentence(newValue);
    if (validationResult) {
      setValidationResult(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };

  const handleApplySuggestion = (suggestedSentence: string) => {
    setInputSentence(suggestedSentence);
    handleValidate(suggestedSentence);
    if (onSuggestionApplied) {
      onSuggestionApplied(suggestedSentence);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle>
          <SectionHeader title="BIP39 Validator" helpKey="validator" />
        </CardTitle>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter a seed phrase to validate..."
              value={inputSentence}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={() => handleValidate()}
              className="gap-2"
              variant={validationResult?.isValid ? "default" : "secondary"}
              disabled={isValidating}
            >
              <Shield className="w-4 h-4" />
              {isValidating ? "Validating..." : "Validate"}
            </Button>
          </div>

          {validationResult && (
            <Alert variant={validationResult.isValid ? "default" : "destructive"}>
              <AlertTitle>
                {validationResult.isValid ? "Valid BIP39 Seed Phrase" : "Invalid Seed Phrase"}
              </AlertTitle>
              <AlertDescription>
                <p>{validationResult.message}</p>
                {!validationResult.isValid && validationResult.invalidWords.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium mb-1">Invalid words:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {validationResult.invalidWords.map((word, index) => (
                        <li key={index} className="text-sm font-mono">{word}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {!validationResult?.isValid && validationResult?.suggestions && validationResult.suggestions.length > 0 && (
            <WordSuggestions
              originalSentence={inputSentence}
              suggestions={validationResult.suggestions}
              onApplySuggestion={handleApplySuggestion}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceValidator;