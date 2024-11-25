import { useReducer, useState, useContext } from 'react';
import { tierraprometidaApi } from '../api/tierraprometidaApi';
import { RequestLogin } from '../interfaces/Login';
import { AuthContext } from '../context/AuthContext';

export interface LoginData {
    email: string;
    password: string;
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
    const { singIn, changeUserName, changeFavImage } = useContext(AuthContext);

    const handleInputChange = (fieldName: keyof LoginData, value: string) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    const handleLogin = async () => {
        setLoading(true);
        const apiUrl = 'https://tierraprometida-production.up.railway.app/api/tierraprometida/v1/login';

        const dataBody = {
            email: state.email,
            password: state.password,
        };

        try {
            const response = await tierraprometidaApi.post<RequestLogin>(apiUrl, dataBody);

            if (response.data) {
                singIn();
                changeUserName(response.data.username); 
                changeFavImage(response.data.image);
                setRequest(response.data);
            } else {
                setRequest(null);
            }
        } catch (error) {
            console.error('No se recibieron los parámetros solicitados:', error);
            setRequest(null);
        } finally {
            setLoading(false);
        }
    };

    return { loading, state, handleLogin, handleInputChange, request };
};
