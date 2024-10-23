import React from 'react';
import { Student } from '../../../interfaces/Students';
import { FaPhone, FaMap, FaCannabis, FaWineBottle, FaSnowflake, FaSyringe, FaFemale, FaMale, FaAlignLeft } from 'react-icons/fa';

interface StudentDetailProps {
    student: Student;
    onClose: () => void; // Función para cerrar el detalle
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
    return (
        <div className="student-detail-modal">
            <div className="student-detail-content">
             
                <h2 className='title' >{student.name} {student.lastname}</h2>
                <p><strong>Edad:</strong> {student.age}</p>
                <p><strong>Género:</strong> {student.gender === 'Femenino' ? <FaFemale /> : <FaMale />}</p>
                <p><strong>Grupo Sanguíneo:</strong> {student.blood}</p>
                <p><strong>Sustancia:</strong> {(() => {
                    switch (student.drug) {
                        case 'Cannabis':
                            return <FaCannabis title='Cannabis' />;
                        case 'Alcohol':
                            return <FaWineBottle title='Alcohol' />;
                        case 'Metanfetamina':
                            return <FaSnowflake title='Metanfetamina' />;
                        case 'Heroina':
                            return <FaSyringe title='Heroína' />;
                        default:
                            return 'No disponible';
                    }
                })()}
                </p>
                <p><strong>Tutor:</strong> {student.tutor}</p>
                <p><strong>Dirección:</strong> <FaMap title={student.address} /> {student.address}</p>
                <p><strong>Teléfono:</strong> <FaPhone title={student.phone} /> {student.phone}</p>
                <p><strong>Descripción:</strong> <FaAlignLeft title={student.description} /> {student.description}</p>
                <p><strong>Fecha de Ingreso:</strong> {student.startdate}</p>
                <p><strong>Estancia:</strong> {student.stay ? `${student.stay} Meses` : 'No disponible'}</p>
                <p><strong>Fecha de Egreso:</strong> {student.enddate}</p>
                <p><strong>Estado:</strong> {student.status}</p>
            </div>
            <button onClick={onClose} className="close-btn">Cerrar</button>
            </div>
    );
};
