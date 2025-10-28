import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Student } from '../../../interfaces/Students';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import {
  FaCannabis, FaWineBottle, FaSnowflake, FaSyringe, FaFemale, FaMale,
  FaAngleDown, FaAngleUp, FaCircle, FaArrowLeft, FaTimes, FaTint,
  FaVirus, FaAllergies, FaClipboard, FaCube, FaPills
} from 'react-icons/fa';
import '../../../App.css';

export const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listStudents } = useStudentsApi();
  const [student, setStudent] = useState<Student | null>(null);

  // Obtener el estudiante correspondiente al ID de la URL
  useEffect(() => {
    const s = listStudents.find(st => st._id === id);
    if (s) setStudent(s);
  }, [id, listStudents]);

  if (!student) return <p style={{ textAlign: 'center', marginTop: 50 }}>Cargando estudiante...</p>;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <section style={styles.section}>
      <div style={styles.modal}>
        <p className='texts' style={{ marginTop: -20 }}>Usuario</p>

        <div style={{ display: 'flex', gap: 140 }}>
          <p className='texts' title='Ingreso'>{formatDate(student.startdate)}</p>
          <p className='texts' title='Estancia'>{student.stay ? `${student.stay} Meses` : 'No disponible'}</p>
          <p className='texts' title='Egreso'>{formatDate(student.enddate)}</p>
        </div>

        <FaTimes onClick={() => navigate(-1)} className='icon' style={styles.closeBtn} />

        <div style={styles.header}>
          <h2 className='title'>{student.number}</h2>
          <h2 className='titleblack'>{student.name} {student.lastname}</h2>
          <h2>{student.age}</h2>
          <div>
            {student.status === 'Baja' && <FaAngleDown className='textred' title='Baja' />}
            {student.status === 'En Tratamiento' && <FaCircle className='textgreens' title='En Tratamiento' />}
            {student.status === 'Egresado' && <FaAngleUp className='textgreen' title='Egresado' />}
          </div>
        </div>

        <p className='texts' style={{ marginTop: -20 }}>Historial Clínico</p>

        <div style={styles.infoRow}>
          <p>{student.gender === 'Masculino' ? <FaMale title={student.gender} className='icon' /> : <FaFemale title={student.gender} className='icon' />}</p>
          <p>
            {student.drug === 'Cannabis' && <FaCannabis className='icon' title='Cannabis' />}
            {student.drug === 'Alcohol' && <FaWineBottle className='icon' title='Alcohol' />}
            {student.drug === 'Metanfetamina' && <FaCube className='icon' title='Metanfetamina' />}
            {student.drug === 'Heroína' && <FaSyringe className='icon' title='Heroína' />}
            {student.drug === 'Cocaína' && <FaSnowflake className='icon' title='Cocaína' />}
            {student.drug === 'Anfetaminas' && <FaPills className='icon' title='Anfetaminas' />}
          </p>
          <p><FaTint title='Grupo Sanguineo' className='icon' /> {student.blood}</p>
          <p><FaVirus title='Enfermedades' className='icon' /> {student.disease}</p>
          <p><FaAllergies title='Alergias' className='icon' /> {student.allergy}</p>
        </div>

        <p><FaClipboard title='Descripción' className='icon' /> {student.description}</p>

        <p className='texts'>Responsable</p>
        <div style={styles.infoBlock}>
          <p><strong className='icon'>Responsable:</strong> {student.tutor}</p>
          <p><strong className='icon'>Dirección:</strong> {student.address}</p>
          <p><strong className='icon'>Teléfono:</strong> {student.phone}</p>
        </div>

        <FaArrowLeft title='Regresar' className='icon' onClick={() => navigate(-1)} />
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: 15, padding: 30, width: 500, maxWidth: '95%', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', position: 'relative', overflowY: 'auto', maxHeight: '90vh' },
  closeBtn: { position: 'absolute', top: 15, right: 20 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  icon: { fontSize: 24, color: '#ff6666' },
  infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid #ddd' },
  infoBlock: { margin: '15px 0' },
};
