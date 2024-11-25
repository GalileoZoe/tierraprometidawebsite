import React from 'react';
import { File, Student } from '../../../interfaces/Students'; // Asegúrate de que la interfaz File esté correctamente importada
import { FaFilePdf, FaFileImage, FaFileAudio, FaFileVideo, FaFile, FaArrowLeft } from 'react-icons/fa'; // Importa los iconos que necesites

interface StudentsFilesProps {
    files: File[];
    student: Student;
    onClose: () => void;


}

const StudentsFiles: React.FC<StudentsFilesProps> = ({ files, student,onClose }) => {

    // Función para decodificar el archivo Base64 y convertirlo en un objeto URL que el navegador pueda mostrar
    const decodeBase64 = (base64String: string) => {
        return base64String;
    };

    // Función para determinar el icono según la extensión del archivo
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop(); // Obtiene la extensión del archivo
        switch (extension) {
            case 'pdf':
                return <FaFilePdf className='iconx' />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FaFileImage className='iconx' />;
            case 'mp3':
            case 'wav':
                return <FaFileAudio className='iconx' />;
            case 'mp4':
            case 'avi':
                return <FaFileVideo className='iconx' />;
            default:
                return <FaFile className='iconx' />; // Icono por defecto para otros tipos de archivos
        }
    };

    // Estilos en línea
    const directoryStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Exactamente dos columnas
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const fileItemStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
    };

    const fileItemHoverStyle: React.CSSProperties = {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const fileLinkStyle: React.CSSProperties = {
        marginTop: '10px',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '14px',
        textAlign: 'center',
    };

    return (
        <section className='section'>
                        <h2 className='title' >Archivos de {student.name} {student.lastname}</h2>
                        <FaArrowLeft onClick={onClose} className='button' style={{float:'left'}} />
                        <br />
                        <br />
        <div style={directoryStyle}>

            {files.length === 0 ? (
                <div>No hay archivos disponibles</div>
            ) : (
                files.map((file, index) => (
                    <div
                        key={index}
                        style={fileItemStyle}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            Object.assign(target.style, fileItemHoverStyle);
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            Object.assign(target.style, fileItemStyle);
                        }}
                    >
                        {getFileIcon(file.title)} {/* Renderiza el icono según el tipo de archivo */}
                        <a href={decodeBase64(file.file)} download={file.title} style={fileLinkStyle}>
                            {file.title} <br /> {new Date(file.date).toLocaleDateString()}
                        </a>
                    </div>
                ))
            )}
        </div>
        </section>
    );
};

export default StudentsFiles;
