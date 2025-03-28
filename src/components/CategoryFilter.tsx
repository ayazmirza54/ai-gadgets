import React from 'react';
import { Brain, Image, MessageSquare, Code, Wand2 } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'ALL TOOLS', icon: Wand2 },
  { id: 'ai', label: 'AI/ML', icon: Brain },
  { id: 'image', label: 'IMAGE', icon: Image },
  { id: 'chat', label: 'CHAT', icon: MessageSquare },
  { id: 'code', label: 'CODE', icon: Code },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 transition-all duration-200 flex items-center gap-2 atari-category-button ${selectedCategory === category.id
              ? 'atari-category-selected'
              : 'atari-category-unselected'
            }`}
        >
          <category.icon className="w-4 h-4" />
          <span className="text-xs">{category.label}</span>
        </button>
      ))}
    </div>
  );
}