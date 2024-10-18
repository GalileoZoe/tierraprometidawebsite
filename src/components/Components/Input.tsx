// Input.tsx
import React from 'react';

interface InputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    multiline?: boolean; // En caso de que desees soporte para campos de texto
    rows?: number; // Para el tamaño del área de texto
}

const Input: React.FC<InputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    multiline = false,
    rows = 1,
}) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={()=>onChange}
                    placeholder={placeholder}
                    rows={rows}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            )}
        </div>
    );
};

export default Input;
