import { useReducer, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export interface Input {
    email: string;
    username: string;
    password: string;
}

interface FormData {
    data: Input[];
    input: Input;
}

interface UseFormContext {
    state: FormData;
    handleInputChange: (fieldName: keyof Input, value: string) => void;
    handleSubmit: () => void;
}

const initialStateForm: FormData = {
    data: [],
    input: {
        email: '',
        username: '',
        password: '',
    },
};

type Action =
    | { type: 'handleInputChange'; payload: { fieldName: keyof Input; value: string } }
    | { type: 'handleSubmit' }
    | { type: 'resetForm' };

const formReducer = (state: FormData, action: Action): FormData => {
    switch (action.type) {
        case 'resetForm':
            return {
                ...state,
                input: {
                    email: '',
                    username: '',
                    password: '',
                },
            };
        case 'handleSubmit':
            return {
                ...state,
                data: [...state.data, state.input],
            };
        case 'handleInputChange':
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.payload.fieldName]: action.payload.value,
                },
            };
        default:
            return { ...state };
    }
};

export const useFormHookContext = (): UseFormContext => {
    const [state, dispatch] = useReducer(formReducer, initialStateForm);
    const { authState, formData } = useContext(AuthContext);

    const handleInputChange = (fieldName: keyof Input, value: string): void => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    const handleSubmit = (): void => {
        dispatch({ type: 'handleSubmit' });
        formData([...authState.formData, state.input]);
        dispatch({ type: 'resetForm' });
    };

    return {
        state,
        handleInputChange,
        handleSubmit,
    };
};