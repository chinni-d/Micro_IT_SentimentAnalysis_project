import React from 'react';
import { EnhancedSentimentResult } from '../utils/sentimentAnalyzer';

interface SentimentResultProps {
  result: EnhancedSentimentResult | null;
}

const SentimentResult: React.FC<SentimentResultProps> = ({ result }) => {
  if (!result) return null;
  
  const { type, emoji, score, comparative } = result;
  
  // Determine background color based on sentiment
  const getBgColor = () => {
    switch (type) {
      case 'positive':
        return 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800';
    }
  };
  
  // Determine text color based on sentiment
  const getTextColor = () => {
    switch (type) {
      case 'positive':
        return 'text-green-700 dark:text-green-400';
      case 'negative':
        return 'text-red-700 dark:text-red-400';
      default:
        return 'text-yellow-700 dark:text-yellow-400';
    }
  };
  
  // Format sentiment score for display
  const formatScore = (score: number) => {
    return score.toFixed(2);
  };
  
  // Add animation class based on sentiment
  const getAnimationClass = () => {
    switch (type) {
      case 'positive':
        return 'animate-pulse-slow';
      case 'negative':
        return 'animate-shake-subtle';
      default:
        return 'animate-float';
    }
  };
  
  return (
    <div className={`mt-6 p-6 rounded-lg border transition-all duration-500 ${getBgColor()}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className={`text-6xl ${getAnimationClass()}`}>
          {emoji}
        </div>
        <h2 className={`text-2xl font-semibold capitalize ${getTextColor()}`}>
          {type}
        </h2>
        <div className="mt-2 w-full grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{score}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Intensity</p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{formatScore(comparative)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentResult;