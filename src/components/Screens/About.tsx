import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaInfoCircle } from 'react-icons/fa';

export const About = () => {

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

            <h1 className='title fade-in-element' style={{color:'transparent'}} >
        Información | Centro de Rehabilitación | Tierra Prometida
        </h1>

                <h1 className='title'>Nosotros</h1>

                <img className='img' src={require('../../assets/logo-09.png')} />
                <p className='item'>24 horas</p>

            </div>

            <div className='image-description'>

                <p className='textblack'>Clínica Profesional de Rehabilitación y Desarrollo Humano.</p>
            </div>

            <div className='cards-container'>
                <div className='card'>
                    <h2>Misión</h2>
                    <p>Brindar atención profesional personalizada para la prevención y tratamiento de adicciones.</p>
                </div>
                <div className='card'>
                    <h2>Visión</h2>
                    <p>Ser una clínica líder en la prevención y liberación de adicciones,
                         transformando vidas y reintegrando familias.</p>
                </div>
                <div className='card'>
                    <h2>Valores</h2>
                    <p>Respeto, Amor, Recuperación, Compañerismo, Salud, Humildad, Resiliencia, Disciplina.</p>
                </div>
            </div>
            <br />

            <br />

            <a href='https://wa.me/529624304734' className='icon fade-in-element' title='Contacto'>
                <FaInfoCircle className='icon' />
                <p className='button'>Más Información</p>
            </a>
        </section>
    );
}
