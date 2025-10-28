import { useEffect, useState } from 'react';
import axios from 'axios';
import { Payment } from '../interfaces/Payment';

export const usePaymentsApi = (studentId?: string) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = 'http://192.168.100.13:3000/api/tierraprometida/v1/payments';

  // Cargar pagos del estudiante
  const loadPayments = async () => {
    if (!studentId) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get<Payment[]>(`${apiUrl}?student=${studentId}`);
      setPayments(data.filter((p) => !p.deletedAt));
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Crear pago
  const createPayment = async (payment: Omit<Payment, '_id' | 'createdAt' | 'deletedAt'>) => {
    try {
      await axios.post(apiUrl, { ...payment, student: studentId });
      await loadPayments();
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  // Editar pago (PUT completo)
  const updatePayment = async (paymentId: string, payment: Omit<Payment, '_id' | 'createdAt' | 'deletedAt'>) => {
    try {
      await axios.put(`${apiUrl}/${paymentId}`, payment);
      await loadPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  // Completar pago (PATCH)
  const completePayment = async (paymentId: string) => {
    try {
      await axios.patch(`${apiUrl}/complete/${paymentId}`);
      await loadPayments();
    } catch (error) {
      console.error('Error completing payment:', error);
    }
  };

  // Eliminar pago (DELETE)
  const deletePayment = async (paymentId: string) => {
    try {
      await axios.delete(`${apiUrl}/${paymentId}`);
      await loadPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  // Restaurar pago (PATCH)
  const restorePayment = async (paymentId: string) => {
    try {
      await axios.patch(`${apiUrl}/restore/${paymentId}`);
      await loadPayments();
    } catch (error) {
      console.error('Error restoring payment:', error);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [studentId]);

  return {
    payments,
    isLoading,
    loadPayments,
    createPayment,
    updatePayment,
    completePayment,
    deletePayment,
    restorePayment,
  };
};
