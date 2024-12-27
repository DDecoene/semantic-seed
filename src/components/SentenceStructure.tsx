import React from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowDown, GripVertical } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface SentenceStructureProps {
  structure: string[];
  categoryNames: { [key: string]: string };
  onRemoveCategory: (index: number) => void;
  onClearStructure: () => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const SentenceStructure: React.FC<SentenceStructureProps> = ({
  structure,
  categoryNames,
  onRemoveCategory,
  onClearStructure,
  onDragStart,
  onDragOver,
  onDragEnd
}) => {
  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium"><SectionHeader title='Current Structure:' helpKey='structure'/></h3>
        {structure.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClearStructure}>
            Clear All
          </Button>
        )}
      </div>
      
      {structure.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Add categories to build your sentence structure</p>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          {structure.map((category, index) => (
            <div 
              key={index} 
              className="flex items-center"
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => onDragOver(e, index)}
              onDragEnd={onDragEnd}
            >
              <div className="flex items-center bg-gray-100 rounded px-3 py-1 cursor-move">
                <GripVertical size={14} className="mr-2 text-gray-400" />
                <span className="mr-2">{categoryNames[category]}</span>
                <button
                  onClick={() => onRemoveCategory(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
              {index < structure.length - 1 && (
                <ArrowDown size={16} className="mx-1 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SentenceStructure;