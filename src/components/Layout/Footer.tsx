import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';
import { FaAdjust, FaAppStore, FaCode, FaInfo, FaPhone, FaPowerOff, FaRegUser, FaShoppingBag, FaShoppingCart, FaSign, FaSignInAlt, FaStore, FaToggleOff, FaToggleOn, FaUser, FaUserAlt, FaUserAltSlash, FaUserInjured, FaWifi } from 'react-icons/fa';
import { useFeed } from '../../context/FeedContext';

export const Footer: React.FC = () => {

  const { theme, changeTheme } = useTheme();
  const { session, changeSession } = useSession();
  const {feed, changeFeed}=useFeed();
    // Estado para manejar la conectividad
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // Funciones para manejar los eventos de conexión
    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    // Escuchar eventos de conexión
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup para eliminar los eventos al desmontar el componente
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <nav className="footer">
      <ul className="footeritems">

        <li className={theme == 2 ? 'footeritemred' : 'footeritem'} title='Modo Oscuro' onClick={theme == 1 ? () => changeTheme(0) : () => changeTheme(1)} >
          {theme == 1 ? <FaToggleOff className='icon' /> : <FaToggleOn className='icon' />}
        </li>
        <li className={theme == 2 ? 'footeritemred' : 'footeritem'} title='Iniciar Sesión' onClick={() => changeSession(1)}>
          {session == 0 ? <FaRegUser className={theme == 2 ? 'iconred' : 'icon'} /> : <FaUser className={theme == 2 ? 'iconred' : 'icon'} />}
        </li>
        {session==1?<li className={theme == 2 ? 'footeritemred' : 'footeritem'} title='Tienda' onClick={() => changeFeed(10) }><FaStore className={theme == 2 ? 'iconred' : 'icon'} /></li>:null}
        {session == 1 ? <li className={theme == 2 ? 'footeritemred' : 'footeritem'} title='Cerrar Sesión' onClick={() => changeSession(0)} ><FaSignInAlt className={theme == 2 ? 'iconred' : 'icon'} /></li> : null}
        {/* <FaCode className={theme==2?'iconred':'icon'}/> */}
        {isOnline ? (
      
          <li className={theme == 2 ? 'footeritemred' : 'footeritem'} >
             <FaWifi className='icongreen' />
        </li>
        ) : (
          <li className={theme == 2 ? 'footeritemred' : 'footeritem'} title='Iniciar Sesión' onClick={() => changeSession(1)}>
         <FaWifi className='icon' />
     </li>
        )}
   

      </ul>

     
   
    </nav>
  );
};
