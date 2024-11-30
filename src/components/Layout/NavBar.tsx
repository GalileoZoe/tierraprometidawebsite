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
    <nav className={theme===0 || feed===1?'navbartransparent':'navbar'}>
      <div className='navbarlogo'>
        <a onClick={()=>changeFeed(1)} >
        <img
          src={require(`../../assets/logo-0${theme === 2 ? '8' : '9'}.png`)}
          alt='Logo'
        />
        </a>
      </div>
      <button className='hamburger' onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>
      <ul className={`navbaritems ${theme === 0 ? '' : 'navbaritemswhite'} ${isMenuOpen ? 'show' : ''}`}>
        {feed !== 1 && (
          <li>
            <a
              className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
              onClick={() => {
                changeFeed(1);
                setMenuOpen(false);
              }}
            >
              Inicio
            </a>
          </li>
        )}
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
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
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
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
              className={theme ===2 ? 'navbaritemred' : 'navbaritem'}
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
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
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
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
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
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
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
