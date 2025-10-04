import { createContext, useState, ReactNode, useContext } from 'react';
import { Student } from '../interfaces/Students';

interface IDContextProps {
    selectedStudent: Student | null;
    setSelectedStudent: (student: Student | null) => void;
}

const IDContext = createContext<IDContextProps>({} as IDContextProps);

export const IDProvider = ({ children }: { children: ReactNode }) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    return (
        <IDContext.Provider value={{ selectedStudent, setSelectedStudent }}>
            {children}
        </IDContext.Provider>
    );
};

export const useID = () => useContext(IDContext);
