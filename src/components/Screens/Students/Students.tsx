import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { PDFDocument } from '../../Components/PDFDocument';
import { Student } from '../../../interfaces/Students';
import { FaFilePdf, FaMap, FaFolder, FaPen, FaTrash, FaPlus, FaUser, FaFemale, FaMale, FaFileMedicalAlt, FaFileMedical } from 'react-icons/fa';
import { StudentsForm } from './StudentsForm';
import { useTheme } from '../../../context/ThemeContext';

export const Students: React.FC = () => {
    const { isLoading, listStudents, deleteStudent, createStudent } = useStudentsApi();
    const { theme } = useTheme();
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false); // Nuevo estado para creación

    const handleDelete = (student: Student) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este estudiante?");
        if (confirmDelete) {
            deleteStudent(student);
        }
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
    };

    const handleCreate = () => {
        setEditingStudent(null); // Limpiar cualquier edición previa
        setIsCreating(true); // Activar creación
    };

    const handleCloseForm = () => {
        setEditingStudent(null);
        setIsCreating(false); // Desactivar creación al cerrar formulario
    };

    if (editingStudent || isCreating) {
        return (
            <StudentsForm
                student={editingStudent || { name: '', lastname: '', username: '', age: '', email: '', phone: '', address: '', drug: '', description: '', status: '', startdate: '', enddate: '' }}
                onClose={handleCloseForm}
                onSave={isCreating ? createStudent : undefined} // Si estamos creando, usa createStudent
            />
        );
    }

    return (
        <div>
            <h1 className='title'>Usuarios</h1>
            <a onClick={handleCreate} className='button'>
                <FaUser style={{ marginLeft: 10 }} />
                <FaPlus style={{ marginRight: 10 }} />
            </a>
            <br />
            <br />
            {isLoading ? (
                <p className='icon' >Cargando...</p>
            ) : (
                <div className='tablemargin'>
                    <table className='table'>
                        <thead>
                            <tr style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'transparent', zIndex: 1 }}>
                                <th className='tableheader' >No.</th>
                                <th className='tableheader' >PDF</th>
                                <th className='tableheader' >Usuario</th>
                                <th className='tableheader' >Edad</th>
                                <th className='tableheader' >Género</th>
                                <th className='tableheader' >Tipo de Sangre</th>
                                <th className='tableheader' >Responsable</th>
                                <th className='tableheader' >Dirección</th>
                                <th className='tableheader' >Teléfono</th>
                                <th className='tableheader' >Sustancia</th>
                                <th className='tableheader' >Descripción</th>
                                <th className='tableheader' >Estado</th>
                                <th className='tableheader' >Ingreso</th>
                                <th className='tableheader' >Estancia</th>
                                <th className='tableheader' >Egreso</th>
                                <th className='tableheader' >Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudents.length > 0 ? (
                                listStudents.map((student: Student) => (
                                    <tr key={student._id} style={{ textAlign: 'center', zIndex: 1, fontSize: '15px' }}>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.number}</td>
                                        <td>
                                            <PDFDownloadLink
                                                document={<PDFDocument student={student} />}
                                                fileName={`${student.name}_${student.lastname}.pdf`}
                                            >
                                                <FaFilePdf className='icon' />
                                            </PDFDownloadLink>
                                        </td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.name} {student.lastname}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.age}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.gender == 'Femenino' ? <FaFemale className='icon' /> : <FaMale className='icon' />}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.blood}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.tutor}</td>
                                        {/* <td className={theme==0?'texts':'textblack'} >{student.email}</td> */}
                                        <td className={theme == 0 ? 'texts' : 'textblack'} ><FaMap className='icon' /></td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.phone}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.drug}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} ><FaFileMedicalAlt className='icon' /></td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.status}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.startdate}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.stay ? `${student.stay} Meses` : null}</td>
                                        <td className={theme == 0 ? 'texts' : 'textblack'} >{student.enddate}</td>
                                        <td>
                                            <FaFolder className='iconfile' />
                                            <FaPen
                                                className='iconupdate'
                                                onClick={() => handleEdit(student)}
                                            />
                                            <FaTrash
                                                className='icondelete'
                                                onClick={() => handleDelete(student)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={13}>No hay estudiantes disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
