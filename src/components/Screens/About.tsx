import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export const About = () => {

    const {theme}=useTheme();

    // Estado para manejar el icono actual
    const [iconIndex, setIconIndex] = useState(0);

    // Array de íconos
    const icons = [
        <FaInfoCircle className='icon' />,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        });

        // Cleanup al desmontar el componente
        return () => clearInterval(interval);
    }, [icons.length]);

      // Arreglo de imágenes de fondo
      const bgImages = [
        require('../../assets/muntains-02.png'),
      ];
    
      // Estado para manejar el índice de imagen de fondo
      const [bgIndex, setBgIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
          setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length); // Cambia el fondo de imagen
        }, 2000);
    
        // Cleanup al desmontar el componente
        return () => clearInterval(interval);
      }, [icons.length, bgImages.length]);
    

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
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Capa oscura con opacidad
          minHeight:'100%' // Mantiene la capa detrás del contenido
        }}
      >
          <div style={{ position: 'relative', zIndex: 2 }}></div>
            <div className='about-header'>

            <h1 className='title fade-in-element' style={{color:'transparent'}} >
        Información | Centro de Rehabilitación | Tierra Prometida
        </h1>

                <h1 className='title'>Nosotros</h1>

                <img className='img' src={require('../../assets/logo-09.png')} />
                <p className='item'>24 horas</p>

            </div>

            <div className='image-description'>

                <p className='paragraph'>Centro de Rehabilitación y Desarrollo Humano.</p>
            </div>
            <div className='cards-container'>
                <div className={theme===0?'card':'cardblack'}>
                    <h2 className='title'>Misión</h2>
                    <p>Brindar atención profesional personalizada para el tratamiento y prevención de adicciones.</p>
                </div>
                <div className={theme===0?'card':'cardblack'}>
                    <h2 className='title'>Visión</h2>
                    <p>Ser una clínica líder en la prevención y liberación de adicciones,
                         transformando vidas y reintegrando familias.</p>
                </div>
                <div className={theme===0?'card':'cardblack'}>
                    <h2 className='title'>Valores</h2>
                    <p>Respeto, Amor, Recuperación, Compañerismo, Salud, Humildad, Resiliencia, Disciplina.</p>
                </div>
            </div>
            <br />

            <a href='https://wa.me/529624304734' className='icon fade-in-element' title='Contacto'>
                <FaInfoCircle className='icon' />
                <p className={theme===0?'button':'buttonblack'}>Más Información</p>
            </a>

            <div className='marginvertical'></div>
            </div>
        </section>
    );
}
