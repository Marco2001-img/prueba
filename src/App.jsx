import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
  const [file, setFile] = useState(null);

  // Manejar la subida del archivo
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Importar el archivo a la API Laravel
  const handleImport = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/importUsuarios', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Archivo importado exitosamente');
      console.log(response.data);
    } catch (error) {
      console.error('Error importando el archivo:', error);
      alert('Error importando el archivo');
    }
  };

  // Exportar archivo desde la API Laravel
  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/export-excel', {
        responseType: 'blob',
      });

      // Convertir el archivo recibido en un blob descargable
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'usuarios.xlsx');
    } catch (error) {
      console.error('Error exportando el archivo:', error);
      alert('Error exportando el archivo');
    }
  };

  return (
    <div className="App">
      <h1>Importar y Exportar Excel</h1>
      
      {/* Subida del archivo para importar */}
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      <button onClick={handleImport}>Importar Excel</button>

      {/* Botón para exportar archivo */}
      <button onClick={handleExport}>Exportar Excel</button>
    </div>
  );
}

export default App;
