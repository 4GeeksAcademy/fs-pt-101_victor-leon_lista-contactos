import React from 'react';

export const ModalConfirm = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal d-flex align-items-center justify-content-center" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <p className="fs-5 text-center mb-4">{message}</p>
          <div className="d-flex justify-content-around">
            <button className="btn btn-primary" onClick={onConfirm}>Confirmar</button>
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
