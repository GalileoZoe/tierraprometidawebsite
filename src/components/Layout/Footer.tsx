import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';
import { FaRegUser, FaSignInAlt, FaSignOutAlt, FaStore, FaToggleOff, FaToggleOn, FaUser, FaWifi } from 'react-icons/fa';
import { useFeed } from '../../context/FeedContext';
import { AuthContext } from '../../context/AuthContext';

export const Footer: React.FC = () => {
    const { theme, changeTheme } = useTheme();
    const { session, changeSession } = useSession();
    const { changeFeed } = useFeed();
    const { authState, logout } = useContext(AuthContext);
    
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
        <nav className='footer'>
            <ul className='footeritems'>
                <li
                    className={theme === 2 ? 'footeritemred' : 'footeritem'}
                    title='Modo Oscuro'
                    onClick={theme ===0 ? () => changeTheme(1) : () => changeTheme(0)}
                >
                    {theme === 0 ? <FaToggleOff className='icon' /> : <FaToggleOn className='icon' />}
                </li>
                <li
                    className={theme === 2 ? 'footeritemred' : 'footeritem'}
                    title='Iniciar Sesión'
                    onClick={() => changeFeed(0)}
                >
                    {session === 0 ? <FaRegUser className={theme === 2 ? 'iconred' : 'icon'} /> : <FaUser className={theme === 2 ? 'iconred' : 'icon'} />}
                </li>
                {session === 1 ? (
                    <li
                    className={theme === 2 ? 'footeritemred' : 'footeritem'}
                    title='Cerrar Sesión'
                    onClick={() => {
                        logout(); // Invocación correcta de la función logout
                        changeSession(0);
                        changeFeed(1);
                    }}
                >
                    <FaSignInAlt className={theme === 2 ? 'iconred' : 'icon'} />
                </li>
                ) : null}
               
                {isOnline ? (
                    <li className={theme === 2 ? 'footeritemred' : 'footeritem'}>
                        <FaWifi className='icongreen' />
                    </li>
                ) : (
                    <li className={theme === 2 ? 'footeritemred' : 'footeritem'} title={isOnline ? 'Conectado' : 'Sin Conexión'}>
                        <FaWifi className='icon' />
                    </li>
                )}
            </ul>
        </nav>
    );
};
