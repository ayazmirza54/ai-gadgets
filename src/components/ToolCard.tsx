import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface ToolCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  onClick: () => void;
}

export function ToolCard({ title, description, price, rating, imageUrl, onClick }: ToolCardProps) {
  return (
    <div className="overflow-hidden transition-all duration-200 atari-card">
      <div className="relative aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            imageRendering: 'pixelated'
          }}
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-none flex items-center gap-1 atari-rating">
          <Star className="w-4 h-4 text-white fill-current" />
          <span className="text-white text-xs">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-bold mb-3 atari-card-title shimmer-text">
          {title}
        </h3>

        <p className="mb-6 line-clamp-2 atari-card-description">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="atari-price shimmer-text">
            ${price}
          </span>

          <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 atari-button"
          >
            <span>VIEW</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}