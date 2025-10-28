

export interface Payment {
    _id: string | undefined;      // ID generado por MongoDB
    student: string;               // ID del estudiante asociado
    concept: string;               // Concepto del pago
    amount: number;                // Monto del pago
    method: string;                // Método de pago (Card, Cash, etc.)
    status: string;        // Estado del pago
    softdelete: boolean;          // Soft delete
    deletedAt: string | null;     // Fecha de eliminación, si aplica
    createdAt: string;            // Fecha de creación
    updatedAt: string;            // Fecha de última actualización
}


// export interface ScheduledPaymentRequest extends PaymentRequest {
//   schedule: {
//     student: string;               // ID del estudiante asociado
//     frequency: 'daily' | 'weekly' | 'monthly';
//     dayOfWeek: string;  // solo si es semanal
//     startDate: string;   // formato ISO: YYYY-MM-DD
//     time: string;        // formato HH:mm
//   };
// }
