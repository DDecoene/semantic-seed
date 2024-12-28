import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import SectionHeader from "./SectionHeader";
import WordListManager from "@/lib/WordListManager";

export interface ValidationResult {
  isValid: boolean;
  message: string;
  invalidWords: string[];
}

interface SentenceValidatorProps {
  sentenceToValidate?: string;
  onValidationComplete?: (result: ValidationResult, validatedText: string) => void;
}

const SentenceValidator: React.FC<SentenceValidatorProps> = ({
  sentenceToValidate,
  onValidationComplete
}) => {
  const [inputSentence, setInputSentence] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [lastValidatedSentence, setLastValidatedSentence] = useState<string | undefined>(undefined);
  const wordListManager = WordListManager.getInstance();

  const handleValidate = useCallback((sentence?: string) => {
    const textToValidate = sentence || inputSentence;
    if (!textToValidate.trim()) {
      setValidationResult(null);
      return;
    }

    const result = wordListManager.validateMnemonic(textToValidate);
    setValidationResult(result);
    if (onValidationComplete) {
      onValidationComplete(result, textToValidate);
    }
  }, [inputSentence, onValidationComplete, wordListManager]);

  useEffect(() => {
    // Only update input if we receive a new sentence to validate
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
            >
              <Shield className="w-4 h-4" />
              Validate
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceValidator;