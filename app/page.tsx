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
import axios from 'axios';
import Link from 'next/link';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source?: { name: string };
    publishedAt?: string;
}

export default function Home() {
    const [items, setItems] = useState<NewsArticle[]>([]);
    const [filteredItems, setFilteredItems] = useState<NewsArticle[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    //const API_KEY:string = process.env.API_KEY;
    const API_KEY:string = '64e66ce130564571962466e3d64ec828'

    useEffect(() => {
        axios.get<{ articles: NewsArticle[] }>(`https://newsapi.org/v2/top-headlines?country=ua&apiKey=${API_KEY}`)
            .then(response => {
                setItems(response.data.articles);
                setFilteredItems(response.data.articles);
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    useEffect(() => {
        const filtered: NewsArticle[] = items.filter(item =>
            (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredItems(filtered);
    }, [searchTerm, items]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSave = (item: NewsArticle) => {
        const savedItems: NewsArticle[] = JSON.parse(localStorage.getItem('savedItems') || '[]');
        if (!savedItems.some(savedItem => savedItem.url === item.url)) {
            const updatedItems = [...savedItems, item];
            localStorage.setItem('savedItems', JSON.stringify(updatedItems));
        }
    };

    const handleDelete = (item: NewsArticle) => {
        const savedItems: NewsArticle[] = JSON.parse(localStorage.getItem('savedItems') || '[]');
        const updatedItems = savedItems.filter(savedItem => savedItem.url !== item.url);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
    };

    return (
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
                        placeholder="Search news here..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1"
                    />
                </div>

                <NewsGrid items={filteredItems} onSave={handleSave} onDelete={handleDelete} />
            </div>
        </div>
    );
}
