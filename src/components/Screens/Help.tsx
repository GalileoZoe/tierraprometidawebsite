import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

export const Help = () => {

  const {theme}=useTheme();
  
const bgImages = [
        require('../../assets/muntains-02.png'),
      ];
    
      // Estado para manejar el índice de imagen de fondo
      const [bgIndex, setBgIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length); // Cambia el fondo de imagen
        }, 2000);
    
        // Cleanup al desmontar el componente
        return () => clearInterval(interval);
      }, [bgImages.length]);
    

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
          top: 70,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Capa oscura con opacidad
          zIndex: 1, // Mantiene la capa detrás del contenido
        }}
      >


        <h1 className='title'>Ayuda</h1>

        <div className='marginvertical'></div>

        <p className='paragraph'>Gracias por formar parte de   </p>

        <div className='item'>
          <img className='img' src={require('../../assets/logo-09.png')} />
          <p>24 horas</p>
        </div>


        <br />
        <p className='paragraph'>Tu ayuda contribuye a la recuperación de nuestros compañeros y a la reintegración de miles de familias{'\n'} que logran vivir una nueva vida .   </p>


        <a className='icon fade-in-element' href='https://wa.me/529624304734' title='Contacto' >
          <p className='paragraph'>Quiero Ayudar </p>
          <FaHeart className={theme===0?'button':'buttonblack'} />
        </a>

      </div>
    </section>
  )
}
