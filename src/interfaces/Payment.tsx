export enum PaymentStatus {
    Pending = 'pending',
    Completed = 'completed',
    Cancelled = 'cancelled',
}

export interface Payment {
    _id?: string | undefined;                  // ID generado por MongoDB
    student: string;               // ID del estudiante asociado
    amount: number;                // Monto del pago
    method: string;                // Método de pago (Card, Cash, etc.)
    status?: PaymentStatus;        // Estado del pago
    softdelete?: boolean;          // Soft delete
    deletedAt?: string | null;     // Fecha de eliminación, si aplica
    createdAt?: string;            // Fecha de creación
    updatedAt?: string;            // Fecha de última actualización
}
