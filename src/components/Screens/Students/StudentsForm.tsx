import React, { useState } from 'react';
import { Student } from '../../../interfaces/Students';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { FaUser } from 'react-icons/fa';

// Props del formulario de estudiantes
interface StudentsFormProps {
    student: Student; // El estudiante a editar o crear
    onClose: () => void; // Función para cerrar el formulario
    onSave?: (student: Student) => void; // Función opcional para crear estudiante
}

export const StudentsForm: React.FC<StudentsFormProps> = ({ student, onClose, onSave }) => {
    const { updateStudent } = useStudentsApi(); // Hook para actualizar estudiante
    const [formData, setFormData] = useState<Student>(student); // Estado local del formulario
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Archivos seleccionados

    // Manejador de cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Manejador para la selección de archivos
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(Array.from(files)); // Convertir FileList a array
        }
    };

    // Función para convertir un archivo a base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convertimos los archivos seleccionados a base64
        const mappedFiles = await Promise.all(selectedFiles.map(async file => ({
            file: await fileToBase64(file), // Convertimos a base64
            title: file.name,
            date: new Date().toISOString(), // Convertimos la fecha a string (ISO)
        })));

        // Creamos un nuevo objeto `Student` con los archivos mapeados
        const updatedStudent: Student = {
            ...formData,
            files: mappedFiles, // Agregamos los archivos convertidos
        };

        if (onSave) {
            // Si `onSave` está definido, estamos creando un nuevo estudiante
            await onSave(updatedStudent);
        } else {
            // Si no, estamos actualizando un estudiante existente
            await updateStudent(updatedStudent);
        }
        onClose();
    };

    return (
        <div style={{ textAlign: 'center' }} className='form'>
            <h2 className='title'>{onSave ? 'Registrar Usuario' : formData.name}</h2>
            <FaUser style={{ alignSelf: 'center' }} className='icon' />
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: 900 }}>
                    <div>
                        <label className='texts'>Ingreso:</label>
                        <input
                            className='input'
                            type='date'
                            name='startdate'
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='texts'>Salida:</label>
                        <input
                            className='input'
                            type='date'
                            name='enddate'
                            value={formData.enddate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <p className='texts'>Usuario</p>
                <div style={{ display: 'flex', gap: 25 }}>
                    <div>
                        <label className='texts'>Nombres:</label>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='texts'>Apellidos:</label>
                        <input
                            className='input'
                            type='text'
                            name='lastname'
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='texts'>Edad:</label>
                        <input
                            className='inputs'
                            type='number'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='texts'>Género:</label>
                        <select
                            className='input'
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Género</option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Femenino'>Femenino</option>
                        </select>
                    </div>

                    <div>
                        <label className='texts'>Estancia:</label>
                        <input
                            className='inputs'
                            type='number'
                            name='stay'
                            value={formData.stay}
                            onChange={handleChange}
                            required
                        />
                        <label className='texts'>Meses</label>
                    </div>

                    <div>
                        <label className='texts'>Estado:</label>
                        <select
                            className='input'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Estado</option>
                            <option value='Baja'>Baja</option>
                            <option value='En Tratamiento'>En Tratamiento</option>
                            <option value='Egresado'>Egresado</option>
                        </select>
                    </div>
                </div>

                <p className='texts'>Archivos</p>
                <input
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    accept='.png, .jpg, .jpeg, .pdf'
                />
                <p className='texts'>Historial Clínico</p>

                <div style={{ display: 'flex', gap: 25 }} >
                    <div>
                        <label className='texts' >Sangre:</label>
                        <select
                            className='input'
                            name='blood'
                            value={formData.blood}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Tipo de Sangre</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            {/* Añadir más opciones según sea necesario */}
                        </select>
                    </div>


                    <div style={{ display: 'flex' }} >


                        <div>
                            <label className='texts' >Enfermedades:</label>
                            <input
                                className='input'
                                type='text'
                                name='disease'
                                value={formData.disease}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className='texts' >Alergias:</label>
                            <input
                                className='input'
                                type='text'
                                name='allergy'
                                value={formData.allergy}
                                onChange={handleChange}
                            />
                        </div>
                    </div>





                    <div>
                        <label className='texts' >Estigma:</label>
                        <select
                            className='input'
                            name='stigma'
                            value={formData.stigma}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Estigma</option>
                            <option value='A'>A</option>
                            <option value='D'>D</option>
                            <option value='A/D'>A/D</option>
                            {/* Añadir más opciones según sea necesario */}
                        </select>
                    </div>

                    <div>
                        <label className='texts' >Sustancia de Impacto:</label>
                        <select
                            className='input'
                            name='drug'
                            value={formData.drug}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Sustancia</option>
                            <option value='Cannabis'>Cannabis</option>
                            <option value='Alcohol'>Alcohol</option>
                            <option value='Metanfetamina'>Metanfetamina</option>
                            <option value='Heroina'>Heroína</option>
                            {/* Añadir más opciones según sea necesario */}
                        </select>
                    </div>

                </div>

                <p className='texts'>Responsable</p>

                <div style={{ display: 'flex' }} >

                    <div>
                        <label className='texts' >Responsable:</label>
                        <input
                            className='input'
                            type='text'
                            name='tutor'
                            value={formData.tutor}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div>
                        <label className='texts' >Correo Electrónico:</label>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required

                        />
                    </div>

                    <div>
                        <label className='texts' >Teléfono:</label>
                        <input
                            className='input'
                            type='text'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='texts' >Dirección:</label>
                        <input
                            className='input'
                            type='text'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <button className='button' type='submit'>{onSave ? 'Guardar' : 'Guardar Cambios'}</button>
                        <button className='button' type='button' onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};  