import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: number;
  changeTheme: (newTheme: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<number>(1);

  const changeTheme = (newTheme: number) => {
    if ([0, 1, 2].includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.error('Invalid Theme value');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Crear un hook para usar el contexto de manera más fácil
const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
