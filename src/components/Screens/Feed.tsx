import React, { useState, useEffect } from 'react';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { FaPhone, FaMapPin, FaFacebook, FaWhatsapp, FaMap, FaTiktok, FaComment, FaCode, FaEnvelope } from 'react-icons/fa';

export const Feed: React.FC = () => {
  const { feed, changeFeed } = useFeed();
  const { theme, changeTheme } = useTheme();

  // Estado para manejar el icono actual
  const [iconIndex, setIconIndex] = useState(0);

  // Array de íconos
  const icons = [
    <FaPhone className='icon' />,
    <FaComment className='icon' />,
    <FaWhatsapp className='icon' />,
    <FaFacebook className='icon' />,
    <FaEnvelope className='icon' />,
    // <FaTiktok className='icon' />,
    // <FaCode className='icon' />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);

    // Cleanup al desmontar el componente
    return () => clearInterval(interval);
  }, [icons.length]);

  
  return (
    <section className='section'>

      
        <h1 className={`fade-in-element`} style={{ color: 'transparent' }}>
          Tierra Prometida
        </h1>

        <br />
        <br />

        <a onClick={() => changeFeed(6)}  >
        <img 
          src={require(`../../assets/logo-0${theme === 2 ? '8' : '9'}.png`)}
          alt='Logo Tierra Prometida'
        />
         <p className='item fade-in-element'>24 horas</p>

         <p className='text'>Previniendo y liberando adicciones</p>
  
        <img 
        className='logo'
          src={require(`../../assets/logo-1${theme === 2 ? '2' : '2'}.png`)}
          alt='Logo Tierra Prometida'
        />
        <br />
        <div className='center fade-in-element'>
          {/* <p className={`text fade-in-element ${theme === 2 ? 'textred' : 'text'}`}>
            Previniendo y Liberando Adicciones
          </p> */}

            <br />
            <br />

          <a className='icon fade-in-element' title='Contacto' onClick={()=>changeFeed(6)}>
            {icons[iconIndex]}

            <p className='button'>Contactáctanos</p>
          </a>
        </div>
      </a>
    </section>
  );
};
