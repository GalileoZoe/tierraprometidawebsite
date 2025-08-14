import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaCalendarAlt, FaClock, FaComment, FaEnvelope, FaFacebook, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';
import { useFeed } from '../../context/FeedContext';

// Ejemplo de datos de eventos
const eventos = [
  {
    titulo: 'Reda de Prensa',
    fecha: '05-Julio-2025',
    hora: '10:00 a.m.',
    ubicacion: 'Kiosko, Ciudad de Lerma',
    flyer: require('../../assets/PRENSA.png'),
  },
  {
    titulo: '3er Aniversario',
    fecha: '20-Julio-2025',
    hora: '10:00 a.m.',
    ubicacion: 'Centro de Rehabilitación Tierra Prometida',
    flyer: require('../../assets/AMOR3.PNG'),
  },
  {
    titulo: 'Semana de Unidad',
    fecha: '15-Julio-2025 a 20-Julio-2025',
    hora: '10:00 a.m.',
    ubicacion: 'Centro de Rehabilitación Tierra Prometida',
    flyer: require('../../assets/AMOR.png'),
  },
];

export const Events = () => {
  const { theme } = useTheme();
  const { bgImages, bgIndex } = useBackground();
  const [iconIndex, setIconIndex] = useState(0);
  const {changeFeed} = useFeed();

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

  // Detección de móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || navigator.userAgent.toLowerCase().includes('mobi'));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

     
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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: isMobile ? 'flex-start' : 'center',
        textAlign: 'center',
        overflowY: isMobile ? 'auto' : 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        padding: isMobile ? '1rem' : '0'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          minHeight: '100%',
        }}
      >
        <div className='about-header'>
          <h1 className='title fade-in-element' style={{ color: 'transparent' }}>
            Eventos | Tierra Prometida
          </h1>
          <h1 className='title'> Eventos</h1>
        </div>

        <div
          className='cards-container'
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '1rem' : '2rem',
            justifyItems: 'center',
            padding: isMobile ? '0.5rem' : '2rem'
          }}
        >
          {eventos.map((evento, idx) => (
            <div
              key={idx}
              className={theme === 0 ? 'card' : 'cardblack'}
              style={{
                width: isMobile ? '90%' : 320,
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                transform: isMobile ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={e => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
                }
              }}
            >
              <img
                src={evento.flyer}
                alt={evento.titulo}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: isMobile ? 250 : 580,
                  display: 'block'
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h2 className='title' style={{ marginBottom: 8 }}>{evento.titulo}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <span title='Fecha' style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FaCalendarAlt style={{ color: '#2d8cff' }} /> {evento.fecha}
                  </span>
                  <span title='Hora' style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FaClock style={{ color: '#ffb300' }} /> {evento.hora}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FaMapMarkerAlt style={{ color: '#e53935' }} /> {evento.ubicacion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

       {!isMobile && <div className='marginvertical'></div>}

            <a className='icon fade-in-element' title='Contacto' onClick={() => changeFeed(6)}>
        {icons[iconIndex]}
          <p className={theme===0?'button':'buttonblack'}>Contáctanos</p>
        </a>
      </div>
    </section>
  );
};
