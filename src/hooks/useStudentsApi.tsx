import { useEffect, useState } from "react";
import { tierraprometidaApi } from "../api/tierraprometidaApi";
import { Student } from "../interfaces/Students"; // Asegúrate de importar tu interfaz Student
import axios from "axios";

export const useStudentsApi = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [listStudents, setListStudents] = useState<Student[]>([]);
    const apiUrl: string = 'http://172.21.176.1:3000/api/tierraprometida/v1/students';

    // Cargar estudiantes desde la API
    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const response = await tierraprometidaApi.get<Student[]>(apiUrl);
            setListStudents(response.data);
        } catch (error) {
            console.error("Error loading students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Crear un nuevo estudiante en la API
    const createStudent = async (data: Student) => {
        const dataBody: Student = {
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            gender: data.gender,
            age: data.age,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            drug: data.drug,
            tutor: data.tutor,
            file: data.file,
            files: data.files, 
            description: data.description,
            startdate: data.startdate,
            enddate: data.enddate,
            status: data.status,
        };
    
        console.log("Datos a enviar:", dataBody); 
    
        try {
            await tierraprometidaApi.post(apiUrl, dataBody);
            loadStudents();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error creating student:", error.response?.data);
            } else {
                console.error("Error creating student:", error);
            }
        }
    };

    // Actualizar un estudiante existente en la API
    const updateStudent = async (data: Student) => {
        const dataBody: Student = {
            name: data.name,
            lastname: data.lastname,
            username: data.username,
            gender: data.gender,
            age: data.age,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address,
            drug: data.drug,
            tutor: data.tutor,
            file: data.file,
            files: data.files, 
            description: data.description,
            startdate: data.startdate,
            enddate: data.enddate,
            status: data.status,
        };

        try {
            await tierraprometidaApi.put(`${apiUrl}/${data._id}`, dataBody);
            loadStudents(); // Recargar la lista después de actualizar
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    // Eliminar un estudiante en la API
    const deleteStudent = async (data: Student) => {
        try {
            await tierraprometidaApi.delete(`${apiUrl}/${data._id}`);
            loadStudents(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Cargar la lista de estudiantes al montar el componente
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
