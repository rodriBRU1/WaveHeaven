import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import './style.css';

// Página completa de Registro
export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'El nombre solo puede contener letras';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'El apellido solo puede contener letras';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Debe contener mayúsculas, minúsculas y números';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        initials: `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase()
      };
      
      localStorage.setItem('registeredUser', JSON.stringify(user));
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="auth-page">
      <button className="auth-back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Volver al inicio
      </button>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <User size={32} />
            </div>
            <h2 className="auth-title">Crear cuenta</h2>
            <p className="auth-subtitle">Únete a WaveHeaven y comienza tu aventura</p>
          </div>

          {success && (
            <div className="auth-alert auth-alert-success">
              <CheckCircle size={20} />
              <div>
                <p className="auth-alert-title">¡Cuenta creada exitosamente!</p>
                <p className="auth-alert-message">Redirigiendo al inicio de sesión...</p>
              </div>
            </div>
          )}

          <div className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Nombre *</label>
              <div className="auth-input-wrapper">
                <User size={20} className="auth-input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`auth-input ${errors.firstName ? 'auth-input-error' : ''}`}
                  placeholder="Tu nombre"
                />
              </div>
              {errors.firstName && (
                <p className="auth-error-message">
                  <AlertCircle size={14} /> {errors.firstName}
                </p>
              )}
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Apellido *</label>
              <div className="auth-input-wrapper">
                <User size={20} className="auth-input-icon" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`auth-input ${errors.lastName ? 'auth-input-error' : ''}`}
                  placeholder="Tu apellido"
                />
              </div>
              {errors.lastName && (
                <p className="auth-error-message">
                  <AlertCircle size={14} /> {errors.lastName}
                </p>
              )}
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Correo electrónico *</label>
              <div className="auth-input-wrapper">
                <Mail size={20} className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <p className="auth-error-message">
                  <AlertCircle size={14} /> {errors.email}
                </p>
              )}
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Contraseña *</label>
              <div className="auth-input-wrapper">
                <Lock size={20} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="auth-error-message">
                  <AlertCircle size={14} /> {errors.password}
                </p>
              )}
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Confirmar contraseña *</label>
              <div className="auth-input-wrapper">
                <Lock size={20} className="auth-input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="auth-error-message">
                  <AlertCircle size={14} /> {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="button"
              className="auth-submit-btn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>

            <p className="auth-switch-text">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => navigate('/login')}
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}