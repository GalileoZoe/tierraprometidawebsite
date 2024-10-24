import React, { useState } from 'react';
import { Student } from '../../../interfaces/Students';

interface Report {
    report: string;
    author: string;
    date: string;
}

interface StudentsFormReportProps {
    student: Student;
    onClose: () => void;
    onSave: (updatedStudent: Student) => void;
}

export const StudentsFormReport: React.FC<StudentsFormReportProps> = ({ student, onClose, onSave }) => {
    const [reportText, setReportText] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleSave = () => {
        const newReport: Report = { report: reportText, author, date };
        const updatedStudent = {
            ...student,
            reports: [...(student.reports || []), newReport] // Añadir nuevo reporte al array
        };
        onSave(updatedStudent);
    };

    return (
        <div className='modal'>
            <h2>Agregar Reporte para {student.name} {student.lastname}</h2>
            <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Escribe el reporte aquí..."
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Autor del reporte"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSave}>Guardar Reporte</button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};
