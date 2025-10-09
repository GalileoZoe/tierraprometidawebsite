import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { authReducer } from './authReducer';
import { Input } from '../hooks/useFormHookContext';

export interface AuthState {
    isLoggenIn: boolean;
    username?: string;
    favoriteImage?: string;
    rol?: 'Administrador' | 'Usuario';
    email?: string;
    formData: Input[];
}

// Leer desde localStorage si existe
const storedAuth = localStorage.getItem('authState');
export const AuthInicialState: AuthState = storedAuth 
    ? JSON.parse(storedAuth)
    : {
        isLoggenIn: false,
        username: undefined,
        favoriteImage: undefined,
        rol: undefined,
        email: undefined,
        formData: [],
    };

export interface AuthContextProps {
    authState: AuthState;
    signIn: (rol?: 'Administrador' | 'Usuario', email?: string) => void;
    changeUserName: (userName: string) => void;
    logout: () => void;
    changeFavImage: (sourceImage: string) => void;
    setFormData: (data: Input[]) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(authReducer, AuthInicialState);

    // Guardar en localStorage cada vez que cambia authState
    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

    const signIn = (rol?: 'Administrador' | 'Usuario', email?: string) => {
        dispatch({ type: 'signIn', payload: { rol, email } });
    };

    const logout = () => dispatch({ type: 'logout' });
    const changeFavImage = (sourceImage: string) => dispatch({ type: 'changeFavImage', payload: sourceImage });
    const changeUserName = (userName: string) => dispatch({ type: 'changeUserName', payload: userName });
    const setFormData = (data: Input[]) => dispatch({ type: 'setFormData', payload: data });

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                changeUserName,
                logout,
                changeFavImage,
                setFormData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
