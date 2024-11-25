import { useEffect, useState } from 'react';
import { tierraprometidaApi } from '../api/tierraprometidaApi';
import { Student } from '../interfaces/Students';
import axios from 'axios';

export const useStudentsApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [listStudents, setListStudents] = useState<Student[]>([]);
    const apiUrl: string = 'https://tierraprometida-production.up.railway.app/api/tierraprometida/v1/students';

    // Cargar estudiantes desde la API
    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const response = await tierraprometidaApi.get<Student[]>(apiUrl);
            setListStudents(response.data);
        } catch (error) {
            console.error('Error loading students:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Crear un nuevo estudiante en la API
    const createStudent = async (data: Student, files?: File[]) => {
        try {
            await tierraprometidaApi.post(apiUrl, data);
            // Aquí podrías manejar la carga de archivos si es necesario
            loadStudents();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating student:', error.response?.data);
            } else {
                console.error('Error creating student:', error);
            }
        }
    };

    // Actualizar un estudiante existente en la API
    const updateStudent = async (data: Student, files?: File[]) => {
        try {
            await tierraprometidaApi.put(`${apiUrl}/${data._id}`, data);
            // Aquí también podrías manejar la carga de archivos si es necesario
            loadStudents(); // Recargar la lista después de actualizar
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Eliminar un estudiante en la API
    const deleteStudent = async (data: Student) => {
        try {
            await tierraprometidaApi.delete(`${apiUrl}/${data._id}`);
            loadStudents(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };


    useEffect(() => {
        loadStudents();
    }, []);

    return {
        isLoading,
        listStudents,
        loadStudents,
        createStudent,
        updateStudent,
        deleteStudent,
    };
};
