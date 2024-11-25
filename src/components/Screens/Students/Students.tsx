import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { PDFDocument } from '../../Components/PDFDocument';
import { Student } from '../../../interfaces/Students';
import { FaFilePdf, FaFileMedicalAlt, FaPen, FaTrash, FaPlus, FaUser, FaClinicMedical, FaFemale, FaMale, FaMap, FaPhone, FaSignOutAlt, FaFileAlt, FaFolder, FaAngleDown, FaAngleUp, FaCircle, FaArrowLeft, FaCannabis, FaCube, FaPills, FaSnowflake, FaSyringe, FaWineBottle, FaBed, FaHome, FaDoorOpen, FaExternalLinkAlt, FaRegPlusSquare, FaTimesCircle, FaDoorClosed, FaPhoneAlt } from 'react-icons/fa';
import { StudentsForm } from './StudentsForm';
import { useTheme } from '../../../context/ThemeContext';
import { StudentDetail } from './StudentDetail';
import StudentsFiles from './StudentsFiles'; // Importa el componente para mostrar archivos
import { useFeed } from '../../../context/FeedContext';

export const Students: React.FC = () => {
    const { isLoading, listStudents, deleteStudent, createStudent } = useStudentsApi();
    const { theme} = useTheme();
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para crear nuevo estudiante
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // Estado para el detalle
    const [selectedFiles, setSelectedFiles] = useState<Student | null>(null); // Estado para mostrar archivos
    const {feed, changeFeed}=useFeed();

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

    const handleOpenDetail = (student: Student) => {
        setSelectedStudent(student); // Mostrar el detalle del estudiante
    };

    const handleCloseDetail = () => {
        setSelectedStudent(null); // Cerrar el detalle
    };

    const handleShowFiles = (student: Student) => {
        setSelectedFiles(student); // Mostrar archivos del estudiante
    };

    const handleCloseFiles = () => {
        setSelectedFiles(null); // Cerrar el componente de archivos
    };

    if (selectedStudent) {
        return (
            <StudentDetail student={selectedStudent} onClose={handleCloseDetail} />
        );
    }

    if (selectedFiles) {
        return (
            <StudentsFiles
                files={selectedFiles?.files || []} // Asegúrate de pasar un array vacío si no hay archivos
                student={selectedFiles} // Asegúrate de pasar el estudiante seleccionado
                onClose={handleCloseFiles}
            />
        );
    }

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
        <section className="section">
            <div>
                <h1 className="title">Usuarios</h1>
                <FaUser className="icon" />
                <br />

                <a onClick={handleCreate} className="button" style={{float:'right'}} >
                    <FaUser style={{ marginLeft: 10 }} />
                    <FaPlus style={{ marginRight: 10 }} />
                </a>
                <a onClick={()=>changeFeed(1)} style={{float:'left'}} >
                    <FaArrowLeft className='icon'/>
                </a>
                <br />
                <br />
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="tablemargin">
                        <table className="table" style={{textAlign:'center'}}>
                            <thead>
                                <tr style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'transparent', zIndex: 1 }}>
                                    <th className='tableheader' >No.</th>
                                    <th className='tableheader' >PDF</th>
                                    <th className='tableheader' >Usuario</th>
                                    <th className='tableheader' ></th>
                                    <th className='tableheader' >Edad</th>
                                    <th className='tableheader' >Género</th>
                                    <th className='tableheader' >Sustancia de Impacto</th>
                                    <th className='tableheader' ></th>
                                    <th className='tableheader' >Responsable</th>
                                    <th className='tableheader' >Dirección</th>
                                    <th className='tableheader' >Teléfono</th>
                                    <th className='tableheader' >Ingreso</th>
                                    <th className='tableheader' >Estancia</th>
                                    <th className='tableheader' >Egreso</th>
                                    <th className='tableheader' >Reportes</th>
                                    <th className='tableheader' >Opciones</th>
                                </tr>
                            </thead>
                            <tbody >
                                {listStudents.length > 0 ? (
                                    listStudents.map((student: Student) => (
                                        <tr key={student._id} style={{ textAlign: 'center', fontSize: '15px' }}>
                                            <td  className={theme===0?'texts':'textblack'} >{student.number}</td>
                                            <td  className={theme===0?'texts':'textblack'} >
                                                <PDFDownloadLink
                                                    document={<PDFDocument student={student} />}
                                                    fileName={`${student.name}_${student.lastname}.pdf`}
                                                >
                                                    <FaFilePdf className="icon" />
                                                </PDFDownloadLink>
                                            </td>
                                            <td  className={theme===0?'texts':'textblack'} title={`Información de ${student.name}`} onClick={() => handleOpenDetail(student)}>
                                                {student.name} {student.lastname}
                                            </td>
                                     
                                            
                                            {(() => {
        switch (student.status) {
            case 'Baja':
                return    <td title='Baja'> <FaAngleDown className='textred' /> </td>;
            case 'En Tratamiento':
                return    <td title='En Tratamiento' > <FaCircle className='textgreens' /></td>;
            case 'Egresado':
                return   <td title='Egresado' > <FaAngleUp className='textgreen' /></td>;
            default:
                return <section>Status No Disponible</section>;
        }
    })()}
                                            
                                            
                                            <td  className={theme===0?'texts':'textblack'} >{student.age}</td>
                                            <td  className={theme===0?'texts':'textblack'} >{student.gender === 'Femenino' ? <FaFemale title='Femenino' className='icon' /> : <FaMale title='Masculino' className='icon' />}</td>
                                            <td  className={theme===0?'texts':'textblack'} >

  
                                            {(() => {
            switch (student.drug) {
                case 'Cannabis':
                    return <FaCannabis title="Cannabis" className='icon' />;
                case 'Alcohol':
                    return <FaWineBottle title="Alcohol" className='icon' />;
                case 'Metanfetamina':
                    return <FaCube title="Metanfetamina" className='icon' />;
                case 'Heroína':
                    return <FaSyringe title="Heroína" className='icon' />;
                case 'Cocaína':
                    return <FaSnowflake title="Cocaína" className='icon' />;
                case 'Anfetaminas':
                    return <FaPills title="Anfetaminas" className='icon' />;
            }
        })()} 


                                            </td>
                                            <td  className={theme===0?'texts':'textblack'} title='Estigma' >{student.stigma}</td>
                                            <td  className={theme===0?'texts':'textblack'} title={`Responsable de ${student.name}`} >{student.tutor}</td>
                                            <td  className={theme===0?'texts':'textblack'} ><FaMap title={student.address} className="icon" /></td>
                                            <td  className={theme===0?'texts':'textblack'} ><a href={`tel:+52${student.phone}`}><FaPhoneAlt title={student.phone} className="icon" /></a></td>
                                            <td  className={theme===0?'texts':'textblack'} >{student.startdate}</td>
                                            <td  className={theme===0?'texts':'textblack'} ><FaHome title={`${student.stay} Meses`} className="icon" /></td>
                                            <td  className={theme===0?'texts':'textblack'} ><FaDoorOpen title={student.enddate} className="icon" /></td>
                                            <td  className={theme===0?'texts':'textblack'} >
                                                {/* Agregar el ícono para mostrar archivos */}
                                                <FaFileMedicalAlt className="icon"/>
                                            </td>
                                            <td  className={theme===0?'texts':'textblack'} >
                                                <FaFolder className='iconfile' title={`Archivos de ${student.name}`} onClick={() => handleShowFiles(student)} />
                                                <FaPen className='iconupdate' title={`Editar Información de ${student.name}`} onClick={() => handleEdit(student)} />
                                                <FaTrash  className='icon' title={`Eliminar a ${student.name}`} onClick={() => handleDelete(student)} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7}>No hay usuarios</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};
