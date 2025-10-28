import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash, FaUndo } from 'react-icons/fa';
import { usePaymentsApi } from '../../../hooks/usePaymentsApi';
import { useStudentsApi } from '../../../hooks/useStudentsApi';
import { Payment } from '../../../interfaces/Payment';

export const Payments: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID del estudiante desde URL
  const navigate = useNavigate();

  const { getStudentById } = useStudentsApi(); // función para obtener student por id
  const [student, setStudent] = useState<{ name?: string; lastname?: string } | null>(null);


  const {
    payments,
    isLoading,
    createPayment,
    updatePayment,
    completePayment,
    deletePayment,
    restorePayment
  } = usePaymentsApi(id);

  const [editingId, setEditingId] = useState<string | null>(null);
const [editData, setEditData] = useState<Partial<Payment>>({});
const [newPayment, setNewPayment] = useState<Partial<Payment>>({});

  // Cargar datos del estudiante al inicio
  useEffect(() => {
    if (!id) return;
    const fetchStudent = async () => {
      const data = await getStudentById(id);
      setStudent(data ? { name: data.name || '', lastname: data.lastname || '' } : null);

    };
    fetchStudent();
  }, [id]);

  if (!id) return <p>No se ha seleccionado ningún estudiante.</p>;

 const handleSaveEdit = (id: string) => {
  if (!editData.concept || !editData.amount || !editData.method) {
    alert('Completa todos los campos para guardar.');
    return;
  }

  // Crear objeto tipado
  const updated: Payment = {
    _id: id,
    student: '', // si tu API requiere student puedes poner el id del estudiante
    concept: editData.concept,
    amount: editData.amount,
    method: editData.method,
    status: editData.status || 'pending',
    softdelete: false,
    deletedAt: null,
    createdAt: '', // solo para tipado, backend normalmente ignora
    updatedAt: '',
  };

  updatePayment(id, updated);
  setEditingId(null);
  setEditData({});
};

const handleCreatePayment = () => {
  if (!newPayment.amount || !newPayment.method || !newPayment.concept) {
    alert('Completa todos los campos antes de crear el pago.');
    return;
  }

  const created: Payment = {
    _id: undefined, // Mongo lo genera
    student: id!,   // id del estudiante actual
    concept: newPayment.concept,
    amount: newPayment.amount,
    method: newPayment.method,
    status: 'pending',
    softdelete: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  createPayment(created);
  setNewPayment({ concept: '', amount: 0, method: '' });
};


  return (
    <section className="section">
      <button className="button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </button>

      <h1>Pagos del estudiante {student ? `${student.name} ${student.lastname}` : id}</h1>

      {/* Formulario nuevo pago */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: 8 }}>
        <input type="text" placeholder="Concepto" value={newPayment.concept} onChange={e => setNewPayment({ ...newPayment, concept: e.target.value })} />
        <input type="number" placeholder="Monto" value={newPayment.amount} onChange={e => setNewPayment({ ...newPayment, amount: Number(e.target.value) })} />
        <select value={newPayment.method} onChange={e => setNewPayment({ ...newPayment, method: e.target.value })}>
          <option value="">Seleccione un método</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
        <button onClick={handleCreatePayment}><FaPlus /> Crear Pago</button>
      </div>

      {isLoading ? <p>Cargando pagos...</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => {
              const isEditing = editingId === payment._id;
              return (
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>{isEditing ? <input value={editData.concept ?? payment.concept} onChange={e => setEditData({ ...editData, concept: e.target.value })} /> : payment.concept}</td>
                  <td>{isEditing ? <input type="number" value={editData.amount ?? payment.amount} onChange={e => setEditData({ ...editData, amount: Number(e.target.value) })} /> : `$${payment.amount}`}</td>
                  <td>{isEditing ? (
                    <select value={editData.method ?? payment.method} onChange={e => setEditData({ ...editData, method: e.target.value })}>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
                  ) : payment.method}</td>
                  <td>{isEditing ? (
                    <select value={editData.status ?? payment.status} onChange={e => setEditData({ ...editData, status: e.target.value as Payment['status'] })}>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : payment.status}</td>
                  <td>
                    {isEditing ? (
                      <>
                        <FaSave style={{ cursor: 'pointer', marginRight: 8 }} onClick={() => handleSaveEdit(payment._id!)} />
                        <FaTimes style={{ cursor: 'pointer' }} onClick={() => setEditingId(null)} />
                      </>
                    ) : (
                      <>
                        {payment.status !== 'completed' && !payment.deletedAt && <FaCheck style={{ cursor: 'pointer', color: 'green' }} onClick={() => completePayment(payment._id!)} />}
                        <button onClick={() => { setEditingId(payment._id!); setEditData({ ...payment }); }}>Editar</button>
                        {!payment.deletedAt && <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => deletePayment(payment._id!)} />}
                        {payment.deletedAt && <FaUndo style={{ cursor: 'pointer', color: 'orange' }} onClick={() => restorePayment(payment._id!)} />}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};
