import { useEffect, useState } from 'react';
import { tierraprometidaApi } from '../api/tierraprometidaApi';
import { Student, File, Report } from '../interfaces/Students';
import axios from 'axios';

export const useStudentsApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [listStudents, setListStudents] = useState<Student[]>([]);
    const apiUrl: string = 'http://localhost:3000/api/tierraprometida/v1/students';

    // -----------------------------
    // Cargar estudiantes desde la API
    // -----------------------------
    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const response = await tierraprometidaApi.get<Student[]>(apiUrl);
            // Filtrar estudiantes que no estén soft deleted
            const activeStudents = response.data.filter(s => !s.softdelete);
            setListStudents(activeStudents);
        } catch (error) {
            console.error('Error loading students:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // -----------------------------
    // Crear un nuevo estudiante
    // -----------------------------
    const createStudent = async (data: Student, files?: File[], reports?: Report[]) => {
        try {
            const payload = { ...data, files, reports };
            await tierraprometidaApi.post(apiUrl, payload);
            loadStudents();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating student:', error.response?.data);
            } else {
                console.error('Error creating student:', error);
            }
        }
    };

    // -----------------------------
    // Actualizar un estudiante existente
    // -----------------------------
    const updateStudent = async (data: Student, files?: File[], reports?: Report[]) => {
        try {
            const payload = { ...data, files, reports };
            await tierraprometidaApi.put(`${apiUrl}/${data._id}`, payload);
            loadStudents(); // Recargar la lista después de actualizar
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error updating student:', error.response?.data);
            } else {
                console.error('Error updating student:', error);
            }
        }
    };

    // -----------------------------
    // Eliminar un estudiante permanentemente
    // -----------------------------
    const deleteStudent = async (student: Student) => {
        try {
            await tierraprometidaApi.delete(`${apiUrl}/${student._id}`);
            loadStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    // -----------------------------
    // Soft delete (marcar como eliminado)
    // -----------------------------
    const softDeleteStudent = async (student: Student) => {
        try {
            await tierraprometidaApi.put(`${apiUrl}/soft/${student._id}`);
            loadStudents();
        } catch (error) {
            console.error('Error soft deleting student:', error);
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
        softDeleteStudent, // <-- añadido
    };
};
