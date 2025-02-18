export interface LoginResponse {
    id_user: number | string;
    username: string;        
    password: string;         
    image: string;         
    email: string;          
    update: Date | string;   
}

export type RequestLogin = LoginResponse | null; 