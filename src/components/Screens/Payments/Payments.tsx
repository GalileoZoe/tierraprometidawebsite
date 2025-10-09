import React, { useState } from 'react';
import { FaCheck, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash, FaUndo, FaDollarSign } from 'react-icons/fa';
import { usePaymentsApi } from '../../../hooks/usePaymentsApi';
import { useID } from '../../../context/IDContext';
import { useFeed } from '../../../context/FeedContext';
import { Payment } from '../../../interfaces/Payment';

export const Payments: React.FC = () => {
  const { selectedStudent } = useID();
  const { changeFeed } = useFeed();
  const {
    payments,
    isLoading,
    createPayment,
    updatePayment,
    completePayment,
    deletePayment,
    restorePayment
  } = usePaymentsApi();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Payment>>({});
  const [newPayment, setNewPayment] = useState<{ concept: string; amount: number; method: string }>({
    concept: '',
    amount: 0,
    method: ''
  });

  if (!selectedStudent) return <p>No se ha seleccionado ningún estudiante.</p>;

  const filteredPayments = payments.filter(p => p.student === selectedStudent._id);

  const handleSaveEdit = (id: string) => {
    if (!editData.concept || !editData.amount || !editData.method) {
      alert('Completa todos los campos para guardar.');
      return;
    }
    updatePayment(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleCreatePayment = () => {
    if (!newPayment.amount || !newPayment.method || !newPayment.concept) {
      alert('Completa todos los campos antes de crear el pago.');
      return;
    }

    createPayment({
      concept: newPayment.concept,
      amount: newPayment.amount,
      method: newPayment.method,
      status: 'pending',
      student: selectedStudent._id
    });

    setNewPayment({ concept: '', amount: 0, method: '' });
  };

  return (
    <section className="section">
      <button className="button" onClick={() => changeFeed(7)}>
        <FaArrowLeft /> Volver
      </button>

      <h1>Pagos de {selectedStudent.name} {selectedStudent.lastname}</h1>

      {/* Formulario para crear un nuevo pago */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Concepto"
          value={newPayment.concept}
          onChange={e => setNewPayment({ ...newPayment, concept: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monto"
          value={newPayment.amount}
          onChange={e => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
        />
        <select
          value={newPayment.method}
          onChange={e => setNewPayment({ ...newPayment, method: e.target.value })}
        >
          <option value="">Seleccione un método</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
        <button onClick={handleCreatePayment}><FaPlus /> Crear Pago</button>
      </div>

      {isLoading ? <p>Cargando pagos...</p> : (
        <table className="table">
          <thead style={{ backgroundColor: '#db1313', color: 'white' }}>
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
            {filteredPayments.map(payment => {
              const isEditing = editingId === payment._id;
              return (
                <tr key={payment._id}>
                  <td>{payment._id}</td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.concept ?? payment.concept}
                        onChange={e => setEditData({ ...editData, concept: e.target.value })}
                      />
                    ) : payment.concept}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.amount ?? payment.amount}
                        onChange={e => setEditData({ ...editData, amount: Number(e.target.value) })}
                      />
                    ) : `$${payment.amount}`}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={editData.method ?? payment.method}
                        onChange={e => setEditData({ ...editData, method: e.target.value })}
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta">Tarjeta</option>
                      </select>
                    ) : payment.method}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={editData.status ?? payment.status}
                        onChange={e => setEditData({ ...editData, status: e.target.value as Payment['status'] })}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : payment.status}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <FaSave
                          style={{ cursor: 'pointer', marginRight: 8 }}
                          onClick={() => handleSaveEdit(payment._id!)}
                        />
                        <FaTimes
                          style={{ cursor: 'pointer' }}
                          onClick={() => setEditingId(null)}
                        />
                      </>
                    ) : (
                      <>
                        {payment.status !== 'completed' && !payment.deletedAt && (
                          <FaCheck
                            title="Completar pago"
                            style={{ cursor: 'pointer', marginRight: 8, color: 'green' }}
                            onClick={() => completePayment(payment._id!)}
                          />
                        )}

                        <button
                          onClick={() => {
                            setEditingId(payment._id!);
                            setEditData({ ...payment });
                          }}
                        >
                          Editar
                        </button>

                        {!payment.deletedAt && (
                          <FaTrash
                            title="Eliminar pago"
                            style={{ cursor: 'pointer', marginLeft: 8, color: 'red' }}
                            onClick={() => deletePayment(payment._id!)}
                          />
                        )}

                        {payment.deletedAt && (
                          <FaUndo
                            title="Restaurar pago"
                            style={{ cursor: 'pointer', marginLeft: 8, color: 'orange' }}
                            onClick={() => restorePayment(payment._id!)}
                          />
                        )}
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
