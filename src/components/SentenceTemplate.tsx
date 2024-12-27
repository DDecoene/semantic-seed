import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import SectionHeader from './SectionHeader';

// 12-word templates (grammatically correct sentences)
const TEMPLATES_12 = [
  {
    name: "Simple Journey",
    structure: ["article", "adjective", "person", "action", "direction", "article", "adjective", "place", "conjunction", "timeWord", "action", "direction"],
    example: "the brave warrior walks toward the ancient castle when night falls down"
  },
  {
    name: "Double Action",
    structure: ["article", "adjective", "person", "action", "direction", "article", "place", "conjunction", "action", "direction", "article", "place"],
    example: "the swift pilot flies over the mountain and glides toward the valley"
  },
  {
    name: "Time Adventure",
    structure: ["timeWord", "article", "adjective", "person", "action", "direction", "article", "place", "conjunction", "action", "article", "place"],
    example: "tonight the brave hero runs through the forest and enters the castle"
  },
  {
    name: "Place Description",
    structure: ["article", "adjective", "place", "direction", "article", "adjective", "place", "action", "article", "person", "direction", "place"],
    example: "the dark forest behind the ancient temple guides the warrior toward home"
  },
  {
    name: "Double Description",
    structure: ["article", "adjective", "adjective", "person", "action", "direction", "article", "adjective", "adjective", "place", "timeWord", "direction"],
    example: "the brave swift teacher moves toward the dark ancient castle now forward"
  }
];

// 24-word templates (grammatically correct sentences)
const TEMPLATES_24 = [
  {
    name: "Epic Journey",
    structure: [
      "article", "adjective", "person", "action", "direction", "article", "adjective", "place",
      "conjunction", "timeWord", "article", "adjective", "person", "action", "direction",
      "article", "adjective", "place", "conjunction", "timeWord", "action", "direction", "article", "place"
    ],
    example: "the brave warrior walks toward the ancient castle when dawn the swift doctor flies above the dark mountain and tonight moves behind the temple"
  },
  {
    name: "Parallel Actions",
    structure: [
      "timeWord", "article", "adjective", "person", "action", "direction", "article", "place",
      "conjunction", "article", "adjective", "person", "action", "direction", "article",
      "place", "conjunction", "article", "adjective", "person", "action", "direction", "article", "place"
    ],
    example: "today the quick pilot flies over the ocean while the brave warrior runs through the forest and the swift doctor moves toward the castle"
  },
  {
    name: "Triple Location",
    structure: [
      "article", "adjective", "person", "action", "direction", "article", "adjective", "place",
      "conjunction", "action", "direction", "article", "adjective", "place", "conjunction",
      "timeWord", "action", "direction", "article", "adjective", "place", "conjunction", "article", "place"
    ],
    example: "the swift hero moves through the ancient forest and flies toward the dark mountain when night glides above the huge castle near the ocean"
  },
  {
    name: "Time Sequence",
    structure: [
      "timeWord", "article", "adjective", "person", "action", "direction", "article", "place",
      "conjunction", "timeWord", "article", "adjective", "person", "action", "article",
      "place", "conjunction", "timeWord", "article", "adjective", "person", "action", "article", "place"
    ],
    example: "dawn the brave warrior walks toward the castle and morning the swift pilot enters the mountain while night the quick doctor leaves the temple"
  },
  {
    name: "Complex Journey",
    structure: [
      "article", "adjective", "person", "action", "direction", "article", "adjective", "place",
      "conjunction", "article", "adjective", "person", "action", "direction", "article",
      "adjective", "place", "timeWord", "conjunction", "action", "direction", "article", "adjective", "place"
    ],
    example: "the brave warrior moves through the ancient forest and the swift pilot flies over the dark mountain tonight then glides toward the huge castle"
  }
];

interface SentenceTemplateProps {
  onTemplateSelect: (structure: string[]) => void;
}

const SentenceTemplate: React.FC<SentenceTemplateProps> = ({ onTemplateSelect }) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle><SectionHeader title='Template Selection' helpKey='template'/></CardTitle>
        <Select onValueChange={(value) => {
          const template = [...TEMPLATES_12, ...TEMPLATES_24].find(t => t.name === value);
          if (template) {
            onTemplateSelect(template.structure);
          }
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a sentence template..." />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              12-Word Templates
            </div>
            {TEMPLATES_12.map((template) => (
              <SelectItem key={template.name} value={template.name}>
                {template.name}
              </SelectItem>
            ))}
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              24-Word Templates
            </div>
            {TEMPLATES_24.map((template) => (
              <SelectItem key={template.name} value={template.name}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default SentenceTemplate;