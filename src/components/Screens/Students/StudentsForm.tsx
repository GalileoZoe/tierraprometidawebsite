import React, { useState } from 'react';
import { Student } from '../../../interfaces/Students';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { FaFile, FaUser } from 'react-icons/fa';
import { useFeed } from '../../../context/FeedContext';

// Props del formulario de estudiantes
interface StudentsFormProps {
    student: Student;
    onClose: () => void;
    onSave?: (student: Student) => void;
}

export const StudentsForm: React.FC<StudentsFormProps> = ({ student, onClose, onSave }) => {
    const { updateStudent } = useStudentsApi();
    const [formData, setFormData] = useState<Student>(student);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [currentStep, setCurrentStep] = useState(1); // Controla el paso actual
    const {changeFeed}=useFeed();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const mappedFiles = await Promise.all(selectedFiles.map(async file => ({
            file: await fileToBase64(file),
            title: file.name,
            date: new Date().toISOString(),
        })));

        const updatedStudent: Student = {
            ...formData,
            files: mappedFiles,
        };

        if (onSave) {
            await onSave(updatedStudent);
        } else {
            await updateStudent(updatedStudent);
        }
        onClose();
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>

        
             

                        <h3 className='texts'>Usuario</h3>
                        
                        <input
                            placeholder='Ingreso'
                            className='inputred'
                            type='date'
                            name='startdate'
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                            
                        />
                
                        <input
                            placeholder='Egreso'
                            className='inputred'
                            type='date'
                            name='enddate'
                            value={formData.enddate}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Nombre"
                            className="inputred"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Apellidos"
                            className="inputred"
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Edad"
                            className="inputred"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <select
                            className="inputred"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>Historial Clínico</h3>
                        <select
                            className="inputred"
                            name="blood"
                            value={formData.blood}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Tipo de Sangre</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <input
                            placeholder="Enfermedades"
                            className="inputred"
                            type="text"
                            name="disease"
                            value={formData.disease}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Alergias"
                            className="inputred"
                            type="text"
                            name="allergy"
                            value={formData.allergy}
                            onChange={handleChange}
                            required
                        />
                        <select
                            className="inputred"
                            name="drug"
                            value={formData.drug}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sustancia de Impacto</option>
                            <option value="Cannabis">Cannabis</option>
                            <option value="Alcohol">Alcohol</option>
                            <option value="Metanfetamina">Metanfetamina</option>
                        </select>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>Datos del Responsable</h3>
                        <input
                            placeholder="Responsable"
                            className="inputsred"
                            type="text"
                            name="tutor"
                            value={formData.tutor}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Correo Electrónico"
                            className="inputsred"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Teléfono"
                            className="inputred"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Dirección"
                            className="inputred"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className='section'>
            
<h2 className='title'>{onSave ? 'Registrar Usuario' : formData.name}</h2>
            <FaUser style={{ alignSelf: 'center' }} className='icon' />
        <div className="form">
            <form onSubmit={handleSubmit}>
                {renderStep()}
                <div style={{gap:20}}>
                    {currentStep===1&&
                     <button type="button" className='buttons' onClick={() => changeFeed(1)}>
                     Cancelar
                 </button>}
                    {currentStep > 1 && (
                        <button type="button" className='buttons' onClick={() => setCurrentStep(currentStep - 1)}>
                            Atrás
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button type="button" className='buttons' onClick={() => setCurrentStep(currentStep + 1)}>
                            Siguiente
                        </button>
                    )}
                    {currentStep === 3 && <button className='button' type="submit">Guardar</button>}
                </div>
            </form>
        </div>
        </section>
    );
};
