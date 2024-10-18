import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConnectionContextType {
  connectionStatus: number; // 0 = No conexión, 1 = Conexión
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

const ConnectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState<number>(navigator.onLine ? 1 : 0);

  useEffect(() => {
    const handleOnline = (): void => setConnectionStatus(1);
    const handleOffline = (): void => setConnectionStatus(0);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup para eliminar los eventos al desmontar el componente
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ connectionStatus }}>
      {children}
    </ConnectionContext.Provider>
  );
};

// Crear un hook para usar el contexto de manera más fácil
const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};

export { ConnectionProvider, useConnection };
