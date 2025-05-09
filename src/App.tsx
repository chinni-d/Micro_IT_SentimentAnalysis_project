import React, { useState, useEffect } from 'react';
import { AlertTriangle, Brain } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import SentimentForm from './components/SentimentForm';
import SentimentResult from './components/SentimentResult';
import History from './components/History';
import { EnhancedSentimentResult } from './utils/sentimentAnalyzer';

interface HistoryEntry {
  id: string;
  text: string;
  result: EnhancedSentimentResult;
  timestamp: number;
}

function App() {
  const [currentText, setCurrentText] = useState<string>('');
  const [result, setResult] = useState<EnhancedSentimentResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('sentimentHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
        setIsFirstVisit(false);
      } catch (error) {
        console.error('Failed to parse history from localStorage:', error);
        localStorage.removeItem('sentimentHistory');
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sentimentHistory', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = (text: string, result: EnhancedSentimentResult) => {
    setCurrentText(text);
    setResult(result);
    setIsFirstVisit(false);
    
    // Add to history
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      text,
      result,
      timestamp: Date.now()
    };
    
    setHistory(prevHistory => [newEntry, ...prevHistory].slice(0, 10)); // Keep only the 10 most recent entries
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Brain className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Sentiment Analyzer
            </h1>
          </div>
          <ThemeToggle />
        </header>
        
        <main>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Analyze Text Sentiment
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter any text below to analyze its sentiment. The analyzer will classify it as positive, negative, or neutral.
            </p>
            
            <SentimentForm 
              onAnalyze={(result) => handleAnalyze(currentText, result)} 
              onTextChange={setCurrentText}
              text={currentText}
            />
            
            {result ? (
              <SentimentResult result={result} />
            ) : isFirstVisit ? (
              <div className="mt-6 p-6 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <p className="text-blue-600 dark:text-blue-300">
                    Enter some text and click "Analyze Sentiment" to see the results.
                  </p>
                </div>
              </div>
            ) : null}
            
            <History 
              history={history}
              onClearHistory={handleClearHistory}
              onDeleteHistoryItem={handleDeleteHistoryItem}
            />
          </div>
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Sentiment Analyzer. AI-powered text analysis.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;