import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import officialWordList from '@/data/officialBIP39wordlist.json';

interface ValidationResult {
  isValid: boolean;
  message: string;
  invalidWords: string[];
}

interface SentenceValidatorProps {
  inputSentence: string;
  onInputChange: (value: string) => void;
  onValidate: () => void;
  validationResult: ValidationResult | null;
}

const SentenceValidator:React.FC<SentenceValidatorProps> = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const officialBIP39Set = new Set(officialWordList);

  const validateSentence = () => {
    if (!inputSentence.trim()) {
      setValidationResult(null);
      return;
    }

    const words = inputSentence.toLowerCase().trim().split(/\s+/);
    const invalidWords = words.filter(word => !officialBIP39Set.has(word));

    if (invalidWords.length === 0) {
      setValidationResult({
        isValid: true,
        message: 'All words are valid BIP39 words!',
        invalidWords: []
      });
    } else {
      setValidationResult({
        isValid: false,
        message: 'The following words are not in the BIP39 wordlist:',
        invalidWords
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>BIP39 Sentence Validator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              placeholder="Type a sentence to validate..."
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              className="flex-1"
            />
            <Button onClick={validateSentence}>
              Validate
            </Button>
          </div>

          {validationResult && (
            <Alert variant={validationResult.isValid ? "default" : "destructive"}>
              <AlertTitle>
                {validationResult.isValid ? "Valid BIP39 Sentence" : "Invalid BIP39 Sentence"}
              </AlertTitle>
              <AlertDescription>
                {validationResult.message}
                {!validationResult.isValid && validationResult.invalidWords.length > 0 && (
                  <>
                    <ul className="mt-2 list-disc list-inside">
                      {validationResult.invalidWords.map((word, index) => (
                        <li key={index}>{word}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm">All words must be from the official BIP39 wordlist.</p>
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceValidator;