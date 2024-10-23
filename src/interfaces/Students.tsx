export interface Report {
    report: string;
    author: string;
    date: string;
}

export interface File {
    file: string;
    title: string;
    date: string;
}

export interface Student {
    number?: string;
    _id?: number | string;
    name?: string;
    lastname?: string;
    username?: string;
    age?: string;
    gender?: string;
    blood?: string;
    curp?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    disease?: string;
    allergy?: string;
    drug?: string;
    stigma?: string;
    treatment?: string;
    tutor?: string;
    stay?: string;
    file?: string;
    files?: File[];
    description?: string;
    startdate?: string;
    enddate?: string;
    status?: string;
    reports?: Report[];
}
