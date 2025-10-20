import { useState } from 'react';
import React from "react";
import './style.css'
import { Home, Calendar, CreditCard, BarChart3, Settings, LogOut, User, SettingsIcon, Edit2, Trash2, Filter } from 'lucide-react';


export default function AdminFilters() {
  const [searchName, setSearchName] = useState('');
  const [filterType, setFilterType] = useState('');

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Búsqueda</label>
        <input
          type="text"
          placeholder="Nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label>Filtro</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="">Montaña</option>
          <option value="playa">Playa</option>
          <option value="bosque">Bosque</option>
        </select>
      </div>
      <button className="filter-button">
        <Filter size={20} />
      </button>
    </div>
  );
};