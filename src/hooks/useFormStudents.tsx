import { useReducer } from 'react';
import { useStudentsApi } from './useStudentsApi'; 
import { Student, File, Report } from '../interfaces/Students'; 

// Definir la estructura de los datos del formulario
export interface FormStudentData {
    _id?: string;
    number?: string;
    name?: string;
    lastname?: string;
    username?: string;
    gender?: string;
    blood?: string;
    age?: string;
    email?: string;
    phone?: string;
    address?: string;
    disease?: string;
    allergy?: string;
    drug?: string;
    stigma?: string;
    treatment?: string;
    tutor?: string;
    stay?: string;
    description?: string;
    startdate?: string;
    enddate?: string;
    status?: string;
    files?: File[];        
    reports?: Report[];      
}

// Estado inicial del formulario
export const initialUseStateForm: FormStudentData = {
    _id: '',
    number: '',
    name: '',
    lastname: '',
    username: '',
    gender: '',
    blood: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    disease: '',
    allergy: '',
    stigma: '',
    treatment: '',
    drug: '',
    tutor: '',
    description: '',
    startdate: '',
    enddate: '',
    status: '',
    files: [],         
    reports: []             
};

// Definir la acción que maneja los cambios en los inputs del formulario
type Action = 
  | { type: 'handleInputChange', payload: { fieldName: keyof FormStudentData, value: string | number } }
  | { type: 'addFile', payload: File }        // Acción para agregar un archivo
  | { type: 'addReport', payload: Report };   // Acción para agregar un reporte

// Reducer que actualiza el estado del formulario
const formReducer = (state: FormStudentData, action: Action) => {
    switch (action.type) {
        case 'handleInputChange':
            return { ...state, [action.payload.fieldName]: action.payload.value };
        case 'addFile':
            return { ...state, files: [...state.files!, action.payload] };
        case 'addReport':
            return { ...state, reports: [...state.reports!, action.payload] };
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

    // Función para convertir un archivo a Base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file as unknown as Blob);  // Convierte el archivo a base64
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Función para manejar la carga de archivos
    const handleFileUpload = async (file: File) => {
        const base64File = await convertToBase64(file);
        const newFile: File = {
            file: base64File,
            title: file.title,
            date: new Date().toISOString()  // Añadir la fecha actual
        };
        dispatch({ type: 'addFile', payload: newFile });
    };

    // Función para manejar la creación de reportes
    const handleAddReport = (report: string, author: string) => {
        const newReport: Report = {
            report,
            author: author,
            date: new Date().toISOString()  // Añadir la fecha actual
        };
        dispatch({ type: 'addReport', payload: newReport });
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
        state,                  // El estado del formulario
        handleInputChange,      // Función para manejar cambios en los inputs
        handleSubmit,           // Función para manejar el envío del formulario
        deleteStudent,          // Función para eliminar un estudiante
        handleFileUpload,       // Función para manejar la carga de archivos
        handleAddReport         // Función para manejar la creación de reportes
    };
};
