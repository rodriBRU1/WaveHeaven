import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import accommodations from '../../data/mockdata';
import './style.css';
import GalleryModal from '../../components/GalleryModal'

export default function HostalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  useEffect(() => {
    const foundProduct = accommodations.find(item => item.id === parseInt(id));
    
    if (foundProduct) {
      // Construir la ruta correcta desde public
      const imagePath = foundProduct.image.startsWith('/') 
        ? foundProduct.image 
        : `/${foundProduct.image}`;

      const productWithImages = {
        ...foundProduct,
        // Simulamos 5 imágenes para el ejemplo - en producción vendrían del backend
        images: [
          imagePath,
          imagePath,
          imagePath,
          imagePath,
          imagePath
        ],
        description: `Hermoso alojamiento "${foundProduct.title}" perfecto para tu próxima escapada. Este espacio único ofrece todas las comodidades que necesitas para una estadía inolvidable. Disfruta de vistas espectaculares, ambiente tranquilo y acceso a las mejores atracciones de la zona. Ideal para familias, parejas o grupos de amigos que buscan relajarse y crear recuerdos especiales.`,
        category: "Alojamiento de Playa",
        price: `$${80 + (foundProduct.id * 15)}/noche`,
        capacity: `${foundProduct.available * 2} personas`,
        location: "Ubicación privilegiada"
      };
      setProduct(productWithImages);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="loading-container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="product-detail-container">
      {/* Header */}
      <header className="product-detail-header">
        <h1 className="product-detail-title">{product.title}</h1>
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Volver
        </button>
      </header>

      {/* Body */}
      <div className="product-detail-body">
        {/* Bloque de imágenes al 100% del ancho */}
        <div className="images-block">
          {/* Imagen principal - mitad izquierda */}
          <div className="main-image-container">
            <img
              src={product.images[0]}
              alt={`${product.title} - Principal`}
              className="main-image"
              onError={(e) => { e.target.src = '/placeholder.png'; }}
            />
          </div>

          {/* Grid de 4 imágenes - mitad derecha */}
          <div className="secondary-images-grid">
            {product.images.slice(1, 5).map((image, index) => (
              <div key={index} className="secondary-image-container">
                <img
                  src={image}
                  alt={`${product.title} - ${index + 2}`}
                  className="secondary-image"
                  onError={(e) => { e.target.src = '/placeholder.png'; }}
                />
              </div>
            ))}
            
            {/* Botón "Ver más" en la última imagen */}
            <button 
              className="view-more-button"
              onClick={() => setShowGalleryModal(true)}
            >
              Ver más
            </button>
          </div>
        </div>

        {/* Información del producto */}
        <div className="product-info-section">
          <div className="info-column">
            <h2 className="section-title">Descripción</h2>
            <p className="product-description">
              {product.description}
            </p>
          </div>

          <div className="info-column">
            <h2 className="section-title">Información</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Categoría</span>
                <span className="info-value">{product.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Disponibilidad</span>
                <span className="info-value">{product.available} unidades disponibles</span>
              </div>
              <div className="info-item">
                <span className="info-label">Precio estimado</span>
                <span className="info-value">{product.price}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Capacidad</span>
                <span className="info-value">{product.capacity}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ubicación</span>
                <span className="info-value">{product.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de galería completa */}
      {showGalleryModal && (
        <GalleryModal 
          images={product.images}
          title={product.title}
          onClose={() => setShowGalleryModal(false)}
        />
      )}
    </div>
  );
}