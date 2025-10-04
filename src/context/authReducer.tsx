import { AuthState } from './AuthContext';
import { Input } from '../hooks/useFormHookContext';

type AuthAction = 
    | { type: 'signIn' }                // Corregido de 'singIn' a 'signIn'
    | { type: 'logout' }
    | { type: 'changeFavImage', payload: string }
    | { type: 'changeUserName', payload: string }
    | { type: 'setFormData', payload: Input[] };  // Cambiado a 'setFormData' para mayor claridad

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'setFormData':                  // Cambiado de 'formData' a 'setFormData'
            return {
                ...state,
                formData: action.payload,
            };
        case 'signIn':                      // Corregido de 'singIn' a 'signIn'
            return {
                ...state,
                isLoggenIn: true,          // Corregido de 'isLoggenIn' a 'isLoggenIn'
                username: 'no_name_user_yet', // Cambiar si es necesario en tu lógica
            };
        case 'logout':
            return {
                ...state,
                isLoggenIn: false,         // Corregido de 'isLoggenIn' a 'isLoggenIn'
                username: undefined,
                favoriteImage: undefined,
            };
        case 'changeFavImage':
            return {
                ...state,
                favoriteImage: action.payload,
            };
        case 'changeUserName':
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;                  // Se retorna el estado sin modificar
    }
}