import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';
import {  FaCode,  FaComment,  FaEnvelope, FaFacebook,  FaMapPin,FaPhone,  FaTiktok, FaWhatsapp } from 'react-icons/fa';

export const Contact = () => {

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
        overflowY: 'scroll',
        scrollbarWidth:'none',
        msOverflowStyle: 'none',
      }}>
          
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Capa oscura con opacidad
        minHeight:'100%' // Mantiene la capa detrás del contenido
      }}
    >

      <h1 className='title fade-in-element' style={{color:'transparent'}} >
       Contacto | Centro de Rehabilitación | Tierra Prometida
        </h1>

        <h1 className={theme===2 ? 'titleRed' : 'title'}>Contacto</h1>

   
        <div className='item'>
        <img className='img' src={require('../../assets/logo-09.png')} />
        <p>24 horas</p>
      </div>

     <div className='marginvertical'></div>
        <ul className='slider'>

          <li className='item fade-in-element' title='Llamada' >
            <a href='tel:7281136945'><FaPhone className={theme === 2 ? 'iconred' : 'icon'} /></a>
            <p>Teléfono</p>
          </li>
          <li className='item fade-in-element' title='Mensaje' >
          <a href='sms:529624304734'> <FaComment className={theme === 2 ? 'iconred' : 'icon'} /></a> 
            <p>Mensaje</p>
          </li>
          <li className='item fade-in-element' title='Correo Electrónico' >
           <a href='mailto:tierraprometida24h@gmail.com'><FaEnvelope className={theme === 2 ? 'iconred' : 'icon'} /></a> 
            <p>Correo Electrónico</p>
          </li>
          <li className='item fade-in-element' title='WhatsApp' >
           <a href='https://wa.me/529624304734'> <FaWhatsapp className={theme === 2 ? 'iconred' : 'icon'} /></a>
            <p>WhatsApp</p>
          </li>
          <li className='item fade-in-element' title='Facebook' >
           <a href='https://www.facebook.com/profile.php?id=61565903937768'> <FaFacebook className={theme === 2 ? 'iconred' : 'icon'} /></a>
            <p>FaceBook</p>
          </li>
          <li className='item fade-in-element' title='TikTok' >
            <FaTiktok className={theme === 2 ? 'iconred' : 'icon'} />
            <p>TikTok</p>
          </li>
          <li className='item fade-in-element' title='Ubicación' >
           <a href='https://maps.app.goo.gl/qg6mNeMVLKEW3vDY7'> <FaMapPin className={theme === 2 ? 'iconred' : 'icon'} /></a>
            <p>Ubicación</p>
          </li>
          <li className='item fade-in-element' title='Software' >
            <FaCode className={theme === 2 ? 'iconred' : 'icon'} />
            <p>Software</p>
          </li>
        </ul>

    
        <a className='icon fade-in-element' title='Contacto' onClick={() => changeFeed(6)}>
        {icons[iconIndex]}
          <p className={theme===0?'button':'buttonblack'}>Contáctanos</p>
        </a>
      </div>
      </section>
  )
}






