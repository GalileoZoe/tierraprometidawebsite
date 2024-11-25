import React, { useState } from 'react';

interface StudentsFormFileProps {
    studentId: string;
    onClose: () => void;
}

const StudentsFormFile: React.FC<StudentsFormFileProps> = ({ studentId, onClose }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            // Lógica para enviar el archivo
            console.log(`Subiendo archivo para el estudiante con ID: ${studentId}`);
        }
    };

    return (
        <div>
            <h2>Subir Archivo para el Estudiante {studentId}</h2>
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleFileChange} />
                <button type='submit'>Subir Archivo</button>
            </form>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default StudentsFormFile;
