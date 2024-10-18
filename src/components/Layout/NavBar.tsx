import React from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';
import { FaStore, FaToggleOff, FaToggleOn } from 'react-icons/fa';

export const NavBar: React.FC = () => {
  const { feed, changeFeed } = useFeed();
  const {session, changeSession}= useSession();
  const { theme, changeTheme } = useTheme();

  const AppTheme = () => {
    switch (theme) {
      case 0:
        return 'Tema Claro';
      case 1:
        return 'Tema Rojo';
      case 2:
        return 'Tema Oscuro';
      default:
        return 'App';
    }
  };

  const setTheme = (themeIndex: number) => () => changeTheme(themeIndex);

  return (
    <nav className="navbar">
      <div className="navbarlogo">
        <img
          src={require(`../../assets/logo-0${theme === 2 ? '8' : '9'}.png`)}
          alt="Logo"
        />
      </div>
      <ul className="navbaritems">
      {feed==1?null:  <li>
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
        {session==1?
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
        {/* <li>
        <li className={theme === 2 ? 'navbaritemred' : 'navbaritem'} onClick={()=>{theme==1?changeTheme(0):changeTheme(1)}} ><FaStore className='icon'/></li>
        
        </li> */}

    
      </ul>
    </nav>
  );
};
