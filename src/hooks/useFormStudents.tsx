import { useReducer } from 'react';
import { useStudentsApi } from './useStudentsApi';  // Asegúrate de que este hook esté correctamente implementado

// Definir la estructura de los datos del formulario
export interface FormStudentData {
    _id?: string;
    number?: string;
    name?: string;
    lastname?: string;
    username?: string;
    gender?:string;
    age?: string;
    email?: string;
    phone?: string;
    address?: string;
    drug?: string;
    tutor?: string;
    stay?: string;
    description?: string;
    startdate?: string;
    enddate?: string;
    status?: string;
}

// Estado inicial del formulario
export const initialUseStateForm: FormStudentData = {
    _id: '',
    number: '',
    name: '',
    lastname: '',
    username: '',
    gender:'',
    age: '',
    email: '',
    phone: '',
    address: '',
    drug: '',
    tutor: '',
    description: '',
    startdate: '',
    enddate: '',
    status: ''
};

// Definir la acción que maneja los cambios en los inputs del formulario
type Action = { 
    type: 'handleInputChange', 
    payload: { fieldName: keyof FormStudentData, value: string | number } 
};

// Reducer que actualiza el estado del formulario
const formReducer = (state: FormStudentData, action: Action) => {
    switch (action.type) {
        case 'handleInputChange':
            return { ...state, [action.payload.fieldName]: action.payload.value };
        default:
            return state;
    }
};

// Hook personalizado que gestiona el formulario de estudiantes
export const useFormStudents = () => {
    const [state, dispatch] = useReducer(formReducer, initialUseStateForm);
    const { createStudent, updateStudent, deleteStudent } = useStudentsApi();

    // Función que despacha los cambios de los inputs del formulario
    const handleInputChange = (fieldName: keyof FormStudentData, value: string | number) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    // Función que maneja el envío del formulario (creación o actualización)
    const handleSubmit = async (isNew: boolean) => {
        if (isNew) {
            await createStudent(state);  // Llamada a la función para crear un estudiante
        } else {
            await updateStudent(state);  // Llamada a la función para actualizar un estudiante existente
        }
    };

    // Retornar el estado y las funciones para gestionar el formulario
    return {
        state,                // El estado del formulario
        handleInputChange,    // Función para manejar cambios en los inputs
        handleSubmit,         // Función para manejar el envío del formulario
        deleteStudent,        // Función para eliminar un estudiante (proporcionada por el hook `useStudentsApi`)
    };
};
