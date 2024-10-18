import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import '../../App.css';

interface GalleryProps {
  images: string[];
  labels: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  labels,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  const { theme, changeTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mostrar la imagen anterior
  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para mostrar la siguiente imagen
  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Efecto para manejar el autoplay
  useEffect(() => {
    if (!autoPlay) return;

    const intervalId = setInterval(() => {
      showNextImage();
    }, autoPlayInterval);

    // Limpia el intervalo cuando el componente se desmonta o cuando cambian las dependencias
    return () => clearInterval(intervalId);
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className='gallery'>
      <div
        className='imagewrapper'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imagePath, index) => {
          const image = require(`../../assets/${imagePath}`);
          return (
            <div className='imagecontainer' key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className='image' />
              <div className='label'>{labels[index]}</div>
            </div>
          );
        })}
      </div>
      <button className='navbutton' onClick={showPrevImage}>
        ❮
      </button>
      <button className='navbutton' onClick={showNextImage}>
        ❯
      </button>
    </div>
  );
};
