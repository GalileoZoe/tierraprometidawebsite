export interface LoginResponse {
    id_user: number | string;
    photo: string;
    username: string;        
    password: string;         
    image: string;         
    email: string;          
    rol: string;          
    update: Date | string;   
}

export type RequestLogin = LoginResponse | null; 