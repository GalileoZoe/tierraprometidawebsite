import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedContextType {
  feed: number;
  changeFeed: (newFeed: number) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

const FeedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feed, setFeed] = useState<number>(1);

  const changeFeed = (newFeed: number) => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13].includes(newFeed)) {
      setFeed(newFeed);
    } else {
      console.error('Invalid Feed value');
    }
  };

  return (
    <FeedContext.Provider value={{ feed, changeFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

// Crear un hook para usar el contexto de manera más fácil
const useFeed = (): FeedContextType => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};

export { FeedProvider, useFeed };
