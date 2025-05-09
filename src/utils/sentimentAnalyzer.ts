import Sentiment from 'sentiment';

export interface SentimentResult {
  score: number;
  comparative: number;
  calculation: Record<string, number>;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface EnhancedSentimentResult extends SentimentResult {
  type: SentimentType;
  emoji: string;
}

// Initialize sentiment analyzer
const analyzer = new Sentiment();

export const analyzeSentiment = (text: string): EnhancedSentimentResult => {
  // Check if text is empty or just whitespace
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      comparative: 0,
      calculation: {},
      tokens: [],
      words: [],
      positive: [],
      negative: [],
      type: 'neutral',
      emoji: '😐'
    };
  }

  // Analyze the text
  const result = analyzer.analyze(text);
  
  // Determine sentiment type and emoji
  let type: SentimentType;
  let emoji: string;
  
  if (result.score > 0) {
    type = 'positive';
    emoji = '😊';
  } else if (result.score < 0) {
    type = 'negative';
    emoji = '😞';
  } else {
    type = 'neutral';
    emoji = '😐';
  }
  
  return {
    ...result,
    type,
    emoji
  };
};