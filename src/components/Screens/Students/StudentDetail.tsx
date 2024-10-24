import React from 'react';
import { Student } from '../../../interfaces/Students';
import { FaPhone, FaMap, FaCannabis, FaWineBottle, FaSnowflake, FaSyringe, FaFemale, FaMale, FaAlignLeft, FaAngleDown, FaAngleUp, FaCircle } from 'react-icons/fa';
import '../../../App.css'


interface StudentDetailProps {
    student: Student;
    onClose: () => void;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
    const renderDrugIcon = (drug: string) => {
        switch (drug) {
            case 'Cannabis':
                return <FaCannabis title="Cannabis" style={styles.drugIcon} />;
            case 'Alcohol':
                return <FaWineBottle title="Alcohol" style={styles.drugIcon} />;
            case 'Metanfetamina':
                return <FaSnowflake title="Metanfetamina" style={styles.drugIcon} />;
            case 'Heroina':
                return <FaSyringe title="Heroína" style={styles.drugIcon} />;
            default:
                return 'No disponible';
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.modal}>
            <p className="texts" style={{marginTop:-20}} >Usuario</p>

                <button onClick={onClose} style={styles.closeBtn}>×</button>
                <div style={styles.header}>
                    <h2 className='title' >{student.name} {student.lastname}    {student.age}</h2>
                    {student.gender === 'Femenino' ? <FaFemale className='icon' /> : <FaMale className='icon' />}

                    <a href="">                 {(() => {
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
    })()}</a>
              
                </div>

                <div style={styles.infoRow}>
                    <p>{student.startdate}</p>
                    <p><strong>Estancia:</strong> {student.stay ? `${student.stay} Meses` : 'No disponible'}</p>
                    <p> {student.enddate}</p>
                </div>

                <div style={styles.infoRow}>
                    <p><strong>Sustancia de Impacto:</strong> {student.drug} </p>
                    <p> {student.stigma} </p>
                </div>

                <div style={styles.infoRow}>
                <p><strong>Grupo Sanguíneo:</strong> {student.blood}</p>
                    <p><strong>Enfermedades:</strong> {student.disease} </p> 
                    <p><strong>Alergias:</strong> {student.allergy} </p> 

                </div>
                <p><strong>Descripción:</strong> {student.description} </p>

                <p className="texts">Responsable</p>
                <div style={styles.infoBlock}>
                    <p><strong>Responsable:</strong> {student.tutor}</p>
                    <p><strong>Dirección:</strong> <FaMap title={student.address} style={styles.inlineIcon} /> {student.address}</p>
                    <p><strong>Teléfono:</strong> <FaPhone title={student.phone} style={styles.inlineIcon} /> {student.phone}</p>
                </div>
                <button onClick={onClose} className='button'>Cerrar</button>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
    },
    modal: {
        background: '#ffffff',
        borderRadius: '15px',
        padding: '30px',
        width: '500px',
        maxWidth: '95%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflowY: 'auto',
        maxHeight: '90vh',
    },
    closeBtn: {
        position: 'absolute',
        top: '15px',
        right: '20px',
        fontSize: '20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ff6666',
        transition: 'color 0.3s ease',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    icon: {
        fontSize: '24px',
        color: '#ff6666',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '1px solid #ddd',
    },
    infoBlock: {
        margin: '15px 0',
    },
    inlineIcon: {
        marginRight: '5px',
        verticalAlign: 'middle',
        color: '#ff6666',
    },
    drugIcon: {
        marginLeft: '5px',
        color: '#ff6666',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#ff6666',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#ff3333',
    },
};
