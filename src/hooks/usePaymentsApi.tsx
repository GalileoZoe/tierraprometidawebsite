import { useEffect, useState } from 'react';
import axios from 'axios';
import { Payment } from '../interfaces/Payment';
import { useID } from '../context/IDContext';

// Tipado del body que se manda en create/update
export interface PaymentRequest {
  concept: string;
  amount: number;
  method: string;
  status?: 'pending' | 'completed';
}

export const usePaymentsApi = () => {
  const { selectedStudent } = useID();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = 'http://localhost:3000/api/tierraprometida/v1/payments';

  const loadPayments = async () => {
    if (!selectedStudent) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get<Payment[]>(`${apiUrl}?student=${selectedStudent._id}`);
      setPayments(data.filter((p) => !p.deletedAt)); // filtra eliminados
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPayment = async (data: PaymentRequest) => {
    if (!selectedStudent) return;
    try {
      await axios.post(apiUrl, {
        ...data,
        student: selectedStudent._id,
      });
      await loadPayments();
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const updatePayment = async (paymentId: string, updatedData: Partial<PaymentRequest>) => {
    try {
      await axios.put(`${apiUrl}/${paymentId}`, updatedData);
      await loadPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

const completePayment = async (paymentId: string) => {
  try {
    // PATCH directo al payment por su id
    await axios.patch(`${apiUrl}/complete/${paymentId}`);
    await loadPayments(); // recarga la lista después de completar
  } catch (error) {
    console.error('Error completing payment:', error);
  }
};

  const deletePayment = async (paymentId: string) => {
    try {
      await axios.delete(`${apiUrl}/${paymentId}`);
      await loadPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

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
  }, [selectedStudent]);

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
