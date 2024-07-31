"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, BookMarked, House } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewsGrid } from "@/components/_components/NewsGrid";
import Link from 'next/link';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source?: { name: string };
    publishedAt?: string;
}

export default function Page() {
    const [savedItems, setSavedItems] = useState<NewsArticle[]>([]);
    const [filteredItems, setFilteredItems] = useState<NewsArticle[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const storedItems: NewsArticle[] = JSON.parse(localStorage.getItem('savedItems') || '[]');
        setSavedItems(storedItems);
        setFilteredItems(storedItems);
    }, []);

    useEffect(() => {
        const filtered: NewsArticle[] = savedItems.filter(item =>
            (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredItems(filtered);
    }, [searchTerm, savedItems]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (item: NewsArticle) => {
        const storedItems: NewsArticle[] = JSON.parse(localStorage.getItem('savedItems') || '[]');
        const updatedItems = storedItems.filter(savedItem => savedItem.url !== item.url);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
        setSavedItems(updatedItems);
        setFilteredItems(updatedItems);
    };

    return(
        <div className="flex min-h-screen bg-gray-100 p-4">
            <div className="w-full h-full space-y-4">
                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" size="icon">
                                <Menu className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/">
                                    <span className="flex items-center space-x-2 cursor-pointer">
                                        <House className="h-5 w-5 text-blue-500"/>
                                        <span>Home Page</span>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/saved">
                                    <span className="flex items-center space-x-2 cursor-pointer">
                                        <BookMarked className="h-5 w-5 text-green-500"/>
                                        <span>Saved</span>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Input
                        type="text"
                        placeholder="Search saved news..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1"
                    />
                </div>

                <NewsGrid items={filteredItems} onDelete={handleDelete} />
            </div>
        </div>
    );
}
