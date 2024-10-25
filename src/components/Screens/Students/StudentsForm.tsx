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
                <div style={{ display: 'flex', gap: 690 }}>
                    <div>
                     
                        <input
                            placeholder='Ingreso'
                            className='input'
                            type='date'
                            name='startdate'
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                 
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
                  
                        <input
                            placeholder='Nombre'
                            className='input'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                 

                 
                        <input
                        placeholder='Apellidos:'
                            className='input'
                            type='text'
                            name='lastname'
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
          

                    
                        <input
                            placeholder='Edad'
                            className='input'
                            type='number'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
    

                        <select
                            className='input'
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option >Género</option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Femenino'>Femenino</option>
                        </select>
            
                        <select
                            className='input'
                            name='stay'
                            value={formData.stay}
                            onChange={handleChange}
                            required
                        >
                            <option >Estancia</option>
                            <option value='4'>4 Meses</option>
                            <option value='6'>6 Meses</option>
                        </select>

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
                

                               <p className='texts'>Historial Clínico</p>

                <div style={{ display: 'flex', gap: 25 }} >
                
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
                        </select>


                            <input
                                placeholder='Enfermedades'
                                className='input'
                                type='text'
                                name='disease'
                                value={formData.disease}
                                onChange={handleChange}
                            />
                    

                            <input
                                placeholder='Alergias'
                                className='input'
                                type='text'
                                name='allergy'
                                value={formData.allergy}
                                onChange={handleChange}
                            />
             
                    

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
            
                        </select>

                        <select
                            className='input'
                            name='drug'
                            value={formData.drug}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Sustancia de Impacto</option>
                            <option value='Cannabis'>Cannabis</option>
                            <option value='Alcohol'>Alcohol</option>
                            <option value='Metanfetamina'>Metanfetamina</option>
                            <option value='Heroina'>Heroína</option>
                            {/* Añadir más opciones según sea necesario */}
                        </select>
                 

                </div>

                <p className='texts'>Responsable</p>

                <div style={{ display: 'flex', gap:25 }} >

            
                        <input
                            placeholder='Responsable'
                            className='input'
                            type='text'
                            name='tutor'
                            value={formData.tutor}
                            onChange={handleChange}
                            required
                        />
                    


                        <input
                            placeholder='Correo Electrónico'
                            className='input'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required

                        />
              
                        <input
                            placeholder='Teléfono'
                            className='input'
                            type='number'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    
                        <input
                            placeholder='Dirección'
                            className='input'
                            type='text'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    
                                   </div>
                                   
                                   
                    <p className='texts'>Archivos</p>

                <input
                    title='Subir Archivos del Usuario'
                    placeholder='Archivos'
                    className='button'
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    accept='.png, .jpg, .jpeg, .pdf'
                />

                <br />
                <br />

                    <div>
                        <button className='button' type='submit'>{onSave ? 'Guardar' : 'Guardar Cambios'}</button>
                        <button className='button' type='button' onClick={onClose}>Cancelar</button>
                    </div>
 
            </form>
        </div>

    );
};  