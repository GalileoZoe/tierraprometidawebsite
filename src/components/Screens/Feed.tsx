import React, { useState, useEffect } from 'react';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';
import { FaPhone, FaFacebook, FaWhatsapp, FaComment, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Feed: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); 


  // Estado para manejar el icono actual
  const [iconIndex, setIconIndex] = useState(0);

    // 🔹 Funciones de navegación
  const goToContact = () => navigate('/contact');
  const goToAbout = () => navigate('/about');
  const goToServices = () => navigate('/services');
  const goToHelp = () => navigate('/help');


  // Array de íconos
  const icons = [
    <FaPhone className='icon' />,
    <FaComment className='icon' />,
    <FaWhatsapp className='icon' />,
    <FaFacebook className='icon' />,
    <FaEnvelope className='icon' />,
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
    <section
    className='feed'
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
    }}
  >
      


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
      />

      {/* Contenido principal */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 className='title fade-in-element' style={{color:'transparent'}} >
         Centro de Rehabilitación | Tierra Prometida
        </h1>

        <a onClick={goToContact}>
        {navigator.userAgent.toLowerCase().includes('mobi')  ? (
   <div className='item'>
   <img className='img' src={require('../../assets/logo-09.png')} alt='Logo Tierra Prometida' />
   <p>24 horas</p>
 </div>
) : (
   <>
   <img
     src={require(`../../assets/logo-0${theme === 2 ? '8' : '9'}.png`)}
     alt='Logo Tierra Prometida'
   />
   <p className='item fade-in-element'>24 horas</p>
 </>
)}
          <p className='text fade-in-element'>' La Semilla Eres Tú '</p>

          <div className='center fade-in-element'>
            <img
              className='logo'
              src={require(`../../assets/logo-1${theme === 2 ? '2' : '2'}.png`)}
              alt='Logo Tierra Prometida'
            />

            <h2 className='paragraph'>Previniendo y liberando adicciones</h2>


            <a className='icon fade-in-element' title='Contacto' onClick={goToContact}>
              {icons[iconIndex]}

              <p className={theme===0?'button':'buttonblack'}>Contactáctanos</p>
            </a>
          </div>
        </a>
      </div>
    </section>
  );
};
