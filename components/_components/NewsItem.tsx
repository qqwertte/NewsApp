"use client";

import React, { useState, useEffect } from 'react';
import { Arrow } from "@/components/_components/Arrow";
import { Bookmark, Trash2 } from 'lucide-react';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source?: { name: string };
    publishedAt?: string;
}

interface NewsItemProps {
    item: NewsArticle;
    onSave?: (item: NewsArticle) => void;
    onDelete?: (item: NewsArticle) => void;
}

export const NewsItem: React.FC<NewsItemProps> = ({ item, onSave, onDelete }) => {
    const websiteUrl = item.url;
    const date = item.publishedAt || '';
    const formatDate = date.replace('T', ' ').replace('Z', ' ');

    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const savedItems: NewsArticle[] = JSON.parse(localStorage.getItem('savedItems') || '[]');
        setIsSaved(savedItems.some(savedItem => savedItem.url === item.url));
    }, [item]);

    const handleSave = () => {
        if (onSave) {
            onSave(item);
            setIsSaved(true);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(item);
            setIsSaved(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-4 overflow-hidden">
                {item.urlToImage && (
                    <img src={item.urlToImage} alt={item.title} className="w-10 h-10 flex-shrink-0 rounded-full" />
                )}
                <div id="article-content" className="overflow-hidden">
                    <div id="article-title" className="text-lg font-semibold truncate">
                        {item.title}
                    </div>
                    <div id="article-source" className="text-sm text-gray-500 truncate">
                        {item.source?.name}
                    </div>
                    {item.description && (
                        <p id="article-description" className="text-sm text-gray-700 truncate">{item.description}</p>
                    )}
                    <div id="article-detail" className="text-xs text-gray-500">
                        <small><b>Published at:</b> {formatDate}</small>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Arrow url={item.url} />
                {isSaved ? (
                    <Trash2
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleDelete}
                        className={`h-6 w-6 cursor-pointer transition-transform ${
                            isHovered ? 'animate-pulse text-red-600' : 'text-red-400'
                        }`}
                    />
                ) : (
                    <Bookmark
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleSave}
                        className={`h-6 w-6 cursor-pointer transition-transform ${
                            isSaved ? 'text-black' : isHovered ? 'animate-pulse text-gray-600' : 'text-gray-400'
                        } ${isSaved ? 'fill-current' : ''}`}
                    />
                )}
            </div>
        </div>
    );
};
