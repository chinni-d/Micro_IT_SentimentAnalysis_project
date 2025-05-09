import React from 'react';
import { EnhancedSentimentResult } from '../utils/sentimentAnalyzer';

interface HistoryItemProps {
  text: string;
  result: EnhancedSentimentResult;
  onDelete: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ text, result, onDelete }) => {
  // Determine text color based on sentiment
  const getTextColor = () => {
    switch (result.type) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };
  
  // Truncate text if it's too long
  const truncateText = (str: string, maxLength: number = 60) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">{truncateText(text)}</p>
          <div className="flex items-center mt-1">
            <span className="text-xl mr-2">{result.emoji}</span>
            <span className={`text-sm font-medium ${getTextColor()}`}>
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)} ({result.score})
            </span>
          </div>
        </div>
        <button 
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200"
          aria-label="Delete history item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;