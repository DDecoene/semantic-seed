import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface WordReplacement {
  originalWord: string;
  newWord: string;
  category: string;
  index: number;
}

interface WordSuggestionsProps {
  originalSentence: string;
  suggestions: Array<{
    sentence: string;
    replacements: WordReplacement[];
  }>;
  onApplySuggestion: (sentence: string) => void;
}

const WordSuggestions: React.FC<WordSuggestionsProps> = ({
  originalSentence,
  suggestions,
  onApplySuggestion,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Original phrase:</p>
        <p className="font-medium">{originalSentence}</p>
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        Try these valid alternatives:
      </p>

      <div className="space-y-4">
        {suggestions.slice(0, 3).map((suggestion, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                  <p className="font-medium mb-2">{suggestion.sentence}</p>
                  <div className="text-sm text-muted-foreground">
                    Changes:
                    <ul className="list-disc list-inside mt-1">
                      {suggestion.replacements.map((replacement, i) => (
                        <li key={i}>
                          Replace "{replacement.originalWord}" with "{replacement.newWord}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button 
                  onClick={() => onApplySuggestion(suggestion.sentence)}
                  variant="outline"
                  className="shrink-0 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Use This
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WordSuggestions;