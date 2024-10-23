import React from 'react';
import { useStudentsApi } from '../../hooks/useStudentsApi';
import { Student } from '../../interfaces/Students';

export const Folder: React.FC<{ studentId: string }> = ({ studentId }) => {
    const { listStudents } = useStudentsApi();
    
    const student: Student | undefined = listStudents.find(s => s._id === studentId);

    if (!student) {
        return <p>Estudiante no encontrado.</p>;
    }

    return (
        <div>
            <h1>Archivos de {student.name} {student.lastname}</h1>
            <p>Lista de archivos:</p>
            <ul>
                {student.files?.length ? (
                    student.files.map((file, index) => (
                        <li key={index}>{file.file}</li>
                    ))
                ) : (
                    <li>No hay archivos disponibles.</li>
                )}
            </ul>
        </div>
    );
};
