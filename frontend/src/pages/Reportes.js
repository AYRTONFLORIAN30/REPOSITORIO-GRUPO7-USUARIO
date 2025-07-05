// src/pages/Reportes.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import '../styles/Reportes.css'; // Importa el archivo CSS para los estilos

const Reportes = () => {
  const [horarios, setHorarios] = useState([]);

  // Función para manejar la carga del archivo CSV
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Usar PapaParse para leer el CSV
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data;
        // Excluir la primera fila (encabezado)
        const horariosData = data.slice(1).map((row) => ({
          clase: row[0],
          profesor: row[1],
          dia: row[2],
          hora: row[3],
          aula: row[4],
        }));
        setHorarios(horariosData);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  // Función para generar el PDF
  const generarReportePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Horarios Importados', 20, 20);
    doc.setFontSize(12);
    let yPosition = 30;

    horarios.forEach((horario) => {
      doc.text(`Clase: ${horario.clase}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Profesor: ${horario.profesor}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Día: ${horario.dia}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Hora: ${horario.hora}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Aula: ${horario.aula}`, 20, yPosition);
      yPosition += 20;
      
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save('reporte_horarios.pdf');
  };

  return (
    <div className="reportes-container">
      <h1 className="title">Horarios Importados</h1>

      <div className="file-input-container">
        <label htmlFor="file-upload" className="file-upload-label">
          Elige el archivo CSV
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      <ul className="horarios-list">
        {horarios.length > 0 ? (
          horarios.map((horario, index) => (
            <li key={index} className="horario-item">
              <p><strong>Clase:</strong> {horario.clase}</p>
              <p><strong>Profesor:</strong> {horario.profesor}</p>
              <p><strong>Día:</strong> {horario.dia}</p>
              <p><strong>Hora:</strong> {horario.hora}</p>
              <p><strong>Aula:</strong> {horario.aula}</p>
            </li>
          ))
        ) : (
          <li>No hay horarios importados.</li>
        )}
      </ul>

      <button className="btn-generar" onClick={generarReportePDF}>
        Generar Reporte PDF
      </button>
    </div>
  );
};

export default Reportes;
