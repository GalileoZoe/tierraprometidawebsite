import React from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';

export const NavBar: React.FC = () => {
  const { feed, changeFeed } = useFeed();
  const {session}= useSession();
  const { theme } = useTheme();

  return (
    <nav className='navbar'>
      <div className='navbarlogo'>
        <img
          src={require(`../../assets/logo-0${theme === 2 ? '8' : '9'}.png`)}
          alt='Logo'
        />
      </div>
      <ul className='navbaritems'>
      {feed===1?null:  <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(1)}
          >
            Inicio
          </a>
        </li>}
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(2)}
          >
            Nosotros
          </a>
        </li>
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(3)}
          >
            Servicios
          </a>
        </li>
        {session===1?
          <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(7)}
          >
            Usuarios
          </a>
        </li>:null}
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(5)}
          >
            Ubicación
          </a>
        </li>
        
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={() => changeFeed(6)}
          >
            Contacto
          </a>
        </li>
        
        <li>
          <a
            className={theme === 2 ? 'navbaritemred' : 'navbaritem'}
            onClick={()=>changeFeed(11)}
          >
            Ayuda
          </a>
        </li>
    
      </ul>
    </nav>
  );
};
