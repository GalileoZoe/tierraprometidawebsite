import React, { useEffect, useState } from "react";
import '../../App.css';
import { useFeed } from "../../context/FeedContext";
import { useTheme } from "../../context/ThemeContext";
import { FaMap, FaMapPin, FaWhatsapp } from "react-icons/fa";

export const Location = () => {
    const { feed, changeFeed } = useFeed();
    const { theme, changeTheme } = useTheme();


    
  // Estado para manejar el icono actual
  const [iconIndex, setIconIndex] = useState(0);

  // Array de íconos
  const icons = [
    <FaMap className='icon' />,
    <FaMapPin className='icon' />,
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);

    // Cleanup al desmontar el componente
    return () => clearInterval(interval);
  }, [icons.length]);

    return (
        <div className='section'>
            {/* <a onClick={() => changeFeed(1)}>
                <h1 className={theme === 2 ? 'titleRed' : 'title'}>Tierra Prometida</h1>
            </a> */}

           

        <h1 className={theme == 2 ? 'titleRed' : 'title'}>Ubicación</h1>


     <div className="item">
            <img className="img" src={require('../../assets/logo-09.png')} />
            <p>24 horas</p>
            </div>
         
            <div className='map-container fade-in-element'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240873.71713212508!2d-99.78011261328123!3d19.384222700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20b79f8c954f7%3A0xedc9d49fc5269ee2!2sCentro%20de%20rehabilitaci%C3%B3n%20%22Tierra%20Prometida%22!5e0!3m2!1ses-419!2smx!4v1723536707709!5m2!1ses-419!2smx"
                   className='map fade-in-element'
                ></iframe>
            </div>

     
    
            <div>
                <p className='paragraph fade-in-element' >Calle Guadalupe Victoria 13, Dolores, 52010 Colonia Álvaro Obregón Tlalmimilolpan, México.</p>
            </div>
            <a className='icon fade-in-element' title='Contacto' href='https://maps.app.goo.gl/qg6mNeMVLKEW3vDY7'>
            {icons[iconIndex]}
            <p className='button'>Como Llegar</p>
          </a>
        </div>
    );
};
