import { AuthState } from './AuthContext';
import { Input } from '../hooks/useFormHookContext';

type AuthAction = 
    | { type: 'signIn', payload?: { rol?: 'Administrador' | 'Usuario'; email?: string } }
    | { type: 'logout' }
    | { type: 'changeFavImage', payload: string }
    | { type: 'changeUserName', payload: string }
    | { type: 'setFormData', payload: Input[] };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch(action.type) {
        case 'signIn':
            return { 
                ...state, 
                isLoggenIn: true,
                username: 'no_name_user_yet',
                rol: action.payload?.rol || 'Usuario',
                email: action.payload?.email || undefined,
            };
        case 'logout':
            return { 
                isLoggenIn: false,
                username: undefined,
                favoriteImage: undefined,
                rol: undefined,
                email: undefined,
                formData: [],
            };
        case 'changeFavImage':
            return { ...state, favoriteImage: action.payload };
        case 'changeUserName':
            return { ...state, username: action.payload };
        case 'setFormData':
            return { ...state, formData: action.payload };
        default:
            return state;
    }
};
