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
import { LoginScreen } from '../Screens/Login/LoginScreen';
import { useSession } from '../../context/SessionContext';

export const Layout: React.FC = () => {
    const { feed, changeFeed } = useFeed();
    const {session, changeSession}=useSession();
    const { authState } = useContext(AuthContext);

    // Verificar autenticación y ajustar feed en consecuencia
    useEffect(() => {
        if (authState.isLoggenIn) {
            changeFeed(1)
            changeSession(1); 
        }
    }, [authState.isLoggenIn]);

    // Renderizado de pantallas basado en feed
    switch (feed) {
        case 0:
            return <LoginScreen />;
        case 1:
            return <Feed />;
        case 2:
            return <About />;
        case 3:
            return <Services />;
        case 5:
            return <Location />;
        case 6:
            return <Contact />;
        case 7:
            return <Students />;
        case 10:
            return <Store />;
        case 11:
            return <Help />;
        default:
            return <section>Página Web No Disponible</section>;
    }
};
