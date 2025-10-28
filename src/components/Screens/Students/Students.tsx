import React, { useContext, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { PDFDocument } from '../../Components/PDFDocument';
import { Student } from '../../../interfaces/Students';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { 
    FaUser, FaPlus, FaArrowLeft, FaFilePdf, FaFolder, FaPen, FaTrash, 
    FaFemale, FaMale, FaMap, FaPhoneAlt, FaHome, FaDoorOpen, FaFileMedicalAlt,
    FaCannabis, FaCube, FaPills, FaSnowflake, FaSyringe, FaWineBottle,
    FaCircle, FaAngleDown, FaAngleUp, FaMoneyBill,
    FaFlask
} from 'react-icons/fa';

export const Students: React.FC = () => {
    const { isLoading, listStudents, deleteStudent, createStudent } = useStudentsApi();
    const { theme } = useTheme();
    const { authState } = useContext(AuthContext);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<Student | null>(null);
    const navigate = useNavigate();

    const handleDelete = (student: Student) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${student.name}?`)) deleteStudent(student);
    };

    const handleEdit = (student: Student) => setEditingStudent(student);
    const handleCreate = () => { setEditingStudent(null); setIsCreating(true); };
    const handleCloseForm = () => { setEditingStudent(null); setIsCreating(false); };
    const handleOpenDetail = (student: Student) => setSelectedDetail(student);
    const handleCloseDetail = () => setSelectedDetail(null);
    const handleShowFiles = (student: Student) => navigate(`/students/${student._id}/files`);
    const handleOpenPayments = (student: Student) => navigate(`/students/${student._id}/payments`);

    // Función para formatear fechas
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    if (selectedDetail) return (
        <div>
            {/* Puedes reutilizar StudentDetail */}
            <button onClick={handleCloseDetail}>Cerrar</button>
        </div>
    );

    if (editingStudent || isCreating) return (
        <div>
            {/* Puedes reutilizar StudentsForm */}
            <button onClick={handleCloseForm}>Cerrar Formulario</button>
        </div>
    );

    return (
        <section className='section'>
            <div className='marginvertical'>
                <h1 className='title'>Usuarios</h1>
                <FaUser className='icon' />
                <div style={{ margin: 20 }}>
                    <a onClick={handleCreate} className='button' style={{ float: 'right' }}>
                        <FaUser style={{ marginLeft: 10 }} />
                        <FaPlus style={{ marginRight: 10 }} />
                    </a>
                    <a onClick={() => navigate('/feed')} style={{ float: 'left' }}>
                        <FaArrowLeft className='icon' />
                    </a>
                </div>
            </div>

            {isLoading ? <p>Cargando...</p> : (
                <div className='tablemargin' style={{ margin: 30 }}>
                    <table className='table' style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>PDF</th>
                                <th>Usuario</th>
                                <th>Status</th>
                                <th>Edad</th>
                                <th>Género</th>
                                <th>Sustancia</th>
                                <th>Estigma</th>
                                <th>Responsable</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Ingreso</th>
                                <th>Estancia</th>
                                <th>Egreso</th>
                                <th>Reportes</th>
                                <th>Pagos</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudents.length > 0 ? listStudents
                                .filter(student => authState.rol === 'Usuario' ? student.email === authState.email : true)
                                .map(student => (
                                    <tr key={student._id}>
                                        <td className={theme===1?'texts':'textblack'}>{student._id}</td>
                                        <td className={theme===1?'texts':'textblack'}>
                                            <PDFDownloadLink document={<PDFDocument student={student} />} fileName={`${student.name}_${student.lastname}.pdf`}>
                                                <FaFilePdf className='icon' title={`PDF de ${student.name}`} />
                                            </PDFDownloadLink>
                                        </td>
                                      <td className={theme===1?'texts':'textblack'} 
    title={`Información de ${student.name}`}
    style={{cursor:'pointer'}}
    onClick={() => navigate(`/students/${student._id}`)}>
    {student.name} {student.lastname}
</td>
                                        <td className={theme===1?'texts':'textblack'}>
                                            {student.status === 'Baja' ? <FaAngleDown className='textred' title='Baja' /> :
                                             student.status === 'En Tratamiento' ? <FaCircle className='textgreens' title='En Tratamiento' /> :
                                             student.status === 'Egresado' ? <FaAngleUp className='textgreen' title='Egresado' /> : '-'}
                                        </td>
                                        <td className={theme===1?'texts':'textblack'}>{student.age}</td>
                                        <td className={theme===1?'texts':'textblack'}>{student.gender === 'Femenino' ? <FaFemale title='Femenino' /> : <FaMale title='Masculino' />}</td>
                                        <td className={theme===1?'texts':'textblack'}>
                                            {student.drug === 'Cannabis' ? <FaCannabis /> :
                                             student.drug === 'Alcohol' ? <FaWineBottle /> :
                                             student.drug === 'Metanfetamina' ? <FaCube /> :
                                             student.drug === 'Heroína' ? <FaSyringe /> :
                                             student.drug === 'Cocaína' ? <FaSnowflake /> :
                                             student.drug === 'Anfetaminas' ? <FaPills /> :
                                             student.drug === 'Solventes' ? <FaFlask /> : null}
                                        </td>
                                        <td className={theme===1?'texts':'textblack'}>{student.stigma}</td>
                                        <td className={theme===1?'texts':'textblack'}>{student.tutor}</td>
                                        <td className={theme===1?'texts':'textblack'}><FaMap title={student.address} /></td>
                                        <td className={theme===1?'texts':'textblack'}><a href={`tel:+52${student.phone}`}><FaPhoneAlt /></a></td>
                                        <td className={theme===1?'texts':'textblack'}>{formatDate(student.startdate)}</td>
                                        <td className={theme===1?'texts':'textblack'}><FaHome title={`${student.stay} Meses`} /></td>
                                        <td className={theme===1?'texts':'textblack'}>{formatDate(student.enddate)}</td>
                                        <td className={theme===1?'texts':'textblack'}><FaFileMedicalAlt /></td>
                                        <td className={theme===1?'texts':'textblack'} onClick={() => handleOpenPayments(student)} style={{ cursor: 'pointer' }}>
                                            <FaMoneyBill />
                                        </td>
                                        <td className={theme===1?'texts':'textblack'}>
                                            <FaFolder className='iconfile' onClick={() => handleShowFiles(student)} />
                                            <FaPen className='iconupdate' onClick={() => handleEdit(student)} />
                                            <FaTrash className='icon' onClick={() => handleDelete(student)} />
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan={17}>No hay usuarios</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};
