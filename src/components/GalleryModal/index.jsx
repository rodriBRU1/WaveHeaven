import React from "react";
import './style.css'
import { ArrowLeft, X } from 'lucide-react';
// Componente del modal de galería
export default function GalleryModal({ images, title, onClose }) {
  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className="gallery-modal-title">Galería de imágenes - {title}</h2>
        
        <div className="gallery-modal-grid">
          {images.map((image, index) => (
            <div key={index} className="gallery-modal-item">
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="gallery-modal-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}