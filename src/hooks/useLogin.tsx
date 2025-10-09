import { useReducer, useState, useContext } from 'react';
import { tierraprometidaApi } from '../api/tierraprometidaApi';
import { RequestLogin } from '../interfaces/Login';
import { AuthContext } from '../context/AuthContext';

export interface LoginData {
    photo?: string;
    username?: string;
    email?: string;
    password?: string;
    rol?: string;
}

const initialLoginData: LoginData = {
    password: '',
    email: '',
};

type Action = { type: 'handleInputChange', payload: { fieldName: keyof LoginData, value: string } };

const dataReducer = (state: LoginData, action: Action) => {
    switch (action.type) {
        case 'handleInputChange':
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        default:
            return state;
    }
};

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, dispatch] = useReducer(dataReducer, initialLoginData);
    const [request, setRequest] = useState<RequestLogin | null>(null);
    const { signIn, changeUserName, changeFavImage } = useContext(AuthContext);

    const handleInputChange = (fieldName: keyof LoginData, value: string) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    // LOGIN
    const handleLogin = async () => {
        setLoading(true);
        const apiUrl = 'http://localhost:3000/api/tierraprometida/v1/login';

        const dataBody = {
            email: state.email,
            password: state.password,
        };

        try {
            const response = await tierraprometidaApi.post<RequestLogin>(apiUrl, dataBody);

            if (response.data) {
                // Guardamos rol y email desde la API
                signIn(
    (response.data.rol === 'Administrador' ? 'Administrador' : 'Usuario'), 
    response.data.email
);
                changeUserName(response.data.username);
                changeFavImage(response.data.photo); 
                setRequest(response.data);
            } else {
                setRequest(null);
            }
        } catch (error) {
            console.error('Error login:', error);
            setRequest(null);
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const registerLogin = async () => {
        setLoading(true);
        const apiUrl = 'http://localhost:3000/api/tierraprometida/v1/login/register';

        const dataBody = {
            photo: state.photo,
            username: state.username,
            email: state.email,
            password: state.password,
            rol: state.rol,
        };

        try {
            const response = await tierraprometidaApi.post<RequestLogin>(apiUrl, dataBody);

            if (response.data) {
                // Guardamos rol y email desde la API
                signIn(
    (response.data.rol === 'Administrador' ? 'Administrador' : 'Usuario'), 
    response.data.email
);

                changeUserName(response.data.username);
                changeFavImage(response.data.photo);
                setRequest(response.data);
            } else {
                setRequest(null);
            }
        } catch (error) {
            console.error('Error register:', error);
            setRequest(null);
        } finally {
            setLoading(false);
        }
    };

    return { 
        loading, 
        state, 
        handleLogin, 
        registerLogin,
        handleInputChange, 
        request 
    };
};
