import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './ImportarHorario.css';

function ImportarHorario() {
  const fileInputRef = useRef(null);
  const [archivoNombre, setArchivoNombre] = useState('');
  const [subidoCorrectamente, setSubidoCorrectamente] = useState(false);
  const [datosTemporales, setDatosTemporales] = useState([]);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('archivo', file);
    setArchivoNombre(file.name);

    try {
      const response = await fetch('http://localhost:5000/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Filtrar duplicados antes de guardar los datos
        const uniqueData = filterDuplicates(data);
        setDatosTemporales(uniqueData);
        localStorage.setItem('horarios', JSON.stringify(uniqueData));
        setSubidoCorrectamente(true);
      } else {
        alert('Error al subir el archivo');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al subir el archivo.');
    }
  };

  const filterDuplicates = (data) => {
    return data.filter((value, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t.Clase === value.Clase &&
            t.Día === value.Día &&
            t.Hora === value.Hora
        )
      );
    });
  };

  const handleCargar = () => {
    // ✅ Guardar en localStorage
    localStorage.setItem('eventos_sincronizados', JSON.stringify(datosTemporales));
    navigate('/horarios', { state: { horarios: datosTemporales } });
  };

  return (
    <Layout>
      <div className="import-container">
        <h2>Horarios importados</h2>

        <div className="upload-box">
          <p className="upload-title">Carga de archivos (XML o CSV)</p>

          {!subidoCorrectamente ? (
            <>
              <div className="upload-area">
                <div className="upload-icon">📁</div>
                <p>Arrastre el archivo</p>
              </div>
              <p className="or-text">O</p>
              <button className="upload-btn" onClick={handleUploadClick}>Subir archivo</button>
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <div className="archivo-subido">
              <p><strong>{archivoNombre}</strong> cargado correctamente ✅</p>
              <p className="archivo-exito">Archivos cargados correctamente</p>
            </div>
          )}
        </div>

        <div className="instructions-box">
          <h4>Instrucciones de Importación</h4>
          <ul>
            <li>Para importar un horario, carga un archivo en formato XML o CSV.</li>
            <li>Asegúrate de que el archivo contenga la estructura correcta.</li>
          </ul>
        </div>

        <div className="cargar-btn-container">
          <button
            className="cargar-btn"
            onClick={handleCargar}
            disabled={!subidoCorrectamente}
          >
            Cargar
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ImportarHorario;
