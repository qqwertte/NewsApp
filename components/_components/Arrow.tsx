import React from "react";

interface ArrowProps {
    url: string;
}

export const Arrow: React.FC<ArrowProps> = ({ url }) => {
    const handleClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div onClick={handleClick} className="cursor-pointer p-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>
    );
};
