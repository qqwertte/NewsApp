"use client";

import React from 'react';
import { NewsItem } from "@/components/_components/NewsItem";

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source?: { name: string };
    publishedAt?: string;
}

interface NewsGridProps {
    items: NewsArticle[];
    onSave?: (item: NewsArticle) => void;
    onDelete?: (item: NewsArticle) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ items, onSave, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <NewsItem key={index} item={item} onSave={onSave} onDelete={onDelete} />
            ))}
        </div>
    );
};
