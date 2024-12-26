import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import _ from 'lodash';
import { wordLists, allValidWords } from '@/lib/word-lists';
import CategorySelector from './CategorySelector';
import SentenceStructure from './SentenceStructure';
import SentenceValidator from './SentenceValidator';

const SentenceGenerator = () => {
  const [sentence, setSentence] = useState('');
  const [structure, setStructure] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [inputSentence, setInputSentence] = useState('');
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

    const words = structure.map(category => {
      const list = wordLists[category as keyof typeof wordLists];
      return _.sample(list);
    });

    setSentence(words.join(' '));
  };

  const validateSentence = () => {
    if (!inputSentence.trim()) {
      setValidationResult(null);
      return;
    }

    const words = inputSentence.toLowerCase().trim().split(/\s+/);
    const invalidWords = words.filter(word => !allValidWords.has(word));

    if (invalidWords.length === 0) {
      setValidationResult({
        isValid: true,
        message: 'All words are valid!',
        invalidWords: []
      });
    } else {
      setValidationResult({
        isValid: false,
        message: 'Some words are not in the word list:',
        invalidWords
      });
    }
  };

  const clearStructure = () => {
    setStructure([]);
    setSentence('');
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
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

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>BIP39 Sentence Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <CategorySelector onAddCategory={addCategory} />
            
            <SentenceStructure
              structure={structure}
              onRemoveCategory={removeCategory}
              onClearStructure={clearStructure}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            />

            <div className="flex gap-4">
              <Button 
                onClick={generateSentence}
                disabled={structure.length === 0}
                className="w-full"
              >
                Generate Sentence
              </Button>
            </div>

            {sentence && (
              <div className="border rounded p-4">
                <h3 className="font-medium mb-2">Generated Sentence:</h3>
                <p className="bg-gray-100 rounded p-4">{sentence}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SentenceValidator
        inputSentence={inputSentence}
        onInputChange={setInputSentence}
        onValidate={validateSentence}
        validationResult={validationResult}
      />
    </div>
  );
};

export default SentenceGenerator;