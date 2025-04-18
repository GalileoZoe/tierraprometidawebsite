import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useTheme } from '../../context/ThemeContext';
import { FaMap, FaMapPin } from 'react-icons/fa';
import { useBackground } from '../../context/BackgroundContext';

export const Location: React.FC = () => {
  const { theme } = useTheme();


  const [iconIndex, setIconIndex] = useState(0);

  const icons = [
    <FaMap className='icon' />,
    <FaMapPin className='icon' />,

  ];

  // Usar el contexto global de fondo
  const { bgImages, bgIndex } = useBackground();
    
  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);
    
    // Cleanup al desmontar el componente
    return () => clearInterval(interval);
  }, [icons.length]);
    

    return (
        <section  className='feed'
        style={{
          position: 'relative',
          backgroundImage: `url(${bgImages[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw', // 100% del ancho de la ventana
          height: '100vh', // 100% del alto de la ventana
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center', // Alinea el texto horizontalmente
        }}>
            
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Capa oscura con opacidad
          zIndex: 1, // Mantiene la capa detrás del contenido
        }}
      >
      
<h1 className='title fade-in-element' style={{color:'transparent'}} >
       Ubicación | Centro de Rehabilitación | Tierra Prometida
        </h1>

      <h1 className={theme===2 ? 'titleRed' : 'title'}>Ubicación</h1>

      <div className='item'>
        <img className='img' src={require('../../assets/logo-09.png')} />
        <p>24 horas</p>
      </div>

      <div className='map-container fade-in-element'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240873.71713212508!2d-99.78011261328123!3d19.384222700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20b79f8c954f7%3A0xedc9d49fc5269ee2!2sCentro%20de%20rehabilitaci%C3%B3n%20%22Tierra%20Prometida%22!5e0!3m2!1ses-419!2smx!4v1723536707709!5m2!1ses-419!2smx'
          className='map fade-in-element'
        ></iframe>
      </div>

      <div>
        <p className='paragraph fade-in-element' >Calle Guadalupe Victoria 13, Dolores, 52010 Colonia Álvaro Obregón Tlalmimilolpan, México.</p>
      </div>
      <a className='icon fade-in-element' title='Contacto' href='https://maps.app.goo.gl/qg6mNeMVLKEW3vDY7'>
        {icons[iconIndex]}
        <p className={theme===0?'button':'buttonblack'}>Como Llegar</p>
      </a>
    </div>
    </section>
  );
};
