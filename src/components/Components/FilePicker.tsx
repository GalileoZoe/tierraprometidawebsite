import { useState } from 'react';

export const FilePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
    </div>
  );
};

