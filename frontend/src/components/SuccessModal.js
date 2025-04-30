import React from 'react';
import './SuccessModal.css';

function SuccessModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">✔️ Sincronización exitosa!</h2>
        <p className="modal-message">Se completó la sincronización</p>
        <button className="modal-button" onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
