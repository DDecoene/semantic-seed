import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CategorySelectorProps {
  onAddCategory: (category: string) => void;
  categories: { [key: string]: string };
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  onAddCategory,
  categories
}) => {
  return (
    <div className="border rounded p-4">
      <h3 className="font-medium mb-3">Add Categories:</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(categories).map(([key, name]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => onAddCategory(key)}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;