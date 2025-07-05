import React from 'react';
import './SuccessModal.css'; // Usamos el mismo CSS del SuccessModal

function ErrorModal({ mensaje, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title" style={{ color: '#dc3545' }}>
          ❌ Error de sincronización
        </h2>
        <p className="modal-message">{mensaje}</p>
        <button className="modal-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
