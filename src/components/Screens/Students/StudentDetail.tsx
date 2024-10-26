import React from 'react';
import { Student } from '../../../interfaces/Students';
import { FaPhone, FaMap, FaCannabis, FaWineBottle, FaSnowflake, FaSyringe, FaFemale, FaMale, FaAlignLeft, FaAngleDown, FaAngleUp, FaCircle, FaArrowLeft, FaTimes, FaTint, FaVirus, FaAllergies, FaClipboard, FaCube, FaLightbulb, FaPills } from 'react-icons/fa';
import '../../../App.css'


interface StudentDetailProps {
    student: Student;
    onClose: () => void;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
    

    return (
        <section style={styles.section}>
            <div style={styles.modal}>
                <p className="texts" style={{ marginTop: -20 }} >Usuario</p>

                <div style={{display:'flex', gap:140}}>
                    <p className='texts' title='Ingreso' >{student.startdate}</p>
                    <p className='texts' title='Estancia'>{student.stay ? `${student.stay} Meses` : 'No disponible'}</p>
                    <p className='texts' title='Egreso' > {student.enddate}</p>
                </div>
                <FaTimes onClick={onClose} className='icon' style={styles.closeBtn}/>
                <div style={styles.header}>
                    <h2 className='title' >{student.number}</h2>
                    <h2 className='titleblack' > {student.name} {student.lastname} </h2>
                    <h2 > {student.age}</h2>
                  

                    <a href="">                 {(() => {
                        switch (student.status) {
                            case 'Baja':
                                return <td title='Baja'> <FaAngleDown className='textred' /> </td>;
                            case 'En Tratamiento':
                                return <td title='En Tratamiento' > <FaCircle className='textgreens' /></td>;
                            case 'Egresado':
                                return <td title='Egresado' > <FaAngleUp className='textgreen' /></td>;
                            default:
                                return <section>Status No Disponible</section>;
                        }
                    })()}</a>



                </div>

                <p className="texts" style={{ marginTop: -20 }} >Historial Clínico</p>

                <div style={styles.infoRow}>
                   
                </div>


                <div style={styles.infoRow}>
                <p>
            {student.gender === 'Masculino' ? 
                <FaMale title={student.gender} className="icon" />
             : 
                <FaFemale title={student.gender} className="icon" />
            }
        </p>
        <p>
                        
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
                         </p>
                    <p><FaTint title='Grupo Sanguineo' className='icon' />  {student.blood}</p>
                    <p><FaVirus title='Enfermedades' className='icon' /> {student.disease} </p>
                    <p><FaAllergies title='Alergias' className='icon' /> {student.allergy} </p>

                </div>
                <p><FaClipboard title='Descripción' className='icon' /> {student.description} </p>
                <p>{student.description} </p>

                <p className="texts">Responsable</p>
                <div style={styles.infoBlock}>
                    <p><strong className='icon' >Responsable:</strong> {student.tutor}</p>
                    <p><strong className='icon' >Dirección:</strong>  {student.address}</p>
                    <p><strong className='icon' >Teléfono:</strong>  {student.phone}</p>
                </div>
                <FaArrowLeft title='Regresar' className='icon' onClick={onClose} />
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
