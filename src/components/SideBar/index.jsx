import React, { useState } from 'react';
import { Home, Calendar, CreditCard, BarChart3, Settings, LogOut, User, SettingsIcon, Edit2, Trash2, Filter, FileX } from 'lucide-react';
import './style.css';

// Componente Sidebar
const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('cabanas');

  const menuItems = [
    // { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'cabanas', icon: Home, label: 'Gestión de Cabañas' },
    //{ id: 'reservas', icon: Calendar, label: 'Gestión de reservas' },
    //{ id: 'pagos', icon: CreditCard, label: 'Gestión de pagos' },
    //{ id: 'estadisticas', icon: BarChart3, label: 'Estadísticas y reportes' },
    //{ id: 'configuracion', icon: Settings, label: 'Configuración del sitio' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className='logo-icon' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src='logo.png' />
        </div>
        <span className="logo-text">Waveheaven</span>
      </div>
      <nav className="menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;