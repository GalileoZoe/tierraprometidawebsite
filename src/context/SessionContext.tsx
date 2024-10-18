import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LogContextType {
  session: number;
  changeSession: (newSession: number) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<number>(0);

  const changeSession = (newSession: number) => {
    if ([0, 1].includes(newSession)) {
      setSession(newSession);
    } else {
      console.error('Invalid Session Value');
    }
  };

  return (
    <LogContext.Provider value={{ session, changeSession }}>
      {children}
    </LogContext.Provider>
  );
};

// Crear un hook para usar el contexto de manera más fácil
const useSession = (): LogContextType => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession };
