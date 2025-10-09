import React, { useContext, useEffect } from 'react';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext'; 
import { useFeed } from '../../context/FeedContext';
import { About } from '../Screens/About';
import { Contact } from '../Screens/Contact';
import { Feed } from '../Screens/Feed';
import { Location } from '../Screens/Location';
import { Services } from '../Screens/Services';
import { Students } from '../Screens/Students/Students';
import { Store } from '../Screens/Store/Store';
import { Help } from '../Screens/Help';
import { Login } from '../Screens/Login/Login';
import { useSession } from '../../context/SessionContext';
import { Events } from '../Screens/Events';
import { Payments } from '../Screens/Payments/Payments';
import { LoginRegister } from '../Screens/Login/LoginRegister';

export const Layout: React.FC = () => {
    const { feed, changeFeed } = useFeed();
    const { changeSession } = useSession();
    const { authState } = useContext(AuthContext);

    // Verificar autenticación y ajustar feed en consecuencia
    useEffect(() => {
        if (authState.isLoggenIn) {
            changeFeed(1); // Cambiar feed a la pantalla principal
            changeSession(1); // Cambiar sesión a activa
        }
    }, [authState.isLoggenIn]);

    // Renderizado de pantallas basado en feed
    switch (feed) {
        case 0:
            return <Login/>;
        case 1:
            return <Feed />;
        case 2:
            return <About />;
        case 3:
            return <Services />;
        case 4:
            return <Events />;
        case 5:
            return <Location />;
        case 6:
            return <Contact />;
        case 7:
            return <Students />;
        case 8:
            return <Payments/>;
        case 10:
            return <Store />;
        case 11:
            return <Help />;
        case 12:
            return <LoginRegister />;
        default:
            return <section><a href="https://wa.me/7221427901" onClick={() => changeFeed(1)}>Página Web No Disponible</a></section>;
    }
};
