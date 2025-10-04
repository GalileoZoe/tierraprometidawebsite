import { useEffect, useState } from 'react';
import { tierraprometidaApi } from '../api/tierraprometidaApi';
import { Payment } from '../interfaces/Payment';
import axios from 'axios';

export const usePaymentsApi = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const paymentsUrl: string = 'http://localhost:3000/api/tierraprometida/v1/payments';

    // -----------------------------
    // Cargar todos los pagos activos
    // -----------------------------
    const loadPayments = async () => {
        setIsLoading(true);
        try {
            const { data } = await tierraprometidaApi.get<Payment[]>(paymentsUrl);
            setPayments(data.filter(p => !p.softdelete));
        } catch (error) {
            console.error('Error loading payments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // -----------------------------
    // Crear un nuevo pago
    // -----------------------------
    const createPayment = async (studentId: string, amount: number, method: string) => {
        try {
            const payload = { student: studentId, amount, method };
            const { data } = await tierraprometidaApi.post(paymentsUrl, payload);
            console.log('Pago creado:', data);
            loadPayments();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating payment:', error.response?.data);
            } else {
                console.error('Error creating payment:', error);
            }
        }
    };

    // -----------------------------
    // Marcar pago como completado
    // -----------------------------
    const completePayment = async (paymentId: string) => {
        try {
            const { data } = await tierraprometidaApi.patch(`${paymentsUrl}/complete/${paymentId}`);
            console.log('Pago completado:', data);
            loadPayments();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error completing payment:', error.response?.data);
            } else {
                console.error('Error completing payment:', error);
            }
        }
    };

    useEffect(() => {
        loadPayments();
    }, []);

    return {
        payments,
        isLoading,
        loadPayments,
        createPayment,
        completePayment,
    };
};
