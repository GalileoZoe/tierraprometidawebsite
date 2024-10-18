import React, { useState } from 'react';
import { Student } from '../../../interfaces/Students';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { FaUser } from 'react-icons/fa';

interface StudentsFormProps {
    student: Student; // El estudiante a editar o crear
    onClose: () => void; // Función para cerrar el formulario
    onSave?: (student: Student) => void; // Función opcional para crear estudiante
}

export const StudentsForm: React.FC<StudentsFormProps> = ({ student, onClose, onSave }) => {
    const { updateStudent } = useStudentsApi(); // Para actualizar estudiante
    const [formData, setFormData] = useState<Student>(student); // Estado local para los datos del formulario

    // Manejador de cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Manejador para la selección de la sustancia de impacto
    const handleSelectDrug = (drug: string) => {
        setFormData(prevState => ({
            ...prevState,
            drug,
        }));
    };

    // Envío del formulario (ya sea para guardar o actualizar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            // Si `onSave` está definido, estamos creando un nuevo estudiante
            await onSave(formData);
        } else {
            // Si no, estamos actualizando un estudiante existente
            await updateStudent(formData);
        }
        onClose();
    };

    return (
        <div className='form'>
            <h2  className='title' >{onSave ? "Registrar Usuario" : formData.name}</h2>
            <FaUser  className='icon' />
            <form onSubmit={handleSubmit}>
                <div style={{display:'flex', gap:'50px'}} >
            <div>
                    <label className='texts' >Ingreso:</label>
                    <input
                        className='input'
                        type="date"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='texts' >Salida:</label>
                    <input
                        className='input'
                        type="date"
                        name="enddate"
                        value={formData.enddate}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <p className="texts">Usuario</p>
                <div  style={{display:'flex'}} >
                <div>
                    <label className='texts' >Nombre:</label>
                    <input
                        className='input'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='texts' >Apellidos:</label>
                    <input
                        className='input'
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                </div>

                <div>
                    <label className='texts' >Usuario:</label>
                    <input
                        className='input'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='texts' >Edad:</label>
                    <input
                        className='input'
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

             

                <div>
                    <label className='texts' >Sustancia de Impacto:</label>
                    <select
                        className='input'
                        name="drug"
                        value={formData.drug}
                        onChange={(e) => handleSelectDrug(e.target.value)}
                        required
                    >
                        <option value="">Sustancia</option>
                        <option value="Cannabis">Cannabis</option>
                        <option value="Alcohol">Alcohol</option>
                        <option value="Metanfetamina">Metanfetamina</option>
                        <option value="Heroina">Heroína</option>
                        {/* Añadir más opciones según sea necesario */}
                    </select>
                </div>

                <div>
                    <label className='texts' >Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

               
                <div>
                    <label className='texts' >Estado:</label>
                    <select
                        className='input'
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Estado</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <p className="texts">Responsable</p>

                <div>
                    <label className='texts' >Correo Electrónico:</label>
                    <input
                        className='input'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='texts' >Teléfono:</label>
                    <input
                        className='input'
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='texts' >Dirección:</label>
                    <input
                        className='input'
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <div>
                    <button className='button' type="submit">{onSave ? "Guardar" : "Guardar Cambios"}</button>
                    <button className='button' type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};
