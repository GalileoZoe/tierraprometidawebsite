export interface LoginResponse {
    id_user: number | string; // Considera que puede ser un string si utilizas ObjectId
    username: string;         // Cambiado de `nameuser` a `username` según tu esquema
    password: string;         // Mantener `password` para la respuesta, aunque no es recomendado enviarla
    image: string;           // La imagen del usuario
    email: string;           // Cambiado de `correo` a `email`
    update: Date | string;   // Fecha de actualización
}

export type RequestLogin = LoginResponse | null; // Cambié `false` por `null` para mantener la consistencia
