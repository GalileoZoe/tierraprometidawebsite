import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LogContextType {
    session: number;
    changeSession: (newSession: number) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Inicializar desde localStorage o usar valor por defecto
    const [session, setSession] = useState<number>(() => {
        const storedSession = localStorage.getItem('session');
        return storedSession ? parseInt(storedSession, 10) : 0;
    });

    // Actualizar localStorage cuando cambie el estado de la sesión
    useEffect(() => {
        localStorage.setItem('session', session.toString());
    }, [session]);

    const changeSession = (newSession: number) => {
        if ([0, 1].includes(newSession)) {
            setSession(newSession);
        } else {
            console.error('Invalid Session Value');
        }
    };

    return (
        <LogContext.Provider value={{ session, changeSession }}>
            {children}
        </LogContext.Provider>
    );
};

// Crear un hook para usar el contexto de manera más fácil
const useSession = (): LogContextType => {
    const context = useContext(LogContext);
    if (context === undefined) {
        throw new Error('useSession must be used within SessionProvider');
    }
    return context;
};

export { SessionProvider, useSession };
