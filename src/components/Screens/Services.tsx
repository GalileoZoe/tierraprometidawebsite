import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';
import {
  FaAppleAlt, FaComment, FaEnvelope, FaFacebook, FaFutbol, FaHeart,
  FaIgloo, FaMusic, FaPaintBrush, FaPhone, FaUser, FaUserGraduate,
  FaUserMd, FaUsers, FaWhatsapp, FaSpa
} from 'react-icons/fa';
import { Window } from '../Components/Window';
import { useService } from '../../context/ServiceContext';

export const Services = () => {
  const { changeFeed } = useFeed();
  const { theme } = useTheme();
  const { service, changeService } = useService();
  const { bgImages, bgIndex } = useBackground();
  const [moreInfo, setMoreInfo] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || navigator.userAgent.toLowerCase().includes('mobi'));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contactIcons = [
    <FaPhone className='icon' />,
    <FaComment className='icon' />,
    <FaWhatsapp className='icon' />,
    <FaFacebook className='icon' />,
    <FaEnvelope className='icon' />
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % contactIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [contactIcons.length]);

  const renderService = () => {
    const baseProps = {
      button: '. . .',
      showMoreInfo: true,
      moreInfo,
      setMoreInfo,
    };

    switch (service) {
      case 1:
        return (
          <Window
            {...baseProps}
            tittle="Temazcal"
            icon={<FaSpa className="icon" />}
            description="Favorece al proceso de desintoxicación y beneficia a la salud física y mental de los usuarios."
            text="El Temazcal es una tradición ancestral que combina el calor del vapor con plantas medicinales para purificar el cuerpo y la mente, promoviendo la relajación y el bienestar integral."
          />
        );
      case 2:
        return (
          <Window
            {...baseProps}
            tittle="Psicología"
            icon={<FaUserMd className="icon" />}
            description="Atención Psicológica Profesional. Sesiones individuales, grupales y familiares."
            text="Ofrecemos atención psicológica profesional para ayudarte a manejar emociones, superar desafíos y mejorar tu calidad de vida a través de terapias personalizadas."
          />
        );
      case 3:
        return (
          <Window
            {...baseProps}
            tittle="Nutrición"
            icon={<FaAppleAlt className="icon" />}
            description="Dieta basada en alimentos frescos y naturales que ayudan en el proceso de desintoxicación del cuerpo, mejoran la salud física y brindan mayor energía; manteniendo un mejor estado de ánimo."
            text="Plan alimenticio equilibrado, rico en nutrientes esenciales, diseñado para desintoxicar el cuerpo y mejorar tu energía y estado de ánimo."
          />
        );
      case 4:
        return (
          <Window
            {...baseProps}
            tittle="Sesiones AL-ANON"
            icon={<FaUsers className="icon" />}
            description="Estrategias para saber cómo lidiar con personas con conductas adictivas."
            text="Las sesiones AL-ANON están diseñadas para familiares y amigos de personas con adicciones, ofreciendo herramientas y apoyo para manejar situaciones difíciles y fomentar un entorno de recuperación."
          />
        );
      case 5:
        return (
          <Window
            {...baseProps}
            tittle="Desintoxicación"
            icon={<FaHeart className="icon" />}
            description="Temazcal, Activación Física, Sesiones de Psicología, Juntas de Recuperación y una Dieta Saludable para desintoxicar el cuerpo, el alma y la mente."
            text="Nuestro programa de desintoxicación integral combina terapias físicas, emocionales y nutricionales para ayudarte a liberar toxinas y recuperar el equilibrio en tu vida."
          />
        );
      case 6:
        return (
          <Window
            {...baseProps}
            tittle="Desarrollo Humano"
            icon={<FaUser className="icon" />}
            description="Se impulsa a los usuarios a alcanzar su máximo potencial, cultivando una personalidad feliz y libre de adicciones mediante el desarrollo de hábitos saludables y una mentalidad positiva."
            text="Promovemos el crecimiento personal a través de talleres y actividades que fortalecen la autoestima, la resiliencia y la capacidad de tomar decisiones saludables para una vida plena."
          />
        );
      case 7:
        return (
          <Window
            {...baseProps}
            tittle="Activación Neuromúscular"
            icon={<FaFutbol className="icon" />}
            description="Favorece a la salud física y mental, al proceso de desintoxicación y la creación de hábitos saludables."
            text="La activación neuromuscular mejora la conexión entre mente y cuerpo, optimizando el rendimiento físico y mental, y facilitando la adopción de hábitos saludables."
          />
        );
      case 8:
        return (
          <Window
            {...baseProps}
            tittle="ArteTerapia"
            icon={<FaPaintBrush className="icon" />}
            description="Fomentamos actividades artísticas para estimular la creatividad y la expresión asertiva de emociones."
            text="La ArteTerapia utiliza el arte como herramienta terapéutica para explorar emociones, reducir el estrés y fomentar la autoexpresión, promoviendo el bienestar emocional y la creatividad."
          />
        );
      case 9:
        return (
          <Window
            {...baseProps}
            tittle="Eventos Culturales"
            icon={<FaMusic className="icon" />}
            description="Organizamos sesiones de arte, pintura y música en vivo, así como viajes y excursiones para fomentar el desarrollo de una personalidad libre de adicciones y promover el aprecio por la cultura y el arte."
            text="Los eventos culturales incluyen talleres de arte, conciertos, excursiones y charlas con artistas, diseñados para enriquecer tu vida y fomentar un estilo de vida libre de adicciones."
          />
        );
      case 10:
        return (
          <Window
            {...baseProps}
            tittle="Educación Profesional"
            icon={<FaUserGraduate className="icon" />}
            description="Preparamos y entregamos certificados de Primaria, Secundaria y Preparatoria válidos por la SEP."
            text="Ofrecemos programas educativos certificados por la SEP para que puedas completar tu formación académica y abrir nuevas oportunidades laborales y personales."
          />
        );
      default:
        return null;
    }
  };

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
            <h1 className='title'>Servicios</h1>
          </div>
        <img className='img' src={require('../../assets/logo-09.png')} alt="Logo" />
        <p className='item'>24 horas</p>
        {service === 0 ? (
          <ul
            className='slider'
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: isMobile ? '0.5rem' : '1rem',
              transform: isMobile ? 'scale(0.9)' : 'scale(1)',
              padding: isMobile ? '0.5rem' : '2rem',
              maxHeight: isMobile ? 'calc(100vh - 200px)' : 'auto',
              alignItems: 'center',
              justifyContent: 'between',

            }}
          >
            <li className='item fade-in-element' title='Psicología' onClick={() => changeService(2)}>
              <FaUserMd className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Psicología{'\n'}Profesional</p>
            </li>
            <li className='item fade-in-element' title='Educación' onClick={() => changeService(10)}>
              <FaUserGraduate className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Educación</p>
            </li>
            <li className='item fade-in-element' title='Nutrición' onClick={() => changeService(3)}>
              <FaAppleAlt className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Nutrición</p>
            </li>
            <li className='item fade-in-element' title='Temazcal' onClick={() => changeService(1)}>
              <FaIgloo className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Temazcal</p>
            </li>
            <li className='item fade-in-element' title='AL-ANON' onClick={() => changeService(4)}>
              <FaUsers className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Sesiones AL-ANON</p>
            </li>
            <li className='item fade-in-element' title='Desintoxicación' onClick={() => changeService(5)}>
              <FaHeart className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Desintoxicación</p>
            </li>
            <li className='item fade-in-element' title='Desarrollo Humano' onClick={() => changeService(6)}>
              <FaUser className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Desarrollo{'\n'} Humano</p>
            </li>
            <li className='item fade-in-element' title='Activación Física' onClick={() => changeService(7)}>
              <FaFutbol className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Activación Fisica</p>
            </li>
            <li className='item fade-in-element' title='ArteTerapia' onClick={() => changeService(8)}>
              <FaPaintBrush className={theme === 2 ? 'iconred' : 'icon'} />
              <p>ArteTerapia</p>
            </li>
            <li className='item fade-in-element' title='Eventos Culturales' onClick={() => changeService(9)}>
              <FaMusic className={theme === 2 ? 'iconred' : 'icon'} />
              <p>Eventos {'\n'} Culturales</p>
            </li>
          </ul>
        ) : (
          <div>{renderService()}</div>
        )}
        {!isMobile && <div className='marginvertical'></div>}
        <a className='icon fade-in-element' title='Contacto' onClick={() => changeFeed(6)}>
          {contactIcons[iconIndex]}
          <p className={theme === 0 ? 'button' : 'buttonblack'}>Contáctanos</p>
        </a>
        {!isMobile && <div className='marginvertical'></div>}
      </div>
    </section>
  );
};
