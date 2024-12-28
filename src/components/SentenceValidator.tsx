import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import SectionHeader from "./SectionHeader";
import WordListManager, { ValidationResult } from "@/lib/WordListManager";

export interface SentenceValidatorProps {
  initialSentence?: string;
  onValidationResult?: (result: ValidationResult | null) => void;
}

const SentenceValidator: React.FC<SentenceValidatorProps> = ({ 
  initialSentence = '',
  onValidationResult 
}) => {
  const [inputSentence, setInputSentence] = useState(initialSentence);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const wordListManager = WordListManager.getInstance();

  const handleValidate = useCallback(() => {
    if (!inputSentence.trim()) {
      const nullResult = null;
      setValidationResult(nullResult);
      onValidationResult?.(nullResult);
      return;
    }

    const result = wordListManager.validateMnemonic(inputSentence);
    setValidationResult(result);
    onValidationResult?.(result);
  }, [inputSentence, onValidationResult]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSentence(e.target.value);
    // Clear validation when input changes
    if (validationResult) {
      setValidationResult(null);
      onValidationResult?.(null);
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
              onClick={handleValidate}
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
              <AlertDescription className="space-y-2">
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
                {validationResult.isValid && (
                  <p className="text-sm text-muted-foreground mt-2">
                    This is a valid BIP39 seed phrase with the correct checksum.
                  </p>
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