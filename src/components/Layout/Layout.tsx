import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { About } from '../Screens/About';
import { Contact } from '../Screens/Contact';
import { Feed } from '../Screens/Feed';
import { HolaMundo } from '../Screens/HolaMundo';
import { Location } from '../Screens/Location';
import { Services } from '../Screens/Services';
import { Students } from '../Screens/Students/Students';
import { Student } from '../../interfaces/Students';
import { useStudentsApi } from '../../hooks/useStudentsApi';
import { Store } from '../Screens/Store/Store';
import { Help } from '../Screens/Help';

export const Layout: React.FC = () => {
    const { feed } = useFeed(); 
    const { listStudents } = useStudentsApi();
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

 
    switch (feed) {
        case 0:
            return <HolaMundo />;
        case 1:
            return <Feed/>;
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
        case 8: 
            return null;
        case 10:
            return <Store />;
        case 11:
            return <Help />;
        default:
            return <section>Página Web No Disponible</section>;
    }
};
