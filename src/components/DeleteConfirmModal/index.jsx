import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './style.css';

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="delete-modal-close" onClick={onCancel}>
          <X size={24} />
        </button>

        {/* Icono de advertencia */}
        <div className="delete-modal-icon">
          <AlertTriangle size={48} />
        </div>

        {/* Contenido */}
        <div className="delete-modal-body">
          <h2 className="delete-modal-title">¿Eliminar producto?</h2>
          <p className="delete-modal-message">
            ¿Estás seguro de que deseas eliminar{' '}
            <strong>"{itemName}"</strong>?
          </p>
          <p className="delete-modal-warning">
            Esta acción no se puede deshacer. El producto será eliminado permanentemente de la base de datos.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-btn delete-modal-btn-cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            className="delete-modal-btn delete-modal-btn-confirm"
            onClick={onConfirm}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}