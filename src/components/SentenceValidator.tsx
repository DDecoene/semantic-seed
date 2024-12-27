import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";

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

const SentenceValidator: React.FC<SentenceValidatorProps> = ({
  inputSentence,
  onInputChange,
  onValidate,
  validationResult,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle>
          <SectionHeader title="BIP39 Sentence Validator" helpKey="validator" />
        </CardTitle>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              placeholder="Type a sentence to validate..."
              value={inputSentence}
              onChange={(e) => onInputChange(e.target.value)}
              className="flex-1"
            />
            <Button onClick={onValidate}>Validate</Button>
          </div>

          {validationResult && (
            <Alert
              variant={validationResult.isValid ? "default" : "destructive"}
            >
              <AlertTitle>
                {validationResult.isValid
                  ? "Valid Sentence"
                  : "Invalid Sentence"}
              </AlertTitle>
              <AlertDescription>
                {validationResult.message}
                {!validationResult.isValid &&
                  validationResult.invalidWords.length > 0 && (
                    <ul className="mt-2 list-disc list-inside">
                      {validationResult.invalidWords.map((word, index) => (
                        <li key={index}>{word}</li>
                      ))}
                    </ul>
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
