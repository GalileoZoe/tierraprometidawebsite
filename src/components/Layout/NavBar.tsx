import React, { useState } from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';

export const NavBar: React.FC = () => {
  const { feed, changeFeed } = useFeed();
  const { session } = useSession();
  const { theme } = useTheme();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className={ 'navbar'}>
      <div className='navbarlogo'>
        <a onClick={() => changeFeed(1)} >
      
                  {navigator.userAgent.toLowerCase().includes('mobi')  ? (
       <img
       src={require(`../../assets/logo-20.png`)}
       alt='Logo'
     />
) : (
  <img
  src={require(`../../assets/logo-20.png`)}
  alt='Logo'
/>
)}
        </a>
      </div>
      <button className='hamburger' onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>
      <ul className={`navbaritems ${'drawer'} ${isMenuOpen ? 'show' : ''}`}>
     
          <li>
            <a
              className={'navbaritem'}
              style={feed === 1 ? { fontWeight:800} : undefined}
              onClick={() => {
                changeFeed(1);
                setMenuOpen(false);
              }}
            >
              Inicio
            </a>
          </li>
        <li>
          <a
            className={'navbaritem'}
          style={feed === 2 ? { fontWeight:800} : undefined}
            onClick={() => {
              changeFeed(2);
              setMenuOpen(false);
            }}
          >
            Nosotros
          </a>
        </li>
        <li>
          <a
            className={'navbaritem'}
           style={feed === 3 ? { fontWeight:900} : undefined}
            onClick={() => {
              changeFeed(3);
              setMenuOpen(false);
            }}
          >
            Servicios
          </a>
        </li>
        {session === 1 && (
          <li>
            <a
              className={'navbaritem'}
              style={feed === 7? { fontWeight:900} : undefined}
              onClick={() => {
                changeFeed(7);
                setMenuOpen(false);
              }}
            >
              Usuarios
            </a>
          </li>
        )}
        <li>
          <a
            className={'navbaritem'}
            style={feed === 5 ? { fontWeight:900} : undefined}
            onClick={() => {
              changeFeed(5);
              setMenuOpen(false);
            }}
          >
            Ubicación
          </a>
        </li>
        <li>
          <a
            className={'navbaritem'}
            style={feed === 6 ? { fontWeight:900} : undefined}
            onClick={() => {
              changeFeed(6);
              setMenuOpen(false);
            }}
          >
            Contacto
          </a>
        </li>
        <li>
          <a
            className={'navbaritem'}
            style={ feed === 11 ? { fontWeight:900} : undefined}
            onClick={() => {
              changeFeed(11);
              setMenuOpen(false);
            }}
          >
            Ayuda
          </a>
        </li>
      </ul>
    </nav>
  );
};
