import React, { useEffect, useState } from "react";
import '../../App.css';
import { useFeed } from "../../context/FeedContext";
import { useTheme } from "../../context/ThemeContext";
import { FaAdjust, FaApple, FaAppleAlt, FaBed, FaChess, FaCode, FaCoffee, FaComment, FaDice, FaEnvelope, FaFacebook, FaFutbol, FaHeart, FaHome, FaHotel, FaHotTub, FaLeaf, FaMapPin, FaMask, FaMedkit, FaMusic, FaNutritionix, FaPaintBrush, FaPhone, FaRegUser, FaSpa, FaSteam, FaStethoscope, FaTiktok, FaUser, FaUserMd, FaWhatsapp } from "react-icons/fa";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);

    // Cleanup al desmontar el componente
    return () => clearInterval(interval);
  }, [icons.length]);


  return (

    <section className='section'>

      <div>

        <h1 className={theme == 2 ? 'titleRed' : 'title'}>Contacto</h1>


        <ul className='slider fade-in-element'>
          <li className='item ' title='' onClick={() => changeTheme(theme === 1 ? 0 : 1)}>
            <img className="img" src={require('../../assets/logo-09.png')} />
            <p>24 horas</p>
          </li>
        </ul>

        <br />
        <br />
        <br />

        <ul className='slider'>

          <li className='item fade-in-element' title='Llamada' >
            <a href='tel:+527281136945'><FaPhone className={theme === 2 ? 'iconred' : 'icon'} /></a>
            <p>Teléfono</p>
          </li>
          <li className='item fade-in-element' title='Mensaje' >
          <a href='sms:+52529624304734'> <FaComment className={theme === 2 ? 'iconred' : 'icon'} /></a> 
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
          {/* <li className='item fade-in-element' title='Eventos Culturales' onClick={() => changeTheme(theme === 1 ? 0 : 1)}>
            <FaMusic className={theme === 2 ? 'iconred' : 'icon'} />
            <p>Eventos Culturales</p>
          </li> */}
        </ul>

        <br />
    
        <a className='icon fade-in-element' title='Contacto' onClick={() => changeFeed(6)}>
          <p className='button'>Contáctanos</p>
        </a>
   
      </div>
    </section>
  )
}






