import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import './style.css';

// Página completa de Login
export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      const registeredUser = localStorage.getItem('registeredUser');
      
      if (registeredUser) {
        const parsedUser = JSON.parse(registeredUser);
        
        if (formData.email === parsedUser.email && formData.password === parsedUser.password) {
          const user = {
            firstName: parsedUser.firstName,
            lastName: parsedUser.lastName,
            email: parsedUser.email,
            initials: parsedUser.initials
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          setLoading(false);
          navigate('/');
          window.location.reload();
          return;
        }
      }
      
      const mockUser = {
        email: 'usuario@ejemplo.com',
        password: 'Password123'
      };

      if (formData.email === mockUser.email && formData.password === mockUser.password) {
        const user = {
          firstName: 'Juan',
          lastName: 'Pérez',
          email: formData.email,
          initials: 'JP'
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
        navigate('/');
        window.location.reload();
      } else {
        setLoading(false);
        setLoginError('Correo electrónico o contraseña incorrectos. Intenta nuevamente.');
      }
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
              <Lock size={32} />
            </div>
            <h2 className="auth-title">Iniciar sesión</h2>
            <p className="auth-subtitle">Bienvenido de vuelta a WaveHeaven</p>
          </div>

          {loginError && (
            <div className="auth-alert auth-alert-error">
              <AlertCircle size={20} />
              <div>
                <p className="auth-alert-title">Error al iniciar sesión</p>
                <p className="auth-alert-message">{loginError}</p>
              </div>
            </div>
          )}

          <div className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Correo electrónico</label>
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
              <label className="auth-label">Contraseña</label>
              <div className="auth-input-wrapper">
                <Lock size={20} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
                  placeholder="Tu contraseña"
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

            <button
              type="button"
              className="auth-submit-btn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <p className="auth-switch-text">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => navigate('/register')}
              >
                Crear cuenta
              </button>
            </p>
          </div>

          <div className="auth-demo-info">
            <p><strong>Demo:</strong> usuario@ejemplo.com / Password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}