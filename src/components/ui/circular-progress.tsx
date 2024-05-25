import React from 'react';

const CircularProgress = ({ percentage }: any) => {
    const getColor = (percentage: any) => {
        if (percentage <= 30) return '#4caf50';  // Green
        if (percentage > 30 && percentage <= 60) return '#ffeb3b';  // Yellow
        return '#f44336';  // Red
    };

    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-20 h-20">
                <circle
                    className="text-gray-300"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className="transition-all duration-300 ease-in-out"
                    strokeWidth="5"
                    stroke={getColor(percentage)}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <div className="absolute text-xl font-bold">{percentage}%</div>
        </div>
    );
};

export default CircularProgress;
