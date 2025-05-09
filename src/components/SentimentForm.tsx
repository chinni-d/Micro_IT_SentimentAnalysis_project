import React, { useState } from 'react';
import { analyzeSentiment, EnhancedSentimentResult } from '../utils/sentimentAnalyzer';

interface SentimentFormProps {
  onAnalyze: (result: EnhancedSentimentResult) => void;
  onTextChange: (text: string) => void;
  text: string;
}

const SentimentForm: React.FC<SentimentFormProps> = ({ onAnalyze, onTextChange, text }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate a brief delay to give the impression of processing
    setTimeout(() => {
      const result = analyzeSentiment(text);
      onAnalyze(result);
      setIsAnalyzing(false);
    }, 500);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };
  
  const handleClear = () => {
    onTextChange('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="group relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to analyze sentiment..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
                     transition-all duration-200 ease-in-out resize-none"
          disabled={isAnalyzing}
        />
        {text && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 
                       dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Clear text"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!text.trim() || isAnalyzing}
        className={`mt-4 w-full py-3 px-4 rounded-lg text-white font-medium 
                   transition-all duration-200 ease-in-out
                   ${!text.trim() || isAnalyzing 
                     ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' 
                     : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md hover:shadow-lg'}`}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          'Analyze Sentiment'
        )}
      </button>
    </form>
  );
};

export default SentimentForm;