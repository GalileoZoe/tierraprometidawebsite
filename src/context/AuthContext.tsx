import React,{ createContext, useReducer, ReactNode } from 'react';
import { authReducer } from './authReducer';
import { Input } from '../hooks/useFormHookContext';

// Definir como va trabajar la información en el context
export interface AuthState{
    isLoggenIn: boolean;
    username?: string | undefined;
    favoriteImage?: string | undefined;
    formData: Input[];
}

// Definir estado inicial
export const AuthInicialState:AuthState = {
    isLoggenIn: false,
    username: undefined,
    favoriteImage: undefined,
    formData: [],
}

// Tipo de context que manejaran otros components
export interface AuthContextProps{
    authState: AuthState;
    singIn: () => void;
    changeUserName: ( userName: string ) => void;
    logout: () => void;
    changeFavImage: ( sourceImage: string ) => void;
    formData: ( data: Input[] ) => void;
}

// Crear context
export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ( { children }: {children: ReactNode} ) => { 

    // Parte reducer, implementar hasta que ya se tenga todo el useContext
    const [ authState, dispatch ] = useReducer(authReducer, AuthInicialState);

    const singIn = () => {
        dispatch({type: 'signIn'});
    }

    const logout = () => {
        dispatch({type: 'logout'});
    }

    const changeFavImage = ( sourceImage: string ) => {
        dispatch({type:'changeFavImage', payload: sourceImage});
    }

    const changeUserName = ( userName: string ) => {
        dispatch({type:'changeUserName', payload: userName});
    }

    const formData = ( data: Input[] ) => {
        dispatch({ type: 'setFormData', payload: data });
    }

    return(
        <AuthContext.Provider
            value={{
                authState,
                singIn,
                changeFavImage,
                logout,
                changeUserName,
                formData
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}