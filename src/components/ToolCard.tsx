import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface ToolCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  price,
  rating,
  thumbnailUrl,
  onClick
}) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 transition-all hover:border-zinc-700 atari-card">
      <div className="w-full h-48 overflow-hidden bg-zinc-800">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=AI+Tool';
          }}
          loading="lazy"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-emerald-500">{price}</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-400">{rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          onClick={onClick}
          className="mt-4 w-full py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition atari-button"
        >
          View
        </button>
      </div>
    </div>
  );
};