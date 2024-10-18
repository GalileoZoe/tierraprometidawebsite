import React, { useEffect, useState } from "react";
import '../../App.css';
import { useTheme } from "../../context/ThemeContext";
import { FaInfoCircle } from "react-icons/fa";
import { useFeed } from "../../context/FeedContext";

export const About = () => {
    const { theme } = useTheme();
    const {feed, changeFeed}=useFeed();

    // Estado para manejar el icono actual
    const [iconIndex, setIconIndex] = useState(0);

    // Array de íconos
    const icons = [
        <FaInfoCircle className='icon' />,
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
            <div className='about-header'>

                <h1 className="title">Nosotros</h1>

    <img className="img" src={require('../../assets/logo-09.png')} />
    <p className='item'>24 horas</p>
    <p className='paragraph fade-in-element'>La Semilla Eres Tú</p>
                
              
            </div>

            <div className='image-description'>
          
                <p className='textblack'>Clínica Profesional de Rehabilitación y Desarrollo Humano.</p>
            </div>

            <div className='cards-container'>
                <div className='card'>
                    <h2>Misión</h2>
                    <p>Breve descripción de la misión.</p>
                </div>
                <div className='card'>
                    <h2>Visión</h2>
                    <p>Breve descripción de la visión.</p>
                </div>
                <div className='card'>
                    <h2>Valores</h2>
                    <p>Breve descripción de los valores.</p>
                </div>
            </div>
    <br />
            {/* <img src={require('../../assets/logo-12.png')} alt='Descripción' className='imgs' /> */}
           
              <br />

            <a className='icon fade-in-element' title='Contacto'>
                    <FaInfoCircle className='icon' />
                    <p className='button'>Más Información</p>
                </a>
        </section>
    );
}
