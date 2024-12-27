import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Card, CardContent, CardTitle } from "./ui/card";

interface CategorySelectorProps {
  onAddCategory: (category: string) => void;
  categories: { [key: string]: string };
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onAddCategory,
  categories,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle>
          <SectionHeader title="Add categories" helpKey="category" />
        </CardTitle>
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
      </CardContent>
    </Card>
  );
};

export default CategorySelector;
