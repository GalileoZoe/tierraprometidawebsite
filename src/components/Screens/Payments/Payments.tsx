import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Payment } from '../../../interfaces/Payment';
import { useID } from '../../../context/IDContext';
import { useFeed } from '../../../context/FeedContext';
import { FaCheck, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';

export const Payments: React.FC = () => {
  const { selectedStudent } = useID();
  const { changeFeed } = useFeed();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null); // ID del pago en edición
  const [editData, setEditData] = useState<Partial<Payment>>({}); // datos editados

  const apiUrl = 'http://localhost:3000/api/tierraprometida/v1/payments';

  const loadPayments = async (studentId: string) => {
    setLoading(true);
    try {
      const res = await axios.get<Payment[]>(`${apiUrl}?student=${studentId}`);
      setPayments(res.data);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (id: string) => {
    try {
      await axios.patch(`${apiUrl}/complete/${id}`);
      if (selectedStudent) loadPayments(selectedStudent._id!);
    } catch (error) {
      console.error('Error marking payment as completed:', error);
    }
  };

  const saveEdit = async (id: string) => {
    try {
      await axios.patch(`${apiUrl}/${id}`, editData);
      setEditingId(null);
      setEditData({});
      if (selectedStudent) loadPayments(selectedStudent._id!);
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  useEffect(() => {
    if (selectedStudent) loadPayments(selectedStudent._id!);
  }, [selectedStudent]);

  if (!selectedStudent) return <p>No se ha seleccionado ningún estudiante.</p>;

  return (
    <section className='section'>
      <button className='button' onClick={() => changeFeed(7)}>
        <FaArrowLeft /> Volver
      </button>
      <h1>Pagos de {selectedStudent.name} {selectedStudent.lastname}</h1>

      {loading ? <p>Cargando pagos...</p> : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
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
                  <td>
                    {isEditing ? (
                      <input
                        type='number'
                        value={editData.amount ?? payment.amount}
                        onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                      />
                    ) : (
                      `$${payment.amount}`
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type='text'
                        value={editData.method ?? payment.method}
                        onChange={(e) => setEditData({ ...editData, method: e.target.value })}
                      />
                    ) : (
                      payment.method
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                     <select
  value={editData.status ?? payment.status} // fallback al valor original
  onChange={(e) =>
    setEditData({ ...editData, status: e.target.value as Payment['status'] })
  }
>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                      </select>
                    ) : (
                      payment.status
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <FaSave title='Guardar' style={{ cursor: 'pointer', marginRight: 8 }} onClick={() => saveEdit(payment._id!)} />
                        <FaTimes title='Cancelar' style={{ cursor: 'pointer' }} onClick={() => setEditingId(null)} />
                      </>
                    ) : (
                      <>
                        {payment.status !== 'completed' && <FaCheck title='Completar pago' onClick={() => markAsCompleted(payment._id!)} />}
                        <button style={{ marginLeft: 8 }} onClick={() => { setEditingId(payment._id!); setEditData(payment); }}>Editar</button>
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