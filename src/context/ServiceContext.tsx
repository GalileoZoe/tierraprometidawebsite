import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceContextType {
  service: number;
  changeService: (newService: number) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [service, setService] = useState<number>(0);

  const changeService = (newService: number) => {
    if ([0,1,2,3,4,5,6,7,8,9,10,11].includes(newService)) {
      setService(newService);
    } else {
      console.error('Invalid service value');
    }
  };

  return (
    <ServiceContext.Provider value={{ service, changeService }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Crear un hook para usar el contexto de manera más fácil
const useService = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export { ServiceProvider, useService };
