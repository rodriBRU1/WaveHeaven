import './style.css'
import { useState } from 'react';

export default function Header({user}){
    const [showMenu, setShowMenu] = useState(false);
    const handleLogoClick = () => {
        // Redirigir a la página principal
        window.location.href = "/";
        // O si usas React Router: navigate("/");
    };

    return(
        <header className="adminHeader">
            <div className="contenedorLogo" onClick={handleLogoClick}>
                <img className="logoImagen" src="logo.png" alt="WaveHeaven Logo" />
                <h1 className="logo">WaveHeaven</h1>
            </div>
        <div className="user-section" onClick={() => setShowMenu(!showMenu)}>
            <div className="user-avatar">JD</div>
            <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
            </div>
        </div>
        </header>
    )
}