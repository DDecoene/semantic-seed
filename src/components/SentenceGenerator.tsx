import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RefreshCw, Wand2 } from "lucide-react";
import _ from "lodash";
import WordListManager from "@/lib/WordListManager";
import CategorySelector from "./CategorySelector";
import SentenceStructure from "./SentenceStructure";
import SentenceValidator from "./SentenceValidator";
import SentenceTemplate from "./SentenceTemplate";
import SectionHeader from "./SectionHeader";

const SentenceGenerator = () => {
  const [wordListManager] = useState(() => WordListManager.getInstance());
  const [sentence, setSentence] = useState("");
  const [structure, setStructure] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [inputSentence, setInputSentence] = useState("");
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    invalidWords: string[];
  } | null>(null);

  const addCategory = (category: string) => {
    setStructure([...structure, category]);
  };

  const removeCategory = (index: number) => {
    const newStructure = [...structure];
    newStructure.splice(index, 1);
    setStructure(newStructure);
  };

  const generateSentence = () => {
    if (structure.length === 0) return;

    const words = structure.map((category) => {
      const list = wordListManager.getWordsForCategory(category);
      return _.sample(list);
    });

    setSentence(words.join(" "));
  };

  const validateSentence = useCallback(() => {
    if (!inputSentence.trim()) {
      setValidationResult(null);
      return;
    }

    const words = inputSentence.toLowerCase().trim().split(/\s+/);
    const invalidWords = words.filter(
      (word) => !wordListManager.isValidWord(word)
    );

    if (invalidWords.length === 0) {
      setValidationResult({
        isValid: true,
        message: "All words are valid BIP39 words!",
        invalidWords: [],
      });
    } else {
      setValidationResult({
        isValid: false,
        message: "Some words are not in the BIP39 wordlist:",
        invalidWords,
      });
    }
  }, [inputSentence, wordListManager]);

  const clearStructure = () => {
    setStructure([]);
    setSentence("");
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newStructure = [...structure];
    const draggedItem = newStructure[draggedIndex];
    newStructure.splice(draggedIndex, 1);
    newStructure.splice(index, 0, draggedItem);

    setStructure(newStructure);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleTemplateSelect = (templateStructure: string[]) => {
    setStructure(templateStructure);
    setSentence("");
  };

  const handleValidateGenerated = () => {
    setInputSentence(sentence);
    const words = sentence.toLowerCase().trim().split(/\s+/);
    const invalidWords = words.filter(
      (word) => !wordListManager.isValidWord(word)
    );

    if (invalidWords.length === 0) {
      setValidationResult({
        isValid: true,
        message: "All words are valid BIP39 words!",
        invalidWords: [],
      });
    } else {
      setValidationResult({
        isValid: false,
        message: "Some words are not in the BIP39 wordlist:",
        invalidWords,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="relative overflow-hidden border-accent-blue/10 hover:border-accent-blue/20 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.05] to-transparent" />
        <CardHeader className="relative border-b">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-accent-blue" />
            BIP39 Sentence Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="relative p-6">
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
              <SentenceTemplate onTemplateSelect={handleTemplateSelect} />
            </div>

            {/* Category Selection */}
            <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
              <CategorySelector
                onAddCategory={addCategory}
                categories={wordListManager.getCategoryNames()}
              />
            </div>

            {/* Current Structure */}
            <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
              <SentenceStructure
                structure={structure}
                categoryNames={wordListManager.getCategoryNames()}
                onRemoveCategory={removeCategory}
                onClearStructure={clearStructure}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={generateSentence}
                disabled={structure.length === 0}
                className="w-full max-w-md gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-accent-blue hover:bg-accent-blue/90"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Sentence
              </Button>
            </div>

            {/* Generated Sentence */}
            {sentence && (
              <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
                <Card className="w-full">
                  <CardContent className="pt-6">
                    <CardTitle>
                      <SectionHeader
                        title="Generated Sentence"
                        helpKey="generated"
                      />
                    </CardTitle>
                    <p className="bg-white/50 rounded-lg p-4 shadow-sm font-medium">
                      {sentence}
                    </p>

                    <Button
                      onClick={handleValidateGenerated}
                      className="shrink-0"
                    >
                      Validate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Validator Section */}
            <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
              <SentenceValidator
                inputSentence={inputSentence}
                onInputChange={setInputSentence}
                onValidate={validateSentence}
                validationResult={validationResult}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentenceGenerator;
