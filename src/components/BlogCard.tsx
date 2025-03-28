import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    source?: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

export function BlogCard({ title, subtitle, date, readTime, source, icon, onClick }: BlogCardProps) {
    return (
        <div
            className="p-6 border-2 border-white bg-black text-white cursor-pointer group relative"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        {icon}
                        <h3 className="text-lg font-bold uppercase shimmer-text">{title}</h3>
                    </div>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                    <div className="text-xs text-gray-400 flex items-center space-x-4 pt-4">
                        <span>{date}</span>
                        <span>•</span>
                        <span>{readTime} read</span>
                        {source && (
                            <>
                                <div className="ml-auto"></div>
                                <span>{source}</span>
                            </>
                        )}
                    </div>
                </div>
                <ArrowUpRight
                    className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
            </div>
        </div>
    );
} 