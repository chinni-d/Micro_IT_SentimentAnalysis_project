import React from 'react';
import { EnhancedSentimentResult } from '../utils/sentimentAnalyzer';
import HistoryItem from './HistoryItem';

interface HistoryEntry {
  id: string;
  text: string;
  result: EnhancedSentimentResult;
  timestamp: number;
}

interface HistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory, onDeleteHistoryItem }) => {
  if (history.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">History</h2>
        <button 
          onClick={onClearHistory}
          className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {history.map((entry) => (
          <HistoryItem 
            key={entry.id}
            text={entry.text}
            result={entry.result}
            onDelete={() => onDeleteHistoryItem(entry.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default History;