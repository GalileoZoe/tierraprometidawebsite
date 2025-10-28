import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { File, Student } from '../../../interfaces/Students';
import { FaFilePdf, FaFileImage, FaFileAudio, FaFileVideo, FaFile, FaArrowLeft } from 'react-icons/fa';
import { useStudentsApi } from '../../../hooks/useStudentsApi';

const StudentsFiles: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const navigate = useNavigate();
    const { listStudents } = useStudentsApi();

    useEffect(() => {
        const s = listStudents.find(st => st._id === id);
        if (s) {
            setStudent(s);
            setFiles(s.files || []);
        }
    }, [id, listStudents]);

    if (!student) return <p>Cargando...</p>;

    const decodeBase64 = (base64String: string) => base64String;

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop();
        switch (extension) {
            case 'pdf': return <FaFilePdf className='iconx' />;
            case 'jpg': case 'jpeg': case 'png': return <FaFileImage className='iconx' />;
            case 'mp3': case 'wav': return <FaFileAudio className='iconx' />;
            case 'mp4': case 'avi': return <FaFileVideo className='iconx' />;
            default: return <FaFile className='iconx' />;
        }
    };

    return (
        <section className='section'>
            <h2 className='title'>Archivos de {student.name} {student.lastname}</h2>
            <FaArrowLeft className='button' onClick={() => navigate(-1)} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, padding: 20 }}>
                {files.length === 0 ? <div>No hay archivos disponibles</div> :
                    files.map((file, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: 10, backgroundColor: '#fff', borderRadius: 8 }}>
                            {getFileIcon(file.title)}
                            <a href={decodeBase64(file.file)} download={file.title} style={{ marginTop: 10, textAlign: 'center' }}>
                                {file.title} <br /> {new Date(file.date).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' })}
                            </a>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default StudentsFiles;
