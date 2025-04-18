import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BackgroundContextType {
  bgImages: string[];
  bgIndex: number;
  setBgIndex: (index: number) => void;
  changeBgIndex: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Arreglo de imágenes de fondo disponibles para toda la aplicación
  const bgImages = [
    require('../assets/img-00.png'),
    require('../assets/img-01.png'),
    require('../assets/img-02.png'),
    require('../assets/img-06.png'),
    require('../assets/img-07.png'),
  ];

  // Estado para manejar el índice de imagen de fondo
  const [bgIndex, setBgIndex] = useState<number>(0);

  // Función para cambiar automáticamente el índice de la imagen de fondo
  const changeBgIndex = () => {
    setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
  };

  // Efecto para cambiar automáticamente el fondo cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      changeBgIndex();
    }, 3000);

    // Cleanup al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundContext.Provider value={{ bgImages, bgIndex, setBgIndex, changeBgIndex }}>
      {children}
    </BackgroundContext.Provider>
  );
};

// Hook personalizado para usar el contexto de manera más fácil
const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

export { BackgroundProvider, useBackground };