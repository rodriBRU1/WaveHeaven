import React, { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Package } from 'lucide-react';
import "./style.css"

export default function AddHostal({ isOpen, onClose, onSubmit, editMode = false, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || ''
  });
  const [images, setImages] = useState(initialData?.images || []);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Categorías disponibles
  const categories = [
    { id: 'montana', name: 'Montaña' },
    { id: 'playa', name: 'Playa' },
    { id: 'ciudad', name: 'Ciudad' },
    { id: 'campo', name: 'Campo' },
    { id: 'bosque', name: 'Bosque' },
    { id: 'lago', name: 'Lago' },
    { id: 'desierto', name: 'Desierto' },
    { id: 'selva', name: 'Selva' }
  ];

  // Simulación de productos existentes en la base de datos
  const existingProducts = ['iPhone 14', 'Samsung Galaxy S23', 'MacBook Pro'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            url: event.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess(false);

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre del producto es obligatorio');
      return;
    }

    if (!formData.description.trim()) {
      setError('La descripción del producto es obligatoria');
      return;
    }

    if (!formData.category) {
      setError('Debes seleccionar una categoría');
      return;
    }

    if (images.length === 0) {
      setError('Debes subir al menos una imagen del producto');
      return;
    }

    // Verificar si el nombre ya existe (solo en modo crear)
    if (!editMode && existingProducts.some(product => 
      product.toLowerCase() === formData.name.trim().toLowerCase()
    )) {
      setError(`El nombre "${formData.name}" ya está en uso. Por favor, elige otro nombre para el producto.`);
      return;
    }

    // Simular guardado en base de datos
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Llamar al callback onSubmit si existe
      if (onSubmit) {
        onSubmit({ ...formData, images });
      }
      
      // Limpiar y cerrar después del éxito
      setTimeout(() => {
        handleClear();
        if (onClose) onClose();
      }, 2000);
    }, 1500);
  };

  const handleClear = () => {
    setFormData({ name: '', description: '', category: '' });
    setImages([]);
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    handleClear();
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='overlay' onClick={handleClose}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .image-item:hover .image-remove {
          opacity: 1;
        }
      `}</style>
      
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button 
          className='closeButton'
          onClick={handleClose}
          onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <X size={24} color="#6b7280" />
        </button>

        <div className='modalContent'>
          {/* Header */}
          <div className='addHostalHeader'>
            <div className='iconWrapper'>
              <Package size={28} color="white" />
            </div>
            <div>
              <h1 className='title'>
                {editMode ? 'Editar Producto' : 'Agregar Producto'}
              </h1>
              <p className='subtitle'>
                {editMode ? 'Modifica la información del producto' : 'Completa la información del nuevo producto'}
              </p>
            </div>
          </div>

          {/* Alert Error */}
          {error && (
            <div className='alert alertError'>
              <AlertCircle size={20} color="#ef4444" style={{flexShrink: 0, marginTop: '2px'}} />
              <div>
                <p style={{fontWeight: '500', marginBottom: '4px', color: '#991b1b'}}>Error</p>
                <p style={{fontSize: '14px', color: '#b91c1c'}}>{error}</p>
              </div>
            </div>
          )}

          {/* Alert Success */}
          {success && (
            <div className='alert alertError'>
              <CheckCircle size={20} color="#22c55e" style={{flexShrink: 0, marginTop: '2px'}} />
              <div>
                <p style={{fontWeight: '500', marginBottom: '4px', color: '#166534'}}>
                  {editMode ? '¡Producto actualizado exitosamente!' : '¡Producto agregado exitosamente!'}
                </p>
                <p style={{fontSize: '14px', color: '#15803d'}}>
                  {editMode ? 'Los cambios han sido guardados' : 'El producto ha sido guardado en la base de datos'}
                </p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <div>
            {/* Nombre */}
            <div className='formGroup'>
              <label htmlFor="name" className='label'>
                Nombre del producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className='input'
                placeholder="Ej: Cabaña Vista al Mar"
              />
            </div>

            {/* Categoría - Selector tipo grid */}
            <div className='formGroup'>
              <label className='label'>
                Categoría *
              </label>
              <div className='categoryGrid'>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                    className={`categoryButton ${formData.category === cat.id ? 'categoryButtonActive' : ''}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              {formData.category && (
                <p className='hint'>
                  Categoría seleccionada: <strong>{categories.find(c => c.id === formData.category)?.name}</strong>
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className='formGroup'>
              <label htmlFor="description" className='label'>
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className='input noResize'
                placeholder="Describe las características principales del producto..."
              />
            </div>

            {/* Imágenes */}
            <div className='formGroup'>
              <label className='label'>
                Imágenes del producto *
              </label>
              
              <div className='uploadZone'>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{display: 'none'}}
                />
                <label htmlFor="images" style={{cursor: 'pointer'}}>
                  <Upload size={40} color="#9ca3af" style={{margin: '0 auto 12px', display: 'block'}} />
                  <p className='uploadTitle'>
                    Click para subir imágenes
                  </p>
                  <p className='uploadSubtitle'>
                    O arrastra y suelta archivos aquí
                  </p>
                  <p className='uploadInfo'>
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </label>
              </div>

              {/* Preview de imágenes */}
              {images.length > 0 && (
                <div className='imageGrid'>
                  {images.map((image) => (
                    <div key={image.id} className="imageItem">
                      <img
                        src={image.url}
                        alt={image.name}
                        className='imagePreview'
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="imageRemove"
                        onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                        onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                      >
                        <X size={14} />
                      </button>
                      <p className='imageName'>
                        {image.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botones */}
            <div className='buttonGroup'>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`btnPrimary ${loading ? 'btnPrimaryDisabled' : ''}`}
                onMouseEnter={(e) => !loading && (e.target.style.background = '#0f766e')}
                onMouseLeave={(e) => !loading && (e.target.style.background = '#0d9488')}
              >
                {loading ? (
                  <>
                    <div className='spinner' />
                    {editMode ? 'Actualizando...' : 'Guardando...'}
                  </>
                ) : (
                  editMode ? 'Actualizar Producto' : 'Guardar Producto'
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className='btnSecondary'
                onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}