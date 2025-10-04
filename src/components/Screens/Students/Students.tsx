import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { PDFDocument } from '../../Components/PDFDocument';
import { Student } from '../../../interfaces/Students';
import { useTheme } from '../../../context/ThemeContext';
import { useFeed } from '../../../context/FeedContext';
import { useID } from '../../../context/IDContext';
import { StudentsForm } from './StudentsForm';
import { StudentDetail } from './StudentDetail';
import StudentsFiles from './StudentsFiles';
import { 
    FaUser, FaPlus, FaArrowLeft, FaFilePdf, FaFolder, FaPen, FaTrash, 
    FaFemale, FaMale, FaMap, FaPhoneAlt, FaHome, FaDoorOpen, FaFileMedicalAlt,
    FaCannabis, FaCube, FaPills, FaSnowflake, FaSyringe, FaWineBottle, FaFlask,
    FaCircle, FaAngleDown, FaAngleUp
} from 'react-icons/fa';

export const Students: React.FC = () => {
    const { isLoading, listStudents, deleteStudent, createStudent } = useStudentsApi();
    const { theme } = useTheme();
    const { changeFeed } = useFeed();
    const { selectedStudent, setSelectedStudent } = useID();

    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<Student | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<Student | null>(null);

    const handleDelete = (student: Student) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${student.name}?`)) deleteStudent(student);
    };

    const handleEdit = (student: Student) => setEditingStudent(student);
    const handleCreate = () => { setEditingStudent(null); setIsCreating(true); };
    const handleCloseForm = () => { setEditingStudent(null); setIsCreating(false); };
    const handleOpenDetail = (student: Student) => setSelectedDetail(student);
    const handleCloseDetail = () => setSelectedDetail(null);
    const handleShowFiles = (student: Student) => setSelectedFiles(student);
    const handleCloseFiles = () => setSelectedFiles(null);

    const handleOpenPayments = (student: Student) => {
        setSelectedStudent(student);
        changeFeed(8);
    };

    if (selectedDetail) return <StudentDetail student={selectedDetail} onClose={handleCloseDetail} />;
    if (selectedFiles) return <StudentsFiles files={selectedFiles.files || []} student={selectedFiles} onClose={handleCloseFiles} />;
    if (editingStudent || isCreating) return (
        <StudentsForm
            student={editingStudent || { name: '', lastname: '', username: '', age: '', email: '', phone: '', address: '', drug: '', description: '', status: '', startdate: '', enddate: '' }}
            onClose={handleCloseForm}
            onSave={isCreating ? createStudent : undefined}
        />
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
                    <a onClick={() => changeFeed(1)} style={{ float: 'left' }}>
                        <FaArrowLeft className='icon' />
                    </a>
                </div>
            </div>

            {isLoading ? <p>Cargando...</p> : (
                <div className='tablemargin' style={{ margin: 30 }}>
                    <table className='table' style={{ textAlign: 'center' }}>
                        <thead>
                            <tr style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'transparent', zIndex: 1 }}>
                                <th className='tableheader'>No.</th>
                                <th className='tableheader'>PDF</th>
                                <th className='tableheader'>Usuario</th>
                                <th className='tableheader'>Status</th>
                                <th className='tableheader'>Edad</th>
                                <th className='tableheader'>Género</th>
                                <th className='tableheader'>Sustancia</th>
                                <th className='tableheader'>Estigma</th>
                                <th className='tableheader'>Responsable</th>
                                <th className='tableheader'>Dirección</th>
                                <th className='tableheader'>Teléfono</th>
                                <th className='tableheader'>Ingreso</th>
                                <th className='tableheader'>Estancia</th>
                                <th className='tableheader'>Egreso</th>
                                <th className='tableheader'>Reportes</th>
                                <th className='tableheader'>Tienda</th>
                                <th className='tableheader'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudents.length > 0 ? listStudents.map(student => (
                                <tr key={student._id} style={{ textAlign: 'center', fontSize: '15px' }}>
                                    <td className={theme===1?'texts':'textblack'}>{student.number}</td>
                                    <td className={theme===1?'texts':'textblack'}>
                                        <PDFDownloadLink document={<PDFDocument student={student} />} fileName={`${student.name}_${student.lastname}.pdf`}>
                                            <FaFilePdf className='icon' title={`PDF de ${student.name}`} />
                                        </PDFDownloadLink>
                                    </td>
                                    <td className={theme===1?'texts':'textblack'} title={`Información de ${student.name}`} onClick={() => handleOpenDetail(student)}>
                                        {student.name} {student.lastname}
                                    </td>
                                    <td className={theme===1?'texts':'textblack'}>
                                        {student.status === 'Baja' ? <FaAngleDown className='textred' title='Baja' /> :
                                         student.status === 'En Tratamiento' ? <FaCircle className='textgreens' title='En Tratamiento' /> :
                                         student.status === 'Egresado' ? <FaAngleUp className='textgreen' title='Egresado' /> : <span>Status No Disponible</span>}
                                    </td>
                                    <td className={theme===1?'texts':'textblack'}>{student.age}</td>
                                    <td className={theme===1?'texts':'textblack'}>{student.gender === 'Femenino' ? <FaFemale title='Femenino' /> : <FaMale title='Masculino' />}</td>
                                    <td className={theme===1?'texts':'textblack'}>
                                        {student.drug === 'Cannabis' ? <FaCannabis title='Cannabis' /> :
                                         student.drug === 'Alcohol' ? <FaWineBottle title='Alcohol' /> :
                                         student.drug === 'Metanfetamina' ? <FaCube title='Metanfetamina' /> :
                                         student.drug === 'Heroína' ? <FaSyringe title='Heroína' /> :
                                         student.drug === 'Cocaína' ? <FaSnowflake title='Cocaína' /> :
                                         student.drug === 'Anfetaminas' ? <FaPills title='Anfetaminas' /> :
                                         student.drug === 'Solventes' ? <FaFlask title='Solventes' /> : null}
                                    </td>
                                    <td className={theme===1?'texts':'textblack'} title='Estigma'>{student.stigma}</td>
                                    <td className={theme===1?'texts':'textblack'} title={`Responsable de ${student.name}`}>{student.tutor}</td>
                                    <td className={theme===1?'texts':'textblack'}><FaMap title={student.address} /></td>
                                    <td className={theme===1?'texts':'textblack'}><a href={`tel:+52${student.phone}`}><FaPhoneAlt title={student.phone} /></a></td>
                                    <td className={theme===1?'texts':'textblack'}>{student.startdate}</td>
                                    <td className={theme===1?'texts':'textblack'}><FaHome title={`${student.stay} Meses`} /></td>
                                    <td className={theme===1?'texts':'textblack'}><FaDoorOpen title={student.enddate} /></td>
                                    <td className={theme===1?'texts':'textblack'}><FaFileMedicalAlt title={`Reportes de ${student.name}`} /></td>
                                    <td className={theme===1?'texts':'textblack'} onClick={() => handleOpenPayments(student)} style={{ cursor: 'pointer' }} title={`Saldo disponible en Tienda de ${student.name}`}>{student.check}</td>
                                    <td className={theme===1?'texts':'textblack'}>
                                        <FaFolder className='iconfile' title={`Archivos de ${student.name}`} onClick={() => handleShowFiles(student)} />
                                        <FaPen className='iconupdate' title={`Editar Información de ${student.name}`} onClick={() => handleEdit(student)} />
                                        <FaTrash className='icon' title={`Eliminar a ${student.name}`} onClick={() => handleDelete(student)} />
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
