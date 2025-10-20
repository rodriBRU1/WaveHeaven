import React, { useState, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Header() {
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay usuario en localStorage al cargar
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleCreateAccount = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('registeredUser');
        setUser(null);
        setShowUserMenu(false);
        navigate('/');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    return (
        <header className="header">
            <div className="contenedorLogo" onClick={handleLogoClick}>
                <img className="logoImagen" src="logo.png" alt="WaveHeaven Logo" />
                <h1 className="logo">WaveHeaven</h1>
            </div>
            
            <div className="acciones">
                {user ? (
                    // Usuario autenticado
                    <div className="user-menu-container">
                        <button className="user-profile-btn" onClick={toggleUserMenu}>
                            <div className="user-avatar">
                                {user.initials}
                            </div>
                            <span className="user-name">{user.firstName}</span>
                            <ChevronDown size={16} className={`chevron ${showUserMenu ? 'chevron-up' : ''}`} />
                        </button>

                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-header">
                                    <div className="user-avatar-large">
                                        {user.initials}
                                    </div>
                                    <div className="user-info">
                                        <p className="user-fullname">{user.firstName} {user.lastName}</p>
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                </div>
                                <div className="user-dropdown-divider"></div>
                                <button className="user-dropdown-item logout-btn" onClick={handleLogout}>
                                    <LogOut size={18} />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Usuario no autenticado
                    <>
                        <button className="btn" onClick={handleCreateAccount}>Crear cuenta</button>
                        <button className="btn" onClick={handleLogin}>Iniciar sesión</button>
                    </>
                )}
            </div>
        </header>
    );
}