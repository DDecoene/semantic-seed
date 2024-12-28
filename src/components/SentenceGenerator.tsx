import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RefreshCw, Wand2, CheckCircle } from "lucide-react";
import _ from "lodash";
import WordListManager from "@/lib/WordListManager";
import CategorySelector from "./CategorySelector";
import SentenceStructure from "./SentenceStructure";
import SentenceValidator, { ValidationResult } from "./SentenceValidator";
import SentenceTemplate from "./SentenceTemplate";
import SectionHeader from "./SectionHeader";
import OnlineWalletChecker from "./OnlineWalletChecker";

const SentenceGenerator = () => {
  const [wordListManager] = useState(() => WordListManager.getInstance());
  const [sentence, setSentence] = useState("");
  const [structure, setStructure] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

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
    setValidationResult(null);
  };

  const clearStructure = () => {
    setStructure([]);
    setSentence("");
    setValidationResult(null);
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

  const validateCurrentSentence = () => {
    const result = wordListManager.validateMnemonic(sentence);
    setValidationResult(result);
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
                    <div className="flex justify-between items-center mb-4">
                      <SectionHeader
                        title="Generated Sentence"
                        helpKey="generated"
                      />
                      <Button
                        onClick={validateCurrentSentence}
                        variant="outline"
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Validate Phrase
                      </Button>
                    </div>
                    <p className="bg-white/50 rounded-lg p-4 shadow-sm font-medium">
                      {sentence}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Validator Section */}
            <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
              <SentenceValidator
                sentenceToValidate={validationResult ? sentence : undefined}
              />
            </div>

            {/* Online Wallet Checker - only show if sentence is valid */}
            {sentence && validationResult?.isValid && (
              <div className="bg-gradient-to-br from-accent-blue/5 to-transparent rounded-lg p-6">
                <OnlineWalletChecker sentence={sentence} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentenceGenerator;